---
title: leetcode——合并两个有序链表（21-简单）
date: 2021-08-16
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
---   

## 1. 题目描述
将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。  
**图示：**  
![](../images/algorithm-003.jpg)  

```bash
# 示例1
输入： l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

# 示例2
输入： l1 = [], l2 = []
输出： []

# 示例3
输入： l1 = [], l2 = [0]
输出： [0]
```  

**提示：**  
- 两个链表的节点数目范围是[0, 50]
- -100 <= Node.val <=100
- l1和l2均按非递减顺序排列

## 2. 思路分析
设置指针初始指向l1,l2中较小的一个头结点，然后遍历l1,l2，使指针始终指向较小的那一个节点。

## 3. 题解
### 法一： 递归
```js
/*
单向链表的定义：
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (val === undefined ? null : next)
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

### 法二：迭代
```js
var mergeTwoLists = function(l1 ,l2) {
  if(l1 === null) return l2;
  if(l2 === null) return l1;
  var list = new ListNode();
  var result = list;
  while(l1 || l2) {
    if(l1 === null) {
      list.next = l2;
      break;
    }
    if(l2 === null) {
      list.next = l1;
      break;
    }
    if(l1.val <= l2.val) {
      list.next = l1;
      l1 = l1.next;
    } else {
      list.next = l2;
      l2 = l2.next;
    }
  }
  return result;
}
```