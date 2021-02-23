import React from 'react';
import Note from './Note';

export interface NotesListProps {
  notes: INote[];
  searchTerm?: string;
  isCaseSensitive?: boolean;
}

const NotesList: React.FC<NotesListProps> = ({ notes, searchTerm, isCaseSensitive }) => (
  <>
    {notes.map((note) => (
      <Note
        key={note.noteId}
        note={note}
        searchTerm={searchTerm}
        isCaseSensitive={isCaseSensitive}
      />
    ))}
  </>
);

export default NotesList;
