import React from 'react';
import Note from './Note';

export interface NotesListProps {
  notes: INote[];
  searchTerm?: string;
}

const NotesList: React.FC<NotesListProps> = ({ notes, searchTerm }) => (
  <>
    {notes.map((note) => (
      <Note key={note.noteId} note={note} searchTerm={searchTerm} />
    ))}
  </>
);

export default NotesList;
