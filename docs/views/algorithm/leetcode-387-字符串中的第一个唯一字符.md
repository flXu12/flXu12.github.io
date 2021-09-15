---
title: leetcode——字符串中的第一个唯一字符（387-简单）
date: 2021-09-15
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回-1.  
**提示：**你可以假定该字符串只包含小写字母。

**示例**：  
```bash
s = "leetcode"
返回 0

s = "loveleetcode"
返回 2
```

## 2. 思路分析
- 第一次遍历：遍历字符串，使用对象记录已经被遍历过的key，对象的value取被遍历过的次数；
- 第二次遍历：按顺序遍历字符串，若出现次数为1，则返回

## 3. 题解
```js
/**
* @param {string} s
* @return {number}
*/
var firstUniqChar = function(s) {
  var map = {};
  for(let value of s) map[value] = (map[value] || 0) + 1;
  for(var i = 0; i < s.length; i++) { // 为啥用for不用for...of？因为需要取到字符对应的索引值。
    if(map[s[i]] === 1) return i;
  }
  return -1;
```