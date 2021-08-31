---
title: leetcode——环形链表（141-简单）
date: 2021-07-17
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定一个链表，判断链表中是否有环。  
如果链表中有某个结点，可以通过连续跟踪next指针再次到达，则链表中存在环。为了表示给定链表中的环，我们使用整数pos来表示链表尾连接到链表中的位置（索引从0开始）。如果pos是-1，则在链表中没有环。  
注意：pos不作为参数进行传递，仅仅是为了标识链表的实际情况。  
如果链表中存在环，则返回true；否则返回false

**图示**  
![](../images/algorithm-004.png)  

```bash
# 示例1
输入： head = [3, 2, 0, -4], pos = 1
输出：true
解释： 链表中有一个环，其尾部连接到第二个结点

# 示例2
输入：head = [1, 2], pos = 0
输出： true
解释： 链表总有一个环，其尾部连接到第一个结点

# 示例3
输入： head = [1], pos = -1
输出： false
解释：链表中没有环
```

**提示：**  
- 链表中结点的数目范围是[0, 10^4]
- -10^5 <= Node.val <= 10^5
- pos为-1或者链表中的一个有效索引

## 2. 思路分析
双指针解法: 设置快慢指针，慢指针每次移动一步，快指针每次移动两步，则总有一次快慢指针会同时指向同一个结点。

## 3. 题解一（非标准）——JSON.stringify
```js
/**
单向链表的定义：
function ListNode(val) {
  this.val = val;
  this.next = null
}
*/

/**
@param {ListNode} head
@return {Boolean}
*/
var hasCycle = function(head) {
  try {
    JSON.stringify(head);
  } catch(error) {
    return true;
  }
  return false;
}
```

## 4. 题解二
```js
/**
单向链表的定义：
function ListNode(val) {
  this.val = val;
  this.next = null
}
*/
/**
@param {ListNode} head
@return {Boolean}
*/
var hasCycle = function(head) {
  if(head === null) return false; 
  var slow = head;
  var fast = head;
  while(slow && fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if(slow === fast) return true;
  }
  return false;
}
```