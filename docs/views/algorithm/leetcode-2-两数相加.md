---
title: leetcode——两数相加（2-中等）
date: 2021-07-17
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给你两个非空的链表，表示两个非负的整数。它们每个数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。  
请你将两个数相加，并以相同形式返回一个表示和的链表。  
你可以假设除了数字0之外，这两个数都不会以0开头。

**图示**
![](../images/algorithm-005.jpeg)  

```bash
# 示例1
输入： l1 = [2, 4, 3], l2 = [5, 6, 4]
输出： [7, 0, 8]
解释： 342 + 465 = 807

# 示例2
输入： l1 = [0], l2 = [0]
输出： [0]

# 示例3
输入： l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出： [8,9,9,9,0,0,0,1]
```

**提示：**  
- 每个链表中的结点数在范围[1, 100]内
- 0 <= Node.val <=9
- 题目数据保证列表表示的数字不含前导0

## 2. 思路分析
遍历链表，注意进位

## 3. 题解
```js
/**
单向链表定义：
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
var addTwoNumbers = function(l1, l2) {
  var list = cur = new ListNode(null);
  var sum = 0;
  var temp = 0; // 进位
  while(l1 || l2 || temp) {
    var val1 = l1 ? l1.val : 0;
    var val2 = l2 ? l2.val : 0;
    sum = val1 + val2 + temp;
    temp = sum > 9 ? 1 : 0;
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
    l1 && l1 = l1.next;
    l2 && l2 = l2.next;
  }
  return node.next;
}
```