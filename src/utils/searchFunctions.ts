/**
 * Given a string and a splitTerm, split the string with the splitTerm
 * @param content
 * @param splitTerm
 */
export const splitContent = (content: string, splitTerm: string, isCaseSensitive = false) =>
  content.split(new RegExp(`(${splitTerm})`, isCaseSensitive ? 'g' : 'gi'));

/**
 * Given an array of notes and a searchTerm, return an array of string that contains the search term
 * @param notes
 * @param searchTerm
 */
export const filterNotes = (notes: INote[], searchTerm: string): INote[] => {
  if (!searchTerm) {
    return notes;
  }

  return notes.filter((note) => {
    const parts = splitContent(note.content, searchTerm);
    return parts.length > 1;
  });
};
