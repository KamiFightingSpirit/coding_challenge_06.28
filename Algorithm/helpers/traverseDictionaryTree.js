function traverseDictionaryTree(
  r,
  c,
  root,
  pointArr,
  wordGrid,
  foundDictionary,
) {
  //check if there is a foundWord, if there is add it
  if (root.foundWord) {
    foundDictionary.add(root.foundWord);
  }
  //make sure we aren't out of bounds
  if (
    r < 0 ||
    r >= wordGrid.length ||
    c < 0 ||
    c >= wordGrid[r].length
  ) {
    return;
  }
  //else set the currentChar that we are seeing in our wordGrid
  let currChar = wordGrid[r][c];
  //if that is not found, exit immediately
  if (!root.children[currChar]) {
    return;
  }
  //else continue in the same direction
  r = r + pointArr[0];
  c = c + pointArr[1];
  let branch = root.children[currChar];
  traverseDictionaryTree(
    r,
    c,
    branch,
    pointArr,
    wordGrid,
    foundDictionary,
  );
}

module.exports = traverseDictionaryTree;
