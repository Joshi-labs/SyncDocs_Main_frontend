import { Link } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';

const AppHeader = ({ onLogout }) => (
  <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-100">
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        SyncDocs
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/myDocs" className="text-gray-600 hover:text-blue-600 font-medium flex items-center space-x-1 transition-colors">
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

export default AppHeader;
