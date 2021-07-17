---
title: leetcode——合并两个有序链表（21-简单）
date: 2021-07-17
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。  

**图示**  
![](../images/algorithm-003.jpeg)  

```bash
# 示例1 
输入： l1 = [1, 2, 4], l2 = [1, 3, 4]
输出： [1, 1, 2, 3, 4, 4]

# 示例2
输入： l1 = [], l2 = []
输出： []

# 示例3
输入： l1 = [], l2 = [0]
输出： [0]
```  

**提示：**  
- 两个链表的结点数据范围是[0, 500]
- -100 <= Node.val <= 100
- l1和l2均按非递减顺序排列 

## 2. 思路分析
递归算法

## 3. 题解  
```js
/**
单向链表的定义：
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}
*/

/**
@param {ListNode} l1
@param {ListNode} l2
@return {ListNode}
*/
var mergeTwoLists = function(l1, l2) {
  if(l1 === null) return l2;
  if(l2 === null) return l1;
  if(l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}
```