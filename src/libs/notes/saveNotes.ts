import { API } from 'aws-amplify';

const saveNote = async (note: INote) => {
  const response = await API.put('notes', `/notes/${note.noteId}`, {
    body: note,
  });
  return response;
};

export default saveNote;
