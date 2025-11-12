import React from 'react';
import { Crown, Share2 } from 'lucide-react';

// Helper function to get a consistent color for each user
// so "Tiger" is always the same color.
const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 
    'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500'
  ];
  let hash = 0;
  if (name.length === 0) return colors[0];
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// The new dynamic component
const UserPresenceBar = ({ users = [], currentUserId, onShareClick }) => {
  
  // We sort the array to show "You" (the Lion) first.
  const sortedUsers = [...users].sort((a, b) => {
    if (a.id === currentUserId) return -1;
    if (b.id === currentUserId) return 1;
    if (a.isPrimary && !b.isPrimary) return -1; // Keep other Lions at front
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.name.localeCompare(b.name); // Sort others by name
  });

  return (
    <div className="flex items-center space-x-4">
      
      {/* Dynamic User Avatars */}
      <div className="flex items-center -space-x-2">
        {sortedUsers.map((user) => {
          const isYou = user.id === currentUserId;
          const isLion = user.isPrimary;
          const title = isYou ? `${user.name} (You)` : user.name;
          const color = isLion ? 'bg-yellow-500' : getAvatarColor(user.name);
          const initial = user.name ? user.name[0].toUpperCase() : '?';

          return (
            <div
              key={user.id}
              title={title}
              className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-md relative`}
            >
              {/* Show a Crown for the Lion, otherwise their initial */}
              {isLion ? <Crown className="w-5 h-5" /> : initial}
            </div>
          );
        })}
      </div>
      
      {/* Share Button (now uses the prop) */}
      <button 
        onClick={onShareClick}
        className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default UserPresenceBar;