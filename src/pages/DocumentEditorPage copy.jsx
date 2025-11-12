import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, LogOut, Share2,
  Bold, Italic, Strikethrough, List, ListOrdered, CodeXml, 
  Pilcrow, AlignLeft, AlignCenter, AlignRight, Heading1, 
  Heading2, Heading3, Underline, Undo, Redo,
  Check, Crown, Link2, Unlink, RemoveFormatting, TextQuote
} from 'lucide-react';
import AppHeader from '../components/AppHeader.jsx';

// --- Inlined Component: UserPresenceBar ---
const UserPresenceBar = () => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center -space-x-2">
      <div
        title="Lion (You)"
        className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-md relative"
      >
        <Crown className="w-5 h-5" />
      </div>
      <div
        title="Tiger"
        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-md relative"
      >
        T
      </div>
    </div>
    
    <button 
      className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  </div>
);

// --- Inlined Component: InteractiveToolbar ---
const InteractiveToolbar = () => {
  const [activeStyles, setActiveStyles] = useState(new Set());
  const editorRef = useRef(null); // Ref to the editor div

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
      <ToolbarButton command="undo" title="Undo"><Undo className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="redo" title="Redo"><Redo className="w-5 h-5" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-2"></div>
      
      <ToolbarButton command="bold" title="Bold"><Bold className="w-5 h-5" /></ToolbarButton>
      <ToolbarButton command="italic" title="Italic"><Italic className="w-5 h-5" /></ToolbarButton>
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

// --- Initial Content for the Editor ---
// Updated to include all elements
const initialContent = `
<h1>Welcome to SyncDocs!</h1>
<p>This is a <b>fully interactive</b> rich-text editor built with <i>just React and Tailwind CSS</i>, using the browser's <code>contentEditable</code> feature.</p>
<p>You can use the toolbar above to:</p>
<ul>
  <li>Apply <b>bold</b>, <i>italic</i>, and <u>underline</u> styles.</li>
  <li>Create lists.</li>
  <li>Align your text.</li>
  <li>...and much more!</li>
</ul>
<blockquote>"This is a blockquote. Try selecting text to see the toolbar light up!"</blockquote>
<p>Here is a link: <a href="https://google.com" target="_blank">Go to Google</a></p>
<pre>// This is a code block
function hello() {
  console.log("Hello, World!");
}</pre>
<h2>This is a Heading 2</h2>
<h3>And this is a Heading 3</h3>
<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
`;

// --- Main Document Editor Page ---
const DocumentEditorPage = ({onLogout}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* --- STYLES FIX --- */}
      {/* This style tag now includes ALL necessary styles for the editor */}
      <style>
        {`
          .syncdocs-editor-content h1 {
            font-size: 2.25rem; /* 36px */
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #E5E7EB; /* gray-200 */
          }
          .syncdocs-editor-content h2 {
            font-size: 1.875rem; /* 30px */
            font-weight: 700;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
          }
          .syncdocs-editor-content h3 {
            font-size: 1.5rem; /* 24px */
            font-weight: 700;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .syncdocs-editor-content ul {
            list-style-type: disc;
            margin-left: 2rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .syncdocs-editor-content ol {
            list-style-type: decimal;
            margin-left: 2rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .syncdocs-editor-content a {
            color: #4F46E5; /* indigo-600 */
            text-decoration: underline;
            pointer-events: auto; /* Makes links clickable */
            cursor: pointer;
          }
          .syncdocs-editor-content pre {
            background-color: #1F2937; /* gray-900 */
            color: white;
            font-family: monospace;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
            overflow-x: auto;
          }
          .syncdocs-editor-content blockquote {
            border-left: 4px solid #D1D5DB; /* gray-300 */
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #4B5563; /* gray-600 */
          }
        `}
      </style>
    
      <AppHeader onLogout={onLogout} />
      
      {/* Centering container for the "paper" */}
      <div className="flex-grow w-full flex flex-col items-center py-8 overflow-hidden">
        
        {/* The Toolbar and User Presence */}
        <div className="w-full max-w-4xl sticky top-[73px] z-10">
          <div className="flex items-center justify-between p-3 bg-white rounded-t-lg shadow-md border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 truncate px-2">
              My Document Title
            </h2>
            <UserPresenceBar />
          </div>
          <InteractiveToolbar />
        </div>
        
        {/* The "Paper" Sheet */}
        <div 
          className="w-full max-w-4xl bg-white shadow-2xl h-full flex flex-col"
          style={{ minHeight: 'calc(100vh - 250px)' }}
        >
          {/* The Editor Content Area */}
          <div 
            id="syncdocs-editor"
            className="flex-grow overflow-auto p-12 syncdocs-editor-content focus:outline-none" 
            contentEditable={true}
            ref={editorRef}
            dangerouslySetInnerHTML={{ __html: initialContent }}
            style={{ userSelect: 'text' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentEditorPage;