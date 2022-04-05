/**
 * 226. Invert Binary Tree
 * 
 * Given the root of a binary tree, invert the tree, and return its root.
 */

/*
    if you don't know what a binary tree is: it's a tree that can only contain
    two nodes, left and right in this case.

    to invert this, we want right to become left. it is best just to memorize
    this technique imo, and do it recursively. we want to make left right and
    right left the whole way down the tree.

    starting with the root node, we swap left and right. then we look at both
    left and right, and then swap them, which recursively traverses the whole
    tree and does this from the top down (BFS).

    we can just change left-right and everything else follows because it
    is all passed by reference as these are JS objects.
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function invertTree(root: TreeNode | null): TreeNode | null {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75
    
    // left is right and right is left.
    if (root === null) {
        return null;
    }

    // move left to right and right to left.
    const tmp = root.left;
    root.left = root.right;
    root.right = tmp;

    // recursively invert the leaves of the tree underneath us.
    invertTree(root.left);
    invertTree(root.right);

    // return the root.
    return root;
};