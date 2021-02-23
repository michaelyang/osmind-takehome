# Osmind Take-home

Run:
```bash
$ npm run start
```

Test:
```bash
$ npm run test
```

There were some directory changes I have made for the component/container in question. While I did not apply it across the board for all other components, here are some changes to the structure and the thought process behind:
1. Used Typescript, some global type interfaces defined in `src/types`
2. Notes API actions centralized in `src/libs/notes` for easier maintainability
3. Search and replace related functions centralized in `src/utils/searchFunctions.ts` with `splitContent` being the main function that drives all the search and replace features
4. Grouping all Notes related components under a single directory in `src/componnets/notes` with `index.tsx` entrypoint
5. Placing commonly shared components such as the Loading component under `src/components/common`

Thought process on UI/UX:
1. Assumed that for a note taking app, a user would want to use the `Find` feature far more often than the `Find & Replace` feature. Hence, tucked away the `Find & Replace` form for easier UI. However, this could change depending on the observed user behavior
2. Was an obvious choice to highlight any searched terms
3. Case sensitivity was an easy implementation given the use of Regex
4. Not clearing form after `Find & Replace` is a common practice for most text editors. Mimicing behavior.
5. Refetching notes via API call after `Find & Replace` to avoid confusion and need to refresh.

Potential improvements:
1. Clear button for the text inputs
2. Confirmation prompt before `Find & Replace`
3. Frontend testing
4. Notes context with centralized `Find & Replace` related states to avoid prop drilling of `findTerm`, `replaceTerm`, and `isCaseSensitive`.

Caveats:
1. Issue with `Collapse` Bootstrap component throwing a warning on first expand. (https://github.com/react-bootstrap/react-bootstrap/issues/5075)
2. Issue with API call being based on the current state of the frontend. This can potentially run into issues with notes being overwritten. For example, if I load the notes on one tab, make changes to the notes in a second tab, then proceed to find and replace in the initial tab, any changes made in the second tab will be overwritten. (Solvable by versioning or changes in the API)
