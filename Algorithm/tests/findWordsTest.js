const findWords = require('../findWords');
const assert = require('assert').strict;
const {
  wordGrid,
  searchList,
  answerGrid,
  testComments,
} = require('./data/test_data');

for (let test = 0; test < wordGrid.length; test++) {
  let dictionary = new Set(searchList[test]);
  let answerDictionary = new Set(answerGrid[test]);
  assert.deepStrictEqual(
    findWords(wordGrid[test], dictionary),
    answerDictionary,
  );
  console.log(`Success: for test: ${testComments[test]}`);
}
