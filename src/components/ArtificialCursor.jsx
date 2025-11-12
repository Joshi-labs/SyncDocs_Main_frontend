import React from 'react';

// Helper function to get a consistent hex color for each user
const getAvatarColor = (name) => {
  const colors = [
    '#3B82F6', // blue-500
    '#EF4444', // red-500
    '#10B981', // green-500
    '#8B5CF6', // purple-500
    '#EC4899', // pink-500
    '#F59E0B', // orange-500
    '#06B6D4', // teal-500
    '#6366F1', // indigo-500
  ];
  
  if (!name) return colors[0];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const ArtificialCursor = ({ pos, name }) => {
  // Don't render if we have no position or name
  if (!pos || !name) return null;

  // Get the unique color for this user
  const userColor = getAvatarColor(name);

  return (
    <div
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '2px',
        height: `${pos.height}px`,
        backgroundColor: userColor, // Dynamic color
        opacity: 0.8,
        transition: 'left 0.1s ease, top 0.1s ease',
        zIndex: 99
      }}
    >
      {/* Name tag for the user */}
      <div 
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-5px',
          padding: '2px 5px',
          backgroundColor: userColor, // Dynamic color
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          borderRadius: '3px',
          whiteSpace: 'nowrap'
        }}
      >
        {name} {/* Dynamic name */}
      </div>
    </div>
  );
};

export default ArtificialCursor;