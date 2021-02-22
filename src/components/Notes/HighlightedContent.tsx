import React from 'react';

export interface HighlightedTextProps {
  content: string;
  highlightedTerm?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ content, highlightedTerm = '' }) => {
  // TODO: Fix bug where doesn't highlight case sensitive stuff. Maybe make the function flexible.
  if (!highlightedTerm) {
    return <span className="font-weight-bold">{content.trim().split('\n')[0]}</span>;
  }

  const parts = content.split(new RegExp(`(${highlightedTerm})`, 'gi'));

  return (
    <span className="font-weight-bold">
      {parts.map((part, i) =>
        part === highlightedTerm ? (
          <mark key={i} style={{ padding: 0 }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightedText;
