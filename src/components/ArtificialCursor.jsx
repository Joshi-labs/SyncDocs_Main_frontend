import React from 'react';
import { getUserColor } from '../lib/colorUtils';

const ArtificialCursor = ({ pos, name }) => {
  
  if (!pos || !name) return null;

  const userColor = getUserColor(name).hex;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '2px',
        height: `${pos.height}px`,
        backgroundColor: userColor, 
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
          backgroundColor: userColor, 
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          borderRadius: '3px',
          whiteSpace: 'nowrap'
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default ArtificialCursor;