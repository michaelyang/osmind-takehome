import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { LinkContainer } from 'react-router-bootstrap';
import HighlightedContent from './HighlightedContent';

export interface NoteProps {
  note: INote;
  searchTerm?: string;
}

const Note: React.FC<NoteProps> = ({ note, searchTerm = '' }) => (
  <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
    <ListGroup.Item action>
      <HighlightedContent content={note.content} highlightedTerm={searchTerm} />
      <br />
      <span className="text-muted">Created: {new Date(note.createdAt).toLocaleString()}</span>
    </ListGroup.Item>
  </LinkContainer>
);

export default Note;
