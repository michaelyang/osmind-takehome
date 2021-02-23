const { splitContent } = require('./searchFunctions');

test('Splits correctly', () => {
  const content1 = 'HelloaaWorld';
  const content2 = 'Helloa!aWorld!';
  const content3 = 'baa';

  const splitTerm1 = 'aa';
  const splitTerm2 = 'Aa';

  const expectedResult1 = ['Hello', 'aa', 'World'];
  const expectedResult2 = ['HelloaaWorld'];
  const expectedResult3 = ['Helloa!aWorld!'];
  const expectedResult4 = ['b', 'aa', ''];
  const expectedResult5 = ['baa'];

  expect(splitContent(content1, splitTerm1, true)).toEqual(expectedResult1);
  expect(splitContent(content1, splitTerm1, false)).toEqual(expectedResult1);
  expect(splitContent(content1, splitTerm2, false)).toEqual(expectedResult1);

  expect(splitContent(content1, splitTerm2, true)).toEqual(expectedResult2);

  expect(splitContent(content2, splitTerm1, true)).toEqual(expectedResult3);
  expect(splitContent(content2, splitTerm1, false)).toEqual(expectedResult3);

  expect(splitContent(content3, splitTerm1, true)).toEqual(expectedResult4);
  expect(splitContent(content3, splitTerm1, false)).toEqual(expectedResult4);
  expect(splitContent(content3, splitTerm2, true)).toEqual(expectedResult5);
  expect(splitContent(content3, splitTerm2, false)).toEqual(expectedResult4);
});

test('Split by whitespace', () => {
  const content1 = 'Hello World!';
  const content2 = 'HelloWorld!';

  const splitTerm = ' ';

  const expectedResult1 = ['Hello', ' ', 'World!'];
  const expectedResult2 = ['HelloWorld!'];

  expect(splitContent(content1, splitTerm, true)).toEqual(expectedResult1);
  expect(splitContent(content1, splitTerm, false)).toEqual(expectedResult1);
  expect(splitContent(content2, splitTerm, true)).toEqual(expectedResult2);
});

test('Empty content', () => {
  const content = '';

  const splitTerm1 = 'a';
  const splitTerm2 = '';

  const expectedResult = [''];

  expect(splitContent(content, splitTerm1, true)).toEqual(expectedResult);
  expect(splitContent(content, splitTerm1, false)).toEqual(expectedResult);
  expect(splitContent(content, splitTerm2, true)).toEqual(expectedResult);
  expect(splitContent(content, splitTerm2, false)).toEqual(expectedResult);
});

test('Empty splitTerm', () => {
  const content1 = 'Hello World!';
  const content2 = '';

  const splitTerm = '';

  const expectedResult1 = ['Hello World!'];
  const expectedResult2 = [''];

  expect(splitContent(content1, splitTerm, true)).toEqual(expectedResult1);
  expect(splitContent(content1, splitTerm, false)).toEqual(expectedResult1);
  expect(splitContent(content2, splitTerm, true)).toEqual(expectedResult2);
});
