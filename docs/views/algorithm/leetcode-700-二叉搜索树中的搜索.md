---
title: leetcode——二叉搜索树中的搜索（700-简单）
date: 2022-05-18
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定二叉搜索树（BST）的根结点`root`和一个整数值`val`。你需要在BST中找到节点值等于`val`的节点。 返回以该节点为根的子树。如果节点不存在，则返回`null`。 

**示例**：  
```bash
     4
    / \
   2   7
  / \
 1   3
输入: root = [4,2,7,1,3], val = 2
输出: [2,1,3]

     4
    / \
   2   7
  / \
 1   3
输入: root = [4,2,7,1,3], val = 5
输出: null
```  

**提示：**   
- 树中节点数在[1,5000]范围内
- 1 <= Node.val <= 10^7
- root是二叉搜索树
- 1 <= val <= 10^7

## 2. 思路分析
**二叉搜索树（BST）：**  
- 若它的左子树不为空，则所有左子树上的值均小于其根节点的值  
- 若它的右子树不为空，则所有右子树上的值均大于其根节点的值  
- 它的左右子树也分别为二叉搜索树

假设目标值为`val`，根据BST的特性，可以想到其查找过程：  
- 如果val小于当前节点的值，转向其左子树继续搜索  
- 如果val大于当前节点的值，转向其右子树继续搜索  
- 如果已找到，则返回当前节点。

## 3. 题解
**法一：递归**  
```js
/**
 * 一个二叉树节点的定义
 * function TreeNode(val, left, right) {
 *  this.val = (val === undefined ? 0 : val)
 *  this.left = (left === undefined ? null : left)
 *  this.right = (right === undefined ? null : right)
 * }
 **/
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 **/
var searchBST = function(root, val) {
  if(root === null) return null;
  if(root.val === val) return root;
  if(root.val > val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}
```
**法二：迭代**
```js
/**
 * 一个二叉树节点的定义
 * function TreeNode(val, left, right) {
 *  this.val = (val === undefined ? 0 : val)
 *  this.left = (left === undefined ? null : left)
 *  this.right = (right === undefined ? null : right)
 * }
 **/
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 **/
var searchBST = function(root, val) {
  while(root !== null) {
    if(root.val === val) return root;
    if(root.val > val) {
      root = root.left;
    } else {
      root = root.right;
    }
  }
  return null;
}
```