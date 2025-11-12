// src/components/EditorStyles.jsx

const EditorStyles = ({onLogout}) => {

  return (

      <style>
        {`
          .syncdocs-editor-content h1 {
            font-size: 2.25rem; /* 36px */
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #E5E7EB; /* gray-200 */
          }
          .syncdocs-editor-content h2 {
            font-size: 1.875rem; /* 30px */
            font-weight: 700;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
          }
          .syncdocs-editor-content h3 {
            font-size: 1.5rem; /* 24px */
            font-weight: 700;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .syncdocs-editor-content ul {
            list-style-type: disc;
            margin-left: 2rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .syncdocs-editor-content ol {
            list-style-type: decimal;
            margin-left: 2rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .syncdocs-editor-content a {
            color: #4F46E5; /* indigo-600 */
            text-decoration: underline;
            pointer-events: auto; /* Makes links clickable */
            cursor: pointer;
          }
          .syncdocs-editor-content pre {
            background-color: #1F2937; /* gray-900 */
            color: white;
            font-family: monospace;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
            overflow-x: auto;
          }
          .syncdocs-editor-content blockquote {
            border-left: 4px solid #D1D5DB; /* gray-300 */
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #4B5563; /* gray-600 */
          }
        `}
      </style>

  );
};

export default EditorStyles;