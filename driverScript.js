/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import { Tree, prettyPrint } from "./balancedBST.js";

function genRandArr(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    const randNum = Math.floor(Math.random() * 100);
    arr.push(randNum);
  }
  return arr;
}
// Generate random array
const arr = genRandArr(20);
// Create instance of Tree class
const tree = new Tree(arr);
// Print BST
prettyPrint(tree.root);
console.log("TREE BALANCED?: ", tree.isBalanced());
console.log("UNBALANCING THE TREE... DONE!");
for (let i = 0; i < 20; i++) {
  tree.insert(Math.floor(Math.random() * 100) + 100);
}
prettyPrint(tree.root);
console.log("CHECK TREE BALANCED?", tree.isBalanced());
console.log("REBALANCING THE UNBALANCED TREE... DONE!");
tree.rebalance();
prettyPrint(tree.root);
console.log("CHECK TREE BALANCED? ", tree.isBalanced());
console.log("LEVER TRAVERSAL:");
console.log(tree.levelOrderRecur());
console.log("PREORDER TRAVERSAL:");
console.log(tree.preorder());
console.log("INORDER TRAVERSAL:");
console.log(tree.inorder());
console.log("POST ORDER TRAVERSAL:");
console.log(tree.postorder());
