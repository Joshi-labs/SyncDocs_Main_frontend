// src/lib/colorUtils.js

// This is the new, single source of truth for user colors.
// We map the *exact* animal name to a *specific* color.
const COLOR_MAP = {
  'Lion':  { tw: 'bg-amber-500', hex: '#F59E0B' },
  'Tiger':  { tw: 'bg-blue-500', hex: '#3B82F6' },
  'Hippo':  { tw: 'bg-red-500', hex: '#EF4444' },
  'Zebra':  { tw: 'bg-green-500', hex: '#10B981' },
  'Rhino':  { tw: 'bg-purple-500', hex: '#8B5CF6' },
  'Panda':  { tw: 'bg-pink-500', hex: '#EC4899' },
  'Eagle':  { tw: 'bg-gray-500', hex: '#6B7280' },
  'Koala':  { tw: 'bg-cyan-600', hex: '#06B6D4' },
  'Falcon': { tw: 'bg-indigo-500', hex: '#6366F1' },
  'Dolphin':{ tw: 'bg-teal-500', hex: '#14B8A6' }, // --- ADD THIS 9TH ANIMAL ---
  
  // A default fallback just in case
  'default': { tw: 'bg-gray-500', hex: '#6B7280' }
};

/**
 * Gets a specific color object (tw class and hex) for a user's name.
 * @param {string} name The user's name (e.g., "Tiger")
 * @returns {{tw: string, hex: string}} An object with Tailwind class and Hex code
 */
export const getUserColor = (name) => {
  // If the name is in our map, return its color.
  // Otherwise, return the default color.
  return COLOR_MAP[name] || COLOR_MAP['default'];
};