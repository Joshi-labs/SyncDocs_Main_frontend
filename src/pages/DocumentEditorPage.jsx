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
import { getCoordsFromIndex } from '../lib/cursorUtils.js';




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
  
  // This state will hold all *other* users' cursors
  const [cursors, setCursors] = useState({});
  
  // This ref tracks what we last sent to the server
  const lastSentPositionRef = useRef(null);

/*
  const currentUserId = 'user-1-abc';
  const [users, setUsers] = useState([
    { id: 'user-1-abc', name: 'You', isPrimary: true },
    { id: 'user-2-def', name: 'Tiger', isPrimary: false },
    { id: 'user-3-ghi', name: 'Hippo', isPrimary: false },
  ]);
*/




  const handleShareClick = () => {
    // TODO: Implement share functionality
    console.log("Share button clicked!");
  };


  
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

  // --- Socket.io Event Handlers ---
  useEffect(() => {
    if (!socket || !editorRef.current) return;


    const handleRoomInfo = (data) => {
      const { content, users, selfId } = data;
      if (editorRef.current) {
        editorRef.current.innerHTML = content;
        lastContentRef.current = content;
      }
      setUsers(users);
      setCurrentUserId(selfId);
    };


    const handleUserJoined = (newUser) => {
      console.log('User joined:', newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    };


    const handleUserLeft = (idToRemove) => {
      console.log('User left:', idToRemove);
      setUsers((prevUsers) => prevUsers.filter(u => u.id !== idToRemove));

      setCursors((prevCursors) => {
        const newCursors = { ...prevCursors };
        delete newCursors[idToRemove];
        return newCursors;
      });
    };


    const handleDocUpdated = (delta) => {
      if (editorRef.current) {
        const currentHtml = editorRef.current.innerHTML;
        const patchedHtml = applyDelta(currentHtml, delta);
        editorRef.current.innerHTML = patchedHtml;
        lastContentRef.current = patchedHtml;
      }
    };
    

    const handleRoomClosed = (message) => {
      alert(message); 
      if (editorRef.current) {
        editorRef.current.contentEditable = false;
      }
      socket.disconnect();
    };
    

    const handleRoomFull = (message) => {
      alert(message);
      socket.disconnect();
    };


    const handleCursorUpdated = (data) => {
      setCursors((prevCursors) => ({
        ...prevCursors,
        [data.id]: { // Use socket.id as the key
          name: data.name,
          position: data.position
        }
      }));
    };


    // Add all listeners
    socket.on('room-info', handleRoomInfo);
    socket.on('user-joined', handleUserJoined);
    socket.on('user-left', handleUserLeft);
    socket.on('doc-updated', handleDocUpdated);
    socket.on('room-closed', handleRoomClosed);
    socket.on('room-full', handleRoomFull);
    socket.on('cursor-updated', handleCursorUpdated);

    // Clean up all listeners
    return () => {
      socket.off('room-info', handleRoomInfo);
      socket.off('user-joined', handleUserJoined);
      socket.off('user-left', handleUserLeft);
      socket.off('doc-updated', handleDocUpdated);
      socket.off('room-closed', handleRoomClosed);
      socket.off('room-full', handleRoomFull);
      socket.off('cursor-updated', handleCursorUpdated);
    };
  }, [socket, editorRef]);
  

// --- Timer for sending changes AND cursors ---
  useEffect(() => {
    if (!socket || !editorRef.current) return;

    const timer = setInterval(() => {

      const selection = window.getSelection();
      const newHtml = editorRef.current?.innerHTML;
      let cursorPosition = -1;


      if (selection.rangeCount > 0 && editorRef.current.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);
        const preCaretRange = document.createRange();
        preCaretRange.setStart(editorRef.current, 0);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        cursorPosition = preCaretRange.toString().length;
      }
      

      const hasDelta = newHtml !== null && newHtml !== lastContentRef.current;
      const hasNewCursor = cursorPosition !== -1 && cursorPosition !== lastSentPositionRef.current;


      if (hasDelta && hasNewCursor) {

        // Send the BUNDLED event
        const delta = createDelta(lastContentRef.current, newHtml);
        socket.emit('doc-and-cursor-change', { delta, position: cursorPosition });
        
        // Update local "truth"
        lastContentRef.current = newHtml;
        lastSentPositionRef.current = cursorPosition;

      } else if (hasDelta) {

        const delta = createDelta(lastContentRef.current, newHtml);
        socket.emit('doc-delta-change', delta);
        
        // Update local "truth"
        lastContentRef.current = newHtml;

      } else if (hasNewCursor) {

        socket.emit('cursor-change', cursorPosition);
        
        // Update local "truth"
        lastSentPositionRef.current = cursorPosition;
      }

    }, 330);

    return () => {
      clearInterval(timer);
    };
  }, [socket, editorRef]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* --- Render all cursors --- */}
      {Object.entries(cursors).map(([id, cursorData]) => {
        
        if (!cursorData || cursorData.position < 0) {
          return null;
        }

        const currentEditorLength = editorRef.current?.textContent.length || 0;
        if (cursorData.position > currentEditorLength) {
          return null; 
        }

        const pos = getCoordsFromIndex(editorRef.current, cursorData.position);
        
        if (!pos) return null;

        return (
          <ArtificialCursor
            key={id}
            pos={pos}
            name={cursorData.name}
          />
        );
      })}
      
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