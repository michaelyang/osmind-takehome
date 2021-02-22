import { API } from 'aws-amplify';

const saveNote = async (note: INote) => {
  return await API.put('notes', `/notes/${note.noteId}`, {
    body: note,
  });
};

export default saveNote;
