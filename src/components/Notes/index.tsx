import React, { useState } from 'react';
import LoaderButton from '../../components/LoaderButton';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Collapse from 'react-bootstrap/Collapse';
import Loading from '../common/Loading';
import NotesList from './NotesList';
import { filterNotes, replaceContent } from '../../utils/searchFunctions';
import { LinkContainer } from 'react-router-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import saveNote from '../../libs/notes/saveNotes';
import { onError } from '../../libs/errorLib';

export interface NotesProps {
  notes: INote[];
  isLoading: boolean;
  refetchNotes: () => void;
}

enum ActionType {
  Find,
  FindAndReplace,
}

const ActionName = new Map<ActionType, string>([
  [ActionType.Find, 'Find'],
  [ActionType.FindAndReplace, 'Find & Replace'],
]);

const Notes: React.FC<NotesProps> = ({ notes, isLoading, refetchNotes }) => {
  const [findTerm, setFindTerm] = useState<string>('');
  const [replaceTerm, setReplaceTerm] = useState<string>('');
  const [isReplacing, setIsReplacing] = useState<boolean>(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>(ActionType.Find);

  const handleFindInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindTerm(e.target.value);
  };

  const handleReplceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceTerm(e.target.value);
  };

  const handleCaseSensitiveToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCaseSensitive(e.target.checked);
  };

  const filteredNotes = filterNotes(notes, findTerm, isCaseSensitive);

  const handleReplaceSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsReplacing(true);
    try {
      await Promise.all(
        filteredNotes.map((note) =>
          saveNote({
            ...note,
            content: replaceContent(note.content, findTerm, replaceTerm, isCaseSensitive),
          })
        )
      );
    } catch (e) {
      onError(e);
    } finally {
      refetchNotes();
      setIsReplacing(false);
    }
  };

  return (
    <div className="notes">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
      <div className="search-container pb-3 mb-3 border-bottom">
        <Form onSubmit={handleReplaceSubmit} className="w-100">
          <Form.Check
            type="switch"
            id="case-sensitive"
            label="Case sensitive"
            className="text-right"
            checked={isCaseSensitive}
            onChange={handleCaseSensitiveToggleChange}
          />
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
              <FormControl
                type="text"
                placeholder="Replace with..."
                tabIndex={3}
                value={replaceTerm}
                onChange={handleReplceInputChange}
              />
              <InputGroup.Append>
                <LoaderButton
                  type="submit"
                  variant="primary"
                  tabIndex={4}
                  disabled={actionType !== ActionType.FindAndReplace}
                  isLoading={isReplacing}
                >
                  Replace
                </LoaderButton>
              </InputGroup.Append>
            </InputGroup>
          </Collapse>
        </Form>
      </div>
      <ListGroup>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>
        {isLoading || isReplacing ? (
          <Loading
            text={`${isLoading ? 'Loading' : 'Updating'} Your Notes...`}
            style={{ margin: '20px 0' }}
          />
        ) : filteredNotes.length == 0 ? (
          <ListGroup.Item action variant="light">
            {`No Notes Found${findTerm && ` - Searching for "${findTerm}"`}`}
          </ListGroup.Item>
        ) : (
          <NotesList
            notes={filteredNotes}
            searchTerm={findTerm}
            isCaseSensitive={isCaseSensitive}
          />
        )}
      </ListGroup>
    </div>
  );
};

export default Notes;
