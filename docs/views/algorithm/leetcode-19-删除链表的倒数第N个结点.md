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

**提示：**  
- 链表中结点的数目为sz
- 1 <= sz <= 30
- 0 <= Node.val <=100
- 1 <= n <= sz

## 2. 思路分析
**双指针**：关键是要找到倒数第N个元素。  
- 设置两个指针left和right，指针间隔N-1个元素；
- 初始状态下，left指向第`1`个元素，right指向第`N + 1`个元素；
- right指针开始向后遍历，直到遍历完所有元素，此时left指向的元素就是倒数第`N + 1`个元素;
- 删除left下一个结点后的链表即为所求。

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
@param {listNode} head
@param {number} n
@return {ListNode}
*/
var removeNthFromEnd = function(head, n) {
  if(head === null) return head;
  if(n === 0) return head;
  var left= head;
  var right = head;
  // 使left与right间距离n
  while(n > 0) {
    right = right.next;
    n--;
  }
  // 当right刚好指向链表最后一个结点的next时，表示头节点head即为要被删除的元素，返回head以后的结点即为所求
  if(right === null) return head.next;
  // 确保right遍历完整个链，使right最终指向链表最后一个结点，并与left距离保持不变
  while(right.next !== null) {
    right = right.next;
    left = left.next;
  }
  // 此时left指向的结点即为要被删除的结点的前一个结点，删除下一个结点后的链表即为所求
  left.next = left.next.next;
  return head;
}
```