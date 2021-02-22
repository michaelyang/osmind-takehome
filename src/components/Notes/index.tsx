import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from '../common/Loading';
import NotesList from './NotesList';
import { filterNotes } from '../../utils/searchFunctions';
import { LinkContainer } from 'react-router-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';

export interface NotesProps {
  notes: INote[];
  isLoading: boolean;
}

const Notes: React.FC<NotesProps> = ({ notes, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = filterNotes(notes, searchTerm);

  return (
    <div className="notes">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      <ListGroup>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>
        {isLoading ? (
          <Loading text="Loading Your Notes..." style={{ margin: '20px 0' }} />
        ) : (
          <NotesList notes={filteredNotes} searchTerm={searchTerm} />
        )}
      </ListGroup>
    </div>
  );
};

export default Notes;
