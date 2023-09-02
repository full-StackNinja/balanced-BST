# balanced-BST
- Balanced Binary Search Tree implemmentation in JavaScript.
- Following methods have been defined for the BST:
  - insert(value): To insert the value as node in the tree by keeping the properties of BST
  - delete(value): to delete the node from the Tree
  - find(value): which accepts a value and returns the node with the given value
  - levelOrder(callBack): which accepts another function as a parameter and provide each node as the argument to the callback function. The method returns an array of values according to BFS if no function is given.
  - inorder method: to print tree elem
ents according to inorder tree traversal
  - preorder method: to print tree elements as per preorder tree traversal method
  - postorder method: to print tree elements according to post order tree traversal method
  - height(node): which accepts a node and returns its height
  - depth(node): which accepts a node and returns its depth from root node
  - isBalanced(): which checks if the tree is balanced or not
  - rebalance(): which rebalances the unbalanced tree