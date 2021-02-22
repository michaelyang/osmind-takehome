import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Collapse from 'react-bootstrap/Collapse';
import Loading from '../common/Loading';
import NotesList from './NotesList';
import { filterNotes } from '../../utils/searchFunctions';
import { LinkContainer } from 'react-router-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import saveNote from '../../libs/notes/saveNotes';
export interface NotesProps {
  notes: INote[];
  isLoading: boolean;
}

enum ActionType {
  Find,
  FindAndReplace,
}

const ActionName = new Map<ActionType, string>([
  [ActionType.Find, 'Find'],
  [ActionType.FindAndReplace, 'Find & Replace'],
]);

const Notes: React.FC<NotesProps> = ({ notes, isLoading }) => {
  const [findTerm, setFindTerm] = useState<string>('');
  const [replaceWith, setReplaceWith] = useState<string>('');
  const [isReplacing, setIsReplacing] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>(ActionType.Find);

  const handleFindInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindTerm(e.target.value);
  };

  const handleReplceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceWith(e.target.value);
  };

  const filteredNotes = filterNotes(notes, findTerm);

  /*
  const handleReplaceSubmit = async (event) => {
    event.preventDefault();
    setIsReplacing(true);
    try {
      return;
    } catch (e) {
      return;
    }
  };
*/

  return (
    <div className="notes">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
      <div className="search-container pb-3 mb-3 border-bottom">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Find"
            value={findTerm}
            onChange={handleFindInputChange}
            tabIndex={2}
          />
          <DropdownButton
            as={InputGroup.Prepend}
            variant="secondary"
            title={ActionName.get(actionType)}
            tabIndex={1}
          >
            <Dropdown.Item onClick={() => setActionType(ActionType.Find)}>
              {ActionName.get(ActionType.Find)}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setActionType(ActionType.FindAndReplace)}>
              {ActionName.get(ActionType.FindAndReplace)}
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        <Collapse in={actionType === ActionType.FindAndReplace}>
          <InputGroup className="mt-2">
            <FormControl type="text" placeholder="Replace with..." tabIndex={3} />
            <InputGroup.Append>
              <Button
                variant="primary"
                value={replaceWith}
                onChange={handleReplceInputChange}
                tabIndex={4}
              >
                Replace
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Collapse>
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
          <NotesList notes={filteredNotes} searchTerm={findTerm} />
        )}
      </ListGroup>
    </div>
  );
};

export default Notes;
