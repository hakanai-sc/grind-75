/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
 * 
 * Given a binary search tree (BST), find the lowest common ancestor 
 * (LCA) of two given nodes in the BST.
 * 
 * According to the definition of LCA on Wikipedia: “The lowest common 
 * ancestor is defined between two nodes p and q as the lowest node in T
 * that has both p and q as descendants (where we allow a node to be a
 * descendant of itself).”
 */

/*
    pay attention to the fact that this is a binary *search* tree
    not a binary *tree*. the binary tree version of this problem is
    tougher. remember that BSTs are ordered:

    a binary search tree (BST), also called an ordered or sorted 
    binary tree, is a rooted binary tree data structure whose
    internal nodes each store a key greater than all the keys
    in the node's left subtree and less than those in its
    right subtree.

    from https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/
     For Binary search tree, while traversing the tree from top to bottom
     the first node which lies in between the two numbers n1 and n2 is the
     LCA of the nodes, i.e. the first node n with the lowest depth which
     lies in between n1 and n2 (n1<=n<=n2) n1 < n2. So just recursively
     traverse the BST in, if node’s value is greater than both n1 and n2
     then our LCA lies in the left side of the node, if it’s is smaller
     than both n1 and n2, then LCA lies on the right side. Otherwise,
     the root is LCA (assuming that both n1 and n2 are present in BST).
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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	// written by hakanai @ https://github.com/hakanai-sc/grind-75
    // empty case
    if (root === null) {
        return null;
    }

    // if the root at this point is greater than p and q,
    // we need to move leftward in the tree
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    // if the root at this point is less than p and q,
    // we need to move rightward in the tree.
    if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q);
    }

    // since we don't meet the conditions above, we are at the LCA.
    return root;
};