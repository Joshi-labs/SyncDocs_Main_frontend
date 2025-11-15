import React from 'react';
// --- 1. IMPORT your new util ---
import { getUserColor } from '../lib/colorUtils';

// --- 2. DELETE the old getAvatarColor function that was here ---

const ArtificialCursor = ({ pos, name }) => {
  // Don't render if we have no position or name
  if (!pos || !name) return null;

  // --- 3. CHANGE this line to use the new function ---
  const userColor = getUserColor(name).hex;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '2px',
        height: `${pos.height}px`,
        backgroundColor: userColor, // This now uses the correct hex
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
          backgroundColor: userColor, // This also uses the correct hex
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