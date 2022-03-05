---
title: leetcode——二叉树的层序遍历（102-中等）
date: 2022-03-05
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给你二叉树的根节点`root`，返回其节点值的**层序遍历**。 （即逐层地，从左到右访问所有节点）。  
**说明**: 叶子节点是指没有子节点的节点。

**示例**：  
```bash
    3
   / \
  9  20
    /  \
   15   7

输入： root = [3, 9, 20, null, null, 15, 7]
输出： [[3], [9, 20], [15, 7]]

输入：root = [1]
输出： [[1]]

输入：root = []
输出：[]
```   

**提示**  
- 树中节点数目在范围`[0, 2000]`内
- `-1000 <= Node.val <= 1000`

## 2. 思路分析
对二叉树进行先序遍历（根左右），同时记录节点所在的层级level，对每一层定义一个数组，然后将访问到的节点值放入对应层的数组中。  

**相关概念：【BFS】**  
宽度/广度优先搜索算法（Breadth First Search，BFS），从上到下，先把每一层遍历完之后再遍历下一层。  

## 3. 题解  
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
* @return { number[][] }
*/
var levelOrder = function(root) {
  if(!root) return [];
  const queue = [[root, 0]];
  const res = [];
  while(queue.length) {
    const [node, level] = queue.shift();
    if(!res[level]) {
      res[level] = [node.val];
    } else {
      res[level].push(node.val);
    }
    if(node.left) queue.push([node.left, level + 1]);
    if(node.right) queue.push([node.right, level + 1]);
  }
  return res;
}
```  