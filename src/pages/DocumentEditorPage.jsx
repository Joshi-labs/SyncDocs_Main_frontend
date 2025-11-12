import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import { 
  Home, LogOut, Share2,
  Bold, Italic, Strikethrough, List, ListOrdered, CodeXml, 
  Pilcrow, AlignLeft, AlignCenter, AlignRight, Heading1, 
  Heading2, Heading3, Underline, Undo, Redo,
  Check, Crown, Link2, Unlink, RemoveFormatting, TextQuote
} from 'lucide-react';

import AppHeader from '../components/AppHeader.jsx';
import EditorStyles from '../components/EditorStyles.jsx';
import { createDelta, applyDelta } from '../lib/delta.js';
import UserPresenceBar from '../components/UserPresenceBar.jsx';
import ArtificialCursor from '../components/ArtificialCursor.jsx';





const InteractiveToolbar = () => {
  const [activeStyles, setActiveStyles] = useState(new Set());
  const editorRef = useRef(null); 

  const onCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus(); 
  };

  const updateActiveStyles = useCallback(() => {
    const newActiveStyles = new Set();
    const simpleCommands = ['bold', 'italic', 'underline', 'strikeThrough', 'justifyLeft', 'justifyCenter', 'justifyRight', 'insertOrderedList', 'insertUnorderedList'];
    
    simpleCommands.forEach(command => {
      if (document.queryCommandState(command)) {
        newActiveStyles.add(command);
      }
    });
    
    const formatBlock = document.queryCommandValue('formatBlock');
    if (['h1', 'h2', 'h3', 'p', 'pre', 'blockquote'].includes(formatBlock)) {
      newActiveStyles.add(formatBlock);
    }

    setActiveStyles(newActiveStyles);
  }, []);

  useEffect(() => {
    const editorElement = document.getElementById('syncdocs-editor');
    if (editorElement) {
      editorRef.current = editorElement;
      
      const onSelectionChange = () => updateActiveStyles();
      
      document.addEventListener('selectionchange', onSelectionChange);
      editorElement.addEventListener('focus', updateActiveStyles);
      editorElement.addEventListener('keyup', updateActiveStyles);
      editorElement.addEventListener('mouseup', updateActiveStyles);

      return () => {
        document.removeEventListener('selectionchange', onSelectionChange);
        editorElement.removeEventListener('focus', updateActiveStyles);
        editorElement.removeEventListener('keyup', updateActiveStyles);
        editorElement.removeEventListener('mouseup', updateActiveStyles);
      };
    }
  }, [updateActiveStyles]);

  const ToolbarButton = ({ command, value, title, children }) => (
    <button
      onClick={() => onCommand(command, value)}
      type="button"
      className={`p-2 rounded-md ${activeStyles.has(command) || activeStyles.has(value) ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
      title={title}
    >
      {children}
    </button>
  );

  const handleLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      onCommand('createLink', url);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-white border-b border-gray-200 sticky top-[73px] z-10">
      {/* ... All ToolbarButtons ... */}
      <ToolbarButton command="undo" title="Undo"><Undo className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="redo" title="Redo"><Redo className="w-5 h-5" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-2"></div>
      
      <ToolbarButton command="bold" title="Bold"><Bold className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="italic" title="Italic"><Italic className="w-F56565" /></ToolbarButton>
      <ToolbarButton command="underline" title="Underline"><Underline className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="strikeThrough" title="Strikethrough"><Strikethrough className="w-5 h-5" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      <ToolbarButton command="formatBlock" value="h1" title="Heading 1"><Heading1 className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="formatBlock" value="h2" title="Heading 2"><Heading2 className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="formatBlock" value="h3" title="Heading 3"><Heading3 className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="formatBlock" value="p" title="Paragraph"><Pilcrow className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="formatBlock" value="blockquote" title="Quote"><TextQuote className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="formatBlock" value="pre" title="Code Block"><CodeXml className="w-5 h-5" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-2"></div>
      
      <ToolbarButton command="insertUnorderedList" title="Bullet List"><List className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="insertOrderedList" title="Ordered List"><ListOrdered className="w-5 h-5" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      <ToolbarButton command="justifyLeft" title="Align Left"><AlignLeft className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="justifyCenter" title="Align Center"><AlignCenter className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="justifyRight" title="Align Right"><AlignRight className="w-5 h-5" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-2"></div>
      
      <button
        onClick={handleLink}
        type="button"
        className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        title="Insert Link"
      >
        <Link2 className="w-5 h-5" />
      </button>
      <ToolbarButton command="unlink" title="Remove Link"><Unlink className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="removeFormat" title="Clear Formatting"><RemoveFormatting className="w-5 h-5" /></ToolbarButton>
    </div>
  );
};

const DocumentEditorPage = ({onLogout}) => {
  const editorRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const lastContentRef = useRef("");


  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

/*
  const currentUserId = 'user-1-abc';
  const [users, setUsers] = useState([
    { id: 'user-1-abc', name: 'You', isPrimary: true },
    { id: 'user-2-def', name: 'Tiger', isPrimary: false },
    { id: 'user-3-ghi', name: 'Hippo', isPrimary: false },
  ]);
*/



  // --- NEW: A handler for the share button ---
  const handleShareClick = () => {
    // This is where you'd open the modal or get the real link from the API
    console.log("Share button clicked!");
  };





  // --- NEW: State for mock cursor position ---
  const [mockCursorPos, setMockCursorPos] = useState(null);

  
  // --- Socket.io Connection ---
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = "<p>Loading document...</p>";
      lastContentRef.current = "<p>Loading document...</p>";
    }

    const s = io('http://localhost:5001');
    setSocket(s);
    console.log("Connecting to socket server...");
    
    const testDocId = 'my-first-document';
    s.emit('join-room', testDocId);

    return () => {
      s.disconnect();
    };
  }, []);


// --- Socket.io Event Listeners (UPDATED FOR PRESENCE) ---
  useEffect(() => {
    if (!socket || !editorRef.current) return;

    // 1. Replaces 'doc-load'. Runs once when you join.
    const handleRoomInfo = (data) => {
      const { content, users, selfId } = data;
      
      // Set the document content
      if (editorRef.current) {
        editorRef.current.innerHTML = content;
        lastContentRef.current = content;
      }
      
      // Set the full user list
      setUsers(users);
      
      // Set our own ID
      setCurrentUserId(selfId);
    };

    // 2. Runs when a new user joins the room
    const handleUserJoined = (newUser) => {
      console.log('User joined:', newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    // 3. Runs when a user leaves the room
    const handleUserLeft = (idToRemove) => {
      console.log('User left:', idToRemove);
      setUsers((prevUsers) => prevUsers.filter(u => u.id !== idToRemove));
    };

    // 4. Listens for our delta patches (unchanged)
    const handleDocUpdated = (delta) => {
      if (editorRef.current) {
        const currentHtml = editorRef.current.innerHTML;
        const patchedHtml = applyDelta(currentHtml, delta);
        editorRef.current.innerHTML = patchedHtml;
        lastContentRef.current = patchedHtml;
      }
    };
    
    // 5. Runs if the owner disconnects
    const handleRoomClosed = (message) => {
      alert(message); // Show the alert from the server
      if (editorRef.current) {
        editorRef.current.contentEditable = false; // Disable editor
      }
      socket.disconnect(); // Disconnect this user
    };

    // Add all listeners
    socket.on('room-info', handleRoomInfo);
    socket.on('user-joined', handleUserJoined);
    socket.on('user-left', handleUserLeft);
    socket.on('doc-updated', handleDocUpdated);
    socket.on('room-closed', handleRoomClosed);

    // Clean up all listeners
    return () => {
      socket.off('room-info', handleRoomInfo);
      socket.off('user-joined', handleUserJoined);
      socket.off('user-left', handleUserLeft);
      socket.off('doc-updated', handleDocUpdated);
      socket.off('room-closed', handleRoomClosed);
    };
  }, [socket, editorRef]);
  

  // --- Timer for sending changes AND updating cursors ---
  useEffect(() => {
    if (!socket || !editorRef.current) return;

    const timer = setInterval(() => {
      
      // --- START: Updated Cursor Logic ---
      const selection = window.getSelection();
      
      if (selection.rangeCount > 0 && editorRef.current.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);

        // 1. (Your existing logic) Print character position
        const preCaretRange = document.createRange();
        preCaretRange.setStart(editorRef.current, 0);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        const cursorPosition = preCaretRange.toString().length;
        console.log('Cursor Position:', cursorPosition);
        
        // 2. (NEW UI Logic) Get pixel position for rendering
        const rect = range.getBoundingClientRect();

        // Only update if the cursor is not collapsed (e.g., width is 0)
        if (rect.height > 0) {
          // Set mock cursor with an offset!
          setMockCursorPos({
            x: rect.left + 30, // <-- Your 3-4 digit offset (as pixels)
            y: rect.top,
            height: rect.height
          });
        }
      } else {
        // If cursor is not in the editor, hide the mock one
        setMockCursorPos(null);
      }
      // --- END: Updated Cursor Logic ---


      // --- (Existing Delta Logic - Unchanged) ---
      const newHtml = editorRef.current?.innerHTML;

      if (newHtml === null || newHtml === lastContentRef.current) {
        return;
      }
      
      const delta = createDelta(lastContentRef.current, newHtml);
      console.log("Calculated Delta:", delta);
      socket.emit('doc-delta-change', delta);
      
      lastContentRef.current = newHtml;

    }, 330); // 330ms

    return () => {
      clearInterval(timer);
    };

  }, [socket, editorRef]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* --- NEW: Render the Artificial Cursor --- */}
      <ArtificialCursor 
        pos={mockCursorPos} 
        name="Tiger" // Pass the name here!
      />

      <EditorStyles/>
    
      <AppHeader onLogout={onLogout} />
      
      <div className="flex-grow w-full flex flex-col items-center py-8 overflow-hidden">
        
        <div className="w-full max-w-4xl sticky top-[73px] z-10">
          <div className="flex items-center justify-between p-3 bg-white rounded-t-lg shadow-md border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 truncate px-2">
              My Document Title
            </h2>
            <UserPresenceBar 
              users={users}
              currentUserId={currentUserId}
              onShareClick={handleShareClick}
            />
          </div>
          <InteractiveToolbar />
        </div>
        
        <div 
          className="w-full max-w-4xl bg-white shadow-2xl h-full flex flex-col"
          style={{ minHeight: 'calc(100vh - 250px)' }}
        >
          <div 
            id="syncdocs-editor"
            className="flex-grow overflow-auto p-12 syncdocs-editor-content focus:outline-none" 
            contentEditable={true}
            ref={editorRef}
            style={{ userSelect: 'text' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentEditorPage;