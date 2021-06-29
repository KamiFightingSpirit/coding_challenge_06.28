const TreeNode = require('../Classes/TreeNode');

function constructTree(set) {
  //deconstruct dictionary into arr
  const words = [...set];
  const root = new TreeNode();
  //build up an n-array tree where each key for the next treeNode value is a unique char at index n of words
  for (let word of words) {
    let pointer = root;
    for (let i = 0; i <= word.length; i++) {
      if (i === word.length) {
        pointer.foundWord = word;
        pointer = root;
        break;
      }
      if (!pointer.children[word[i]]) {
        pointer.children[word[i]] = new TreeNode();
        pointer = pointer.children[word[i]];
      } else {
        pointer = pointer.children[word[i]];
      }
    }
  }
  return root;
}

module.exports = constructTree;
