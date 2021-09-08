---
title: leetcode——反转字符串(344-简单)
date: 2021-09-08
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
编写一个函数，起作用是将输入的字符串反转过来。输入字符串以字符数组char[]的形式给出。  
不要给另外的数组分配额外的空间，你必须原地修改输入数组，使用O(1)的额外空间解决这一问题。  
你可以假设数组中的所有字符都是ASCII码表中的可打印字符。  

```bash
# 示例1
输入： ["h","e","l","l","o"]
输出： ["o","l","l","e","h"]

# 示例2
输入： ["H","a","n","n","a","h"]
输出： ["h","a","n","n","a","H"]
```

## 2. 思路分析
**双指针**  
首尾交换位置后分别向中间靠拢，直到两个指针指向位置相同。  
**复杂度**：时间O(n)，空间O(1)

## 3. 题解
```js
/**
* @param {character[]} s
* @return {void} Do not return anything,modify s in-place instead.
*/
var reverseString = function(s) {
  var left = 0;
  var right = s.length - 1;
  while(left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}
```