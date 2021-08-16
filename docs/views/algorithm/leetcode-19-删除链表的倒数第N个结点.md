---
title: leetcode——删除链表的倒数第N个结点（19-中等）
date: 2021-07-13
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给你一个链表，删除链表的倒数第`n`个结点，并且返回链表的头节点。  
**图示：**  
![](../images/algorithm-002.jpeg)  

```bash
# 示例1
输入： head = [1,2,3,4,5], n = 2
输出： [1,2,3,5]

# 示例2
输入： head = [1], n = 1
输出： []

# 示例3
输入： head = [1,2], n = 1
输出： [1]
```
## 2. 思路分析
关键字： 双指针  
设置left,right双指针，right指针前进n个节点，然后left从头部开始与right一起遍历，直到right指向最后一个节点，此时left.next指向的节点就是需要被删除的节点。  

## 3. 题解  
```js
/*
单向链表定义：
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
*/
/**
@param {ListNode} head
@param {number} n
@return {ListNode}
*/
var removeNthFromEnd = function (head, n) {
  if(!head) return head;
  if(n === 0) return head;
  var left = head;
  var right = head;
  while(n > 0) {
    right = right,next;
    n--;
  }
  // 若right前进n个节点后不在链表中，则说明要删除的节点是head节点，此时返回head.next
  if(right === null) return head.next;
  while(right.next !== null) {
    right = right.next;
    left = left.next;
  }
  // 删除left.next节点
  left.next = left.next.next;
  return head;
}
```