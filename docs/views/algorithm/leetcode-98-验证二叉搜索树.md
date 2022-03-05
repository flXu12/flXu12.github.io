---
title: leetcode——验证二叉搜索树（98-中等）
date: 2022-03-05
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给你二叉树的根节点`root`，判断其是否是一个有效的二叉搜索树。   

**有效**二叉搜索树定义如下：  
- 节点的左子树只包含**小于**当前节点的数。
- 节点的右子树只包含**大于**当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

**示例**：  
```bash
    2
   / \
  1   3

输入：root = [2,1,3]
输出：true

    5
   / \
  1   4
     / \
    3   6

输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是5，但右子节点的值是4
```   

**提示**  
- 树中节点数目在范围`[0, 10^4]`内
- `-2^31 <= Node.val <= 2^31 - 1`

## 2. 思路分析
**陷阱：** 不能单纯只比较左节点小于中间节点，右节点大于中间节点。应该是比较左子树小于中间节点，同理，右子树大于中间节点。  
递归求解，在每次递归中，我们除了进行左右节点的校验，还需要与上下界进行判断。  

**相关概念：【二叉搜索树】**   
二叉搜索树/二叉查找树/二叉排序树（Binary Search Tree），它或者是一棵空树，或者是具有下列性质的二叉树：  
- 若它的左子树不空，则左子树上所有节点的值均小于它的根节点的值
- 若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值
- 它的左、右子树也分别为二叉搜索树

## 3. 题解  
**法一：辅助数组,中序遍历**
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
* @return { boolean }
*/
var isValidBST = function(root) {
  let arr = [];
  const buildArr = (root) => {
    if(root) {
      buildArr(root.left);
      arr.push(root.val);
      buildArr(root.right);
    }
  }
  buildArr(root);
  for(let i = 1; i < arr.length; ++i) {
    if(arr[i] <= arr[i - 1]) return false;
  }
  return true;
}
```  