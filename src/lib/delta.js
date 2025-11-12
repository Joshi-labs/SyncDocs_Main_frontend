// src/lib/delta.js
export const createDelta = (oldStr, newStr) => {

  console.log(newStr);
  const oldLen = oldStr.length;
  const newLen = newStr.length;
  let start = 0;

  // 1. Find the first character that's different (2-pointer from the start)
  while (start < oldLen && start < newLen && oldStr[start] === newStr[start]) {
    start++;
  }

  let oldEnd = oldLen;
  let newEnd = newLen;

  // 2. Find the last character that's different (2-pointer from the end)
  // We stop when we hit the 'start' index to avoid overlapping
  while (oldEnd > start && newEnd > start && oldStr[oldEnd - 1] === newStr[newEnd - 1]) {
    oldEnd--;
    newEnd--;
  }

  // 3. Create the delta
  const delta = {
    start: start,
    end: oldEnd,
    content: newStr.substring(start, newEnd)
  };

  return delta;
};


/**
 * Applies a "Smart Delta" to a string.
 * This is the 'patch' function.
 */
export const applyDelta = (currentStr, delta) => {
  const { start, end, content } = delta;
  
  // Take the start of the string, insert the new content,
  // and append the end of the string.
  return currentStr.substring(0, start) + content + currentStr.substring(end);
};