---
title: leetcode简单系列
date: 2021-06-15
categories:
 - 算法
tags:
 - 算法
 - leetcode
sidebar: auto
---  

## 17.12 BiNode
二叉树数据结构TreeNode可用来表示单向链表（其中left置空，right为下一个链表节点）。实现一个方法，把二叉搜索树转换为单向链表，要求依然符合二叉搜索树的性质，转换操作应是原址的，也就是在原始的二叉搜索树上直接修改。  
返回转换后的单向链表的头节点。  
示例：  
```bash
输入：[4, 2, 5, 1, 3, null, 6, 0]
输出：[0, null, 1, null, 2, null, 3, null, 4, null, 5, null, 6]
提示：节点数量不会超过100000
```  
**关键知识**  
- 二叉搜索树（二叉查找树，Binary Search Tree），指一棵空树或者具有以下性质的二叉树：
  1. 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
  2. 若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
  3. 任意节点的左、右子树也分别为二叉搜索树；
  4. 没有键值相等的节点。
- 二叉树的中序遍历（LDR）：首先遍历左子树，然后访问根节点，最后遍历右子树。
- 二叉树的前序遍历（VLR）：首先访问根节点，然后遍历左子树，最后遍历右子树。
- 二叉树的后序遍历（LRD）：首先遍历左子树，然后遍历右子树，最后访问根节点。

**思路**  
- 对于一个二叉搜索树来说，中序遍历的结果是一个有序数组。从示例可以看出输出的是一个有序数组。

**代码**  
```js
/**
* 二叉树节点的定义：
* function TreeNode(val) {
*   this.val = val;
*   this.left = this.right = null; 
* }
*/

/**
* @param {TreeNode} root
* @return {TreeNode}
*/
var convertBiNode = function(root) {
  let dummy = new TreeNode(null);
  dfs(root, dummy);
  return dummy.right;

  function dfs(node, tail) {
    if(!node) return tail;

    tail = dfs(node.left, tail);
    node.left = null;
    tail.right = node;
    tail = node;
    tail = dfs(node.right, tail);
    return tail;
  }
}
```