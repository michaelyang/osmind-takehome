import React from 'react';
import { splitContent } from '../../utils/searchFunctions';
export interface HighlightedTextProps {
  content: string;
  highlightedTerm?: string;
  isCaseSensitive?: boolean;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  content,
  highlightedTerm = '',
  isCaseSensitive = false,
}) => {
  const trimmedContent = content.trim().split('\n')[0];
  const parts = splitContent(trimmedContent, highlightedTerm);

  return (
    <span className="font-weight-bold">
      {parts.map((part, i) => {
        const partToCompare = isCaseSensitive ? part : part.toLocaleLowerCase();
        const highlightedTermToCompare = isCaseSensitive
          ? highlightedTerm
          : highlightedTerm.toLocaleLowerCase();
        return partToCompare === highlightedTermToCompare ? (
          <mark key={i} style={{ padding: 0 }}>
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </span>
  );
};

export default HighlightedText;
