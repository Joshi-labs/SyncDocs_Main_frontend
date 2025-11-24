import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, Clock, Trash2, Home, LogOut, FileText, 
  Loader2, AlertTriangle, Edit3, X, Check, FileMinus 
} from 'lucide-react';

// --- Configuration ---

//const SERVER_URL = 'http://localhost:5001';
const SERVER_URL = 'https://aws.vpjoshi.in/syncdocs';



const getAuthToken = () => localStorage.getItem('token');

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
};

// --- API Service Object ---
const apiService = {
  getHeaders: () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
  }),
  
  getDocs: async () => {
    const response = await fetch(`${SERVER_URL}/api/docs`, {
      method: 'GET',
      headers: apiService.getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch documents.');
    return response.json();
  },
  
  createDoc: async (title) => {
    const response = await fetch(`${SERVER_URL}/api/docs`, {
      method: 'POST',
      headers: apiService.getHeaders(),
      body: JSON.stringify({ title })
    });
    if (!response.ok) throw new Error('Failed to create document.');
    return response.json();
  },

  renameDoc: async (docId, newTitle) => {
    const response = await fetch(`${SERVER_URL}/api/docs/${docId}/rename`, {
      method: 'PUT',
      headers: apiService.getHeaders(),
      body: JSON.stringify({ title: newTitle })
    });
    if (!response.ok) throw new Error('Failed to rename document.');
    return response.json();
  },

  deleteDoc: async (docId) => {
    const response = await fetch(`${SERVER_URL}/api/docs/${docId}`, {
      method: 'DELETE',
      headers: apiService.getHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete document.');
    return response.json();
  }
};


const AppHeader = ({ onLogout }) => (
  <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
      <Link to="/myDocs" className="text-2xl font-bold text-indigo-600">
        SyncDocs
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/myDocs" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center space-x-1 transition-colors">
          <Home className="w-5 h-5" />
          <span>My Documents</span>
        </Link>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          <LogOut className="w-5 h-5 inline-block mr-1" />
          Logout
        </button>
      </div>
    </nav>
  </header>
);


const CreateNewCard = ({ onClick, isLoading }) => (
  <div className="w-full">
    <button
      onClick={onClick}
      disabled={isLoading}
      className="group relative w-full h-64 rounded-lg border-2 border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
    >
      <div className="text-center">
        {isLoading ? (
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-indigo-500" />
        ) : (
          <Plus className="w-12 h-12 mx-auto transition-transform duration-300 group-hover:scale-110" />
        )}
        <p className="mt-3 text-base font-semibold">
          {isLoading ? 'Creating...' : 'Create New'}
        </p>
      </div>
    </button>
  </div>
);


const DocThumbnail = ({ doc, onDeleteSuccess, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(doc.title);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleRenameSubmit = async () => {
    if (title === doc.title) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await onRename(doc.id, title);
      doc.title = title; 
    } catch (err) {
      console.error("Rename failed:", err);
      setTitle(doc.title); 
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };


  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${doc.title}"?`)) {
      setIsDeleting(true);
      try {
        await apiService.deleteDoc(doc.id);
        onDeleteSuccess(doc.id); 
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete document. Please try again.");
        setIsDeleting(false); 
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRenameSubmit();
    else if (e.key === 'Escape') setIsEditing(false);
  };


  if (isDeleting) {
    return (
      <div className="w-full">
        <div className="relative block w-full h-64 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
        </div>
        <div className="mt-3 h-10"></div> 
      </div>
    );
  }

  return (
    <div className="w-full">
      <Link
        to={`/doc/${doc.id}`}
        className="group relative block w-full h-64 rounded-lg bg-white shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 overflow-hidden"
      >
        <div className="p-5">
          <div className="h-3.5 w-3/4 bg-gray-300 rounded-full"></div>
          <div className="space-y-2 mt-5">
            <div className="h-2 w-full bg-gray-200 rounded-full"></div>
            <div className="h-2 w-full bg-gray-200 rounded-full"></div>
            <div className="h-2 w-5/6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-indigo-500 transition-all duration-300"></div>
      </Link>
      
      <div className="mt-3">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleRenameSubmit}
              className="flex-1 min-w-0 text-sm font-semibold text-gray-800 border-b-2 border-indigo-500 focus:outline-none"
              autoFocus
            />
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              <Check onClick={handleRenameSubmit} className="w-4 h-4 text-green-500 hover:text-green-700 cursor-pointer" />
            )}
            <X onClick={() => setIsEditing(false)} className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div 
              className="flex-1 min-w-0 group/title cursor-pointer" 
              onClick={() => setIsEditing(true)}
            >
              <p className="text-sm font-semibold text-gray-800 truncate group-hover/title:text-indigo-600">
                {doc.title}
                <Edit3 className="w-3 h-3 ml-1.5 inline-block text-gray-400 opacity-0 group-hover/title:opacity-100 transition-opacity" />
              </p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span className="truncate">Updated {doc.updatedAt}</span>
              </p>
            </div>
            <button 
              onClick={handleDelete}
              className="ml-2 flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const EmptyStateCard = () => (
  <div className="w-full">
    <div className="relative block w-full h-64 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
      <div className="flex items-center justify-center h-full">
        <FileMinus className="w-12 h-12 text-gray-300" />
      </div>
    </div>
    <div className="mt-3 h-10">
      {/* Empty space to match the real card's footer */}
    </div>
  </div>
);


// --- Full Page Loader ---
const FullPageLoader = ({ message = "Loading Documents..." }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto" />
      <p className="mt-4 text-lg text-gray-600">{message}</p>
    </div>
  </div>
);

// --- Full Page Error ---
const FullPageError = ({ onRetry }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center bg-white p-12 rounded-lg shadow-md">
      <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Something went wrong</h2>
      <p className="mt-2 text-gray-600">We couldn't load your documents. Please try again.</p>
      <button 
        onClick={onRetry}
        className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
      >
        Retry
      </button>
    </div>
  </div>
);


// --- Main MyDocsPage Component ---
const MyDocsPage = ({ onLogout }) => {
  const [userName, setUserName] = useState('');
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isPolling, setIsPolling] = useState(false); 
  const [error, setError] = useState(null);

  const pollIntervalRef = useRef(null);

  const loadDocuments = useCallback(async (isPolling = false) => {
    if (!isPolling) {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      const fetchedDocs = await apiService.getDocs();
      setDocs(fetchedDocs);
      
      if (!isPolling && fetchedDocs.length === 0) {
        setIsPolling(true);
      }
      
      if (isPolling && fetchedDocs.length > 0) {
        setIsPolling(false);
      }

    } catch (err) {
      setError(err.message);
      setIsPolling(false); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const payload = decodeJwt(token);
      if (payload) {
        console.log("Decoded JWT Payload:", payload);
        setUserName(payload.name || 'User');
      }
    }
    loadDocuments(false);
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [loadDocuments]);


  useEffect(() => {
    if (isPolling) {
      let pollCount = 0;
      const maxPolls = 5; // Poll 5 times (5 seconds total)

      pollIntervalRef.current = setInterval(async () => {
        pollCount++;
        console.log(`Polling for default docs (Attempt ${pollCount})...`);
        await loadDocuments(true); // true = don't show full loader

        if (pollCount >= maxPolls) {
          setIsPolling(false); // Give up
        }
      }, 1000); // Poll every 1 second (faster)

    } else {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [isPolling, loadDocuments]);


  const handleCreateNew = async () => {
    setIsCreating(true);
    try {
      // Give it a unique title so they don't look like they're overwriting
      const uniqueTitle = `Untitled - ${new Date().toLocaleTimeString()}`;
      await apiService.createDoc(uniqueTitle);

      setTimeout(() => {
        loadDocuments(true); // 'true' = don't show full-page loader
        setIsCreating(false);
      }, 1500); // Give the processor 1.5 seconds
      
    } catch (err) {
      alert("Error creating document: " + err.message);
      setIsCreating(false);
    }
  };


  const handleDeleteSuccess = (docId) => {
    setDocs(docs.filter(doc => doc.id !== docId));
  };

  const handleRename = async (docId, newTitle) => {
    await apiService.renameDoc(docId, newTitle);
  };



  if (isLoading) {
    return <FullPageLoader message="Loading Documents..." />;
  }
  
  if (isPolling) {
    return <FullPageLoader message="Setting up your account..." />;
  }
  
  if (error) {
    return <FullPageError onRetry={loadDocuments} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 antialiased">
      <AppHeader onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {userName}!
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          
          <CreateNewCard onClick={handleCreateNew} isLoading={isCreating} />

          {docs.map(doc => (
            <DocThumbnail 
              key={doc.id} 
              doc={doc} 
              onDeleteSuccess={handleDeleteSuccess}
              onRename={handleRename}
            />
          ))}

          {/* If there are no docs, show clean placeholders */}
          {docs.length === 0 && !isCreating && !isPolling && (
            <>
              <EmptyStateCard />
              <EmptyStateCard />
              <EmptyStateCard />
              <EmptyStateCard />
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default MyDocsPage;