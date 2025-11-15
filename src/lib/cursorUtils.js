// src/lib/cursorUtils.js

/**
 * Converts a character index into pixel (x, y) coordinates.
 * @param {HTMLElement} editor - The contentEditable editor element.
 * @param {number} index - The character index to find.
 * @returns {{ x: number, y: number, height: number } | null}
 */
export const getCoordsFromIndex = (editor, index) => {
  if (index < 0 || !editor) return null;

  // Handle index 0 explicitly as it's a common edge case
  if (index === 0) {
    try {
      const range = document.createRange();
      range.setStart(editor, 0);
      range.collapse(true);
      const rect = range.getBoundingClientRect();
      return { x: rect.left - 1, y: rect.top, height: rect.height };
    } catch (e) { return null; }
  }

  const treeWalker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
  let charCount = 0;
  
  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    const nodeLength = node.textContent.length;

    // Check if the index is inside this text node
    if (charCount + nodeLength >= index) {
      const offset = index - charCount;

      // --- CRASH PREVENTION ---
      // This is the bounds check. If offset is invalid for this
      // specific node, we must not proceed.
      if (offset < 0 || offset > nodeLength) {
        // This indicates a bug in our logic, but we must not crash.
        console.warn(`Invalid offset computed: ${offset} for node with length ${nodeLength}`);
        return null;
      }
      // --- END CRASH PREVENTION ---

      try {
        const range = document.createRange();
        range.setStart(node, offset);
        range.collapse(true);
        
        const rects = range.getClientRects();
        if (rects.length > 0) {
          const rect = rects[0];
          return { x: rect.left - 1, y: rect.top, height: rect.height };
        }
      } catch (e) {
        // This can fail if the DOM is in a weird state.
        console.warn("Error creating range in text node:", e);
        return null;
      }
    }
    charCount += nodeLength;
  }

  // Fallback: If the index is at the very end of the document
  if (index >= charCount) {
     try {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false); // Collapse to the end
      const rect = range.getBoundingClientRect();
      return { x: rect.left - 1, y: rect.top, height: rect.height };
    } catch (e) {
      console.error("Failed to get fallback coords:", e);
      return null;
    }
  }

  return null; // Index not found
};