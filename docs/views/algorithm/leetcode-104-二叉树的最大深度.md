---
title: leetcode——二叉树的最大深度（104-简单）
date: 2022-03-05
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定一个二叉树，找出其最大深度。   
二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。  
**说明**: 叶子节点是指没有子节点的节点。

**示例**：  
给定二叉树 [3, 9, 20, null, null, 15, 7]  
```bash
    3
   / \
  9  20
    /  \
   15   7
```   
返回它的最大深度3

## 2. 思路分析
每个节点的深度与其左右子树的深度有关，且等于其左右子树最大深度值+1。即：`maxDepth(root) = max(maxDepth(root.left), maxDepth(root.right)) + 1`

**相关概念：【DFS】**  
深度优先搜索算法（Depth First Search，DFS），对于二叉树而言，它沿着树的深度遍历树的节点，尽可能深的搜索树的分支，这一过程一直进行到已发现从源节点可达的所有节点为止。

## 3. 题解  
**法一：递归**  
```js
/**
* 二叉树节点定义：
* function TreeNode(val, left, right) {
*   this.val = (val === undefined ? 0 : val)
*   this.left = (left === undefined ? null : left)
*   this.right = (right === undefined ? null : right)
* }
*/

/**
* @param { TreeNode } root
* @return { number }
*/
var maxDepth = function(root) {
  if(!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```  