// src/lib/delta.js
export const createDelta = (oldStr, newStr) => {

  console.log(newStr);
  const oldLen = oldStr.length;
  const newLen = newStr.length;
  let start = 0;

  while (start < oldLen && start < newLen && oldStr[start] === newStr[start]) {
    start++;
  }

  let oldEnd = oldLen;
  let newEnd = newLen;


  while (oldEnd > start && newEnd > start && oldStr[oldEnd - 1] === newStr[newEnd - 1]) {
    oldEnd--;
    newEnd--;
  }

  const delta = {
    start: start,
    end: oldEnd,
    content: newStr.substring(start, newEnd)
  };

  return delta;
};



export const applyDelta = (currentStr, delta) => {
  const { start, end, content } = delta;
  return currentStr.substring(0, start) + content + currentStr.substring(end);
};