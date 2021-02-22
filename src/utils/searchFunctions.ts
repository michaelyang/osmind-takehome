/**
 * Given an array of notes, return an array of string that contains the search term
 * @param notes
 * @param searchTerm
 */
export const filterNotes = (notes: INote[], searchTerm: string): INote[] => {
  if (!searchTerm) {
    return notes;
  }

  return notes.filter((note) => {
    const regex = new RegExp(searchTerm, 'gi');
    return note.content.match(regex);
  });
};
