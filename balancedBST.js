/* eslint-disable no-unneeded-ternary */
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
    // delete duplicates
    const uniqueArr = Array.from(new Set(arr));

    // Sort array
    const sortedArr = uniqueArr.sort((a, b) => a - b);

    // Then return root node of the balanced BST
    this.root = buildTree(sortedArr, 0, sortedArr.length - 1);
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

  #levelTraverse(queue, cb) {
    if (cb) {
      if (queue.length === 0) return [];
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      cb(node);
      this.#levelTraverse(queue, cb);
    } else {
      if (queue.length === 0) return [];
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      return [node.data].concat(this.#levelTraverse(queue, cb));
    }
  }

  levelOrderRecur(cb) {
    if (cb) {
      this.#levelTraverse([this.root], cb);
    } else {
      return this.#levelTraverse([this.root]);
    }
  }

  levelOrderIter(callback) {
    const arr = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }

      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }
    }
    if (!callback) {
      return arr;
    }
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
      cb(node);
      const nodeLeft = this.#preOrderRecur(node.left, cb);
      if (nodeLeft) {
        cb(nodeLeft);
      }
      const nodeRight = this.#preOrderRecur(node.right, cb);
      if (nodeRight) {
        cb(nodeRight);
      }
    } else {
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

  #postOrderRecur(node, cb) {
    if (cb) {
      if (node.left === null && node.right === null) return node;
      const nodeLeft = this.#postOrderRecur(node.left, cb);
      if (nodeLeft) {
        cb(nodeLeft);
      }
      const nodeRight = this.#postOrderRecur(node.right, cb);
      if (nodeRight) {
        cb(nodeRight);
      }
      cb(node);
    } else {
      return node === null ? [] : [...this.#postOrderRecur(node.left)].concat(this.#postOrderRecur(node.right)).concat(node.data);
    }
  }

  postorder(cb) {
    if (cb) {
      this.#postOrderRecur(this.root, cb);
    } else {
      return this.#postOrderRecur(this.root);
    }
  }

  #getHeight(node) {
    let height = 0;
    if (node === null) return -1;
    height += 1;
    height += Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
    return height;
  }

  height(node) {
    const maxHeight = this.#getHeight(node);
    return maxHeight;
  }

  #getDepth(node, value) {
    let depth = 0;
    if (node.data === value) return 0;
    depth += 1;
    if (node.data > value) {
      depth += this.#getDepth(node.left, value);
    } else {
      depth += this.#getDepth(node.right, value);
    }
    return depth;
  }

  depth(node) {
    const depth = this.#getDepth(this.root, node.data);
    return depth;
  }

  #isBalancedRecur(queue) {
    if (queue.length === 0) return true;
    const node = queue.shift();
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }

    const heightLeft = this.height(node.left);
    const heightRight = this.height(node.right);
    const status = Math.abs(heightLeft - heightRight) > 1 ? false : true;

    return status * this.#isBalancedRecur(queue);
  }

  isBalanced() {
    const node = this.root;
    return this.#isBalancedRecur([node]) === 1 ? true : false;
  }

  rebalance() {
    const inorderArr = this.inorder();
    this.root = buildTree(inorderArr, 0, inorderArr.length - 1);
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

export { Tree, prettyPrint };
