---
title: leetcode——旋转字符串（796-简单）
date: 2022-02-28
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定两个字符串,`s`和`goal`。如果在若干次旋转操作之后，`s`能变成`goal`，那么返回`true`.   
`s`的旋转操作 就是将`s`最左边的字符移动到最右边。   
**例如：** 若s = 'abcde'，在旋转一次之后结果就是'bcdea'.    

**示例**：  
```bash
输入: s = "abcde", goal = "cdeab"
输出: true

输入: s = "abcde", goal = "abced"
输出: false
```  

**提示：**   
- 1 <= s.length, goal.length <= 100   
- `s`和`goal`由小写英文字母组成   

## 2. 思路分析
- `s + s`包含了所有可以通过旋转操作从`s`得到的字符串  

## 3. 题解  
```js
/**
* @param {string} s
* @param {string} goal
* @return {boolean}
*/
var rotateString = function(s, global) {
  if(s === global) return true;
  if(s.length !== global.length) return false;
  return (s + s).includes(global);
};
```