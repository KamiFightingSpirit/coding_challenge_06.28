/*
 * Andrew DeHuff Notes:
 * The brute force solution is simple enough. For every character in the wordGrid we check in all eight directions
 * recursively building a string of the trailing characters along the way, and seeing if that string of characters
 * is in our dictionary at each step. If it is, we add it to our foundDictionary which we eventually return.
 *
 * This is of course terribly inefficient as we traverse the entire 8 directions regardless if there is any
 * possibility of a word match in that direction or not. e.g. If we had a million x million grid of 99.9999% "c", and were searching
 * for one word that started with "s" we would perform billions of useless operations using brute force.
 *
 * For my solution, I first constructed a n-directional tree out of our provided dictionary. This tree
 * holds a foundWord value that is set to any completely parsed word. And a node value which points to n-nodes.
 * The key for n-node is the n-th char of each word and the value is another tree node. As an example, parsing {"cat", "cad"}
 * would appear as following:
 * 					   root
 * 						|
 * 						c
 * 						|
 * 						a
 * 						/\
 *   foundword = cat - t d - foundWord = cad
 *
 * ***PLEASE NOTE THE ABOVE ILLUSTRATION ISN'T 100% ACCURATE DUE TO WHAT IS A BETTER SPOT TO STORE foundWords***
 *
 * I then traverse the grid, and, continuing with the example above, only enter recursive calls if a letter "c" is found, then "a", etc.
 * If ever a foundWord is found, it gets added to the resulting set.
 */
/*
 * This program should find all words from a dictionary in a grid of letters. Words
 * can be matched in any direction (horizontally, vertically, and diagonally).
 * For example, if passed the dictionary {"cat", "dog", "bird", "plane"}, the program
 * should return the set {"cat", "dog"}.
 *
 * 	    |  C  |  C  |  C  |
 *      |  C  |  A  |  C  |
 *      |  C  |  C  |  T  |
 * 		|  D  |  O  |  G  |
 *
 * Your task is to implement the main function and any other functions you may need to
 * complete the task. In addition to functionality, you'll be assessed on code efficiency,
 * overall structure/code decomposition, and error handling.
 */

/**
 * Finds all words from the dictionary that are present in the grid of letters
 * @param {Array} wordGrid Letter grid represented as an array of char arrays.
 * The first array from the above example would be passed in
 * as ["C", "C", "C"] and the second would be ["C", "A", "C"], etc...)
 * @param {Set} dictionary Contains all words to look for in the letter grid
 * @returns {Set} All words from the dictionary that were found
 */

const constructTree = require('./helpers/constructTree');
const traverseDictionaryTree = require('./helpers/traverseDictionaryTree');

function findWords(wordGrid, dictionary) {
  //exit immediately if no possible solution
  if (
    wordGrid === null ||
    wordGrid.length === 0 ||
    dictionary.size === 0 ||
    dictionary === null
  ) {
    return new Set();
  }
  let foundDictionary = new Set();
  let dictionaryTree = constructTree(dictionary);

  let pointers = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];
  //for each char in our wordGrid...
  for (let r = 0; r < wordGrid.length; r++) {
    for (let c = 0; c < wordGrid[r].length; c++) {
      //choose a direction...
      for (let point = 0; point < pointers.length; point++) {
        //and call our function
        traverseDictionaryTree(
          r,
          c,
          dictionaryTree,
          pointers[point],
          wordGrid,
          foundDictionary,
        );
      }
    }
  }
  return foundDictionary;
}

module.exports = findWords;
