/**
 * Given a string and a splitTerm, split the string with the splitTerm
 * @param content
 * @param splitTerm
 * @param isCaseSensitive
 */
export const splitContent = (
  content: string,
  splitTerm: string,
  isCaseSensitive = false
): string[] => content.split(new RegExp(`(${splitTerm})`, isCaseSensitive ? 'g' : 'gi'));

/**
 * Given an array of notes and a searchTerm, return an array of string that contains the search term
 * @param notes
 * @param searchTerm
 * @param isCaseSensitive
 */
export const filterNotes = (
  notes: INote[],
  searchTerm: string,
  isCaseSensitive = false
): INote[] => {
  if (!searchTerm) {
    return notes;
  }

  return notes.filter((note) => {
    const parts = splitContent(note.content, searchTerm, isCaseSensitive);
    return parts.length > 1;
  });
};

/**
 * Given an string, a searchTerm, and a replaceTerm, return a string with serachTerm replaced with replaceTerm
 * @param content
 * @param searchTerm
 * @param replaceTerm
 * @param isCaseSensitive
 */
export const replaceContent = (
  content: string,
  searchTerm: string,
  replaceTerm: string,
  isCaseSensitive = false
): string => {
  if (!searchTerm) {
    return content;
  }

  const parts = splitContent(content, searchTerm, isCaseSensitive);

  return parts
    .map((part) => {
      const partToCompare = isCaseSensitive ? part : part.toLocaleLowerCase();
      const searchTermToCompare = isCaseSensitive ? searchTerm : searchTerm.toLocaleLowerCase();
      return partToCompare === searchTermToCompare ? replaceTerm : part;
    })
    .join('');
};
