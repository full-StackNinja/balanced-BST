/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable max-classes-per-file */

// Define BST node
class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

function buildTree(arr, start, end) {
  if (arr.length === 0) return null;
  if (start > end) return null;
  const mid = parseInt((start + end) / 2, 10);
  const node = new Node(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

// BST Tree class
class Tree {
  constructor(arr) {
    // First sort array
    const sortedArr = arr.sort((a, b) => a - b);

    // delete duplicates
    const uniqueArr = Array.from(new Set(sortedArr));

    // Then return root node of the balanced BST
    this.root = buildTree(uniqueArr, 0, arr.length - 1);
  }

  #insertRecur(node, value) {
    if (node === null) return new Node(value);
    if (node.data > value) {
      node.left = this.#insertRecur(node.left, value);
    } else if (node.data < value) {
      node.right = this.#insertRecur(node.right, value);
    }

    return node;
  }

  insert(value) {
    this.root = this.#insertRecur(this.root, value);
  }

  #minRightNode(node) {
    if (node.left === null) return node;
    return this.#minRightNode(node.left);
  }

  #deleteNodeRecur(node, value) {
    // Base case
    if (node === null) return node;
    if (value < node.data) {
      node.left = this.#deleteNodeRecur(node.left, value);
    } else if (value > node.data) {
      node.right = this.#deleteNodeRecur(node.right, value);
    } else if (node.data === value) {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      // Childs of the deleted node are not null
      else {
        // Find min node in right of the node to delete(inorder successor)
        const minNode = this.#minRightNode(node.right);
        // replace node with it's inorder successor
        node.data = minNode.data;
        // Then delete leaf node
        node.right = this.#deleteNodeRecur(node.right, minNode.data);
      }
    }
    // Return root node with modified BST
    return node;
  }

  delete(value) {
    this.root = this.#deleteNodeRecur(this.root, value);
  }

  #findNode(node, value) {
    if (node === null) return node;
    if (node.data > value) {
      return this.#findNode(node.left, value);
    } else if (node.data < value) {
      return this.#findNode(node.right, value);
    } else {
      return node;
    }
  }

  find(value) {
    return this.#findNode(this.root, value);
  }

  #inorderRecur(node, cb) {
    if (cb) {
      if (node.left === null && node.right === null) return node;
      const nodeLeft = this.#inorderRecur(node.left, cb);
      if (nodeLeft) {
        cb(nodeLeft);
      }
      cb(node);
      const nodeRight = this.#inorderRecur(node.right, cb);
      if (nodeRight) {
        cb(nodeRight);
      }
    } else {
      return node === null ? [] : [...this.#inorderRecur(node.left)].concat(node.data).concat(...this.#inorderRecur(node.right));
    }
  }

  inorder(cb) {
    if (cb) {
      this.#inorderRecur(this.root, cb);
    } else {
      return this.#inorderRecur(this.root);
    }
  }

  #preOrderRecur(node, cb) {
    if (cb) {
      if (node.left === null && node.right === null) return node;
      cb(node)
      const nodeLeft = this.#preOrderRecur(node.left, cb)
      if (nodeLeft) {
        cb(nodeLeft)
      }
      const nodeRight = this.#preOrderRecur(node.right, cb)
      if (nodeRight) {
        cb(nodeRight)
      }
    }
    else {
      return node === null ? [] : [node.data].concat(...this.#preOrderRecur(node.left)).concat(...this.#preOrderRecur(node.right));
    }
  }

  preorder(cb) {
    if (cb) {
      this.#preOrderRecur(this.root, cb);
    } else {
      return this.#preOrderRecur(this.root);
    }
  }
}

// Function to print BST in tree format
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 2, 3, 4, 5, 6, 7];

const tree = new Tree(arr);
tree.insert();
// console.log(tree.delete())
prettyPrint(tree.root);
tree.delete();
prettyPrint(tree.root);
// console.log('node is: ',tree.find(6))
console.log('INORDER...')
tree.inorder(nodes);
console.log("PREORDER...")
tree.preorder(nodes)
console.log("POSTORDER...")
tree.postorder(nodes)
function nodes(node) {
  console.log(node.data)
}
