---
title: leetcode——最后一个单词的长度（58-简单）
date: 2022-02-28
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中最后一个单词的长度。  

**示例**：  
```bash
输入：s = "Hello World"
输出：5

输入：s = "   fly me   to   the moon  "
输出：4

输入：s = "luffy is still joyboy"
输出：6
```  

**提示：**   
- 1 <= s.length <= 104  
- `s`仅由英文字母和空格 ' ' 组成  
- `s`中至少存在一个单词   

## 2. 思路分析
注意陷阱：`s`结尾处可能存在空格  
1. 去除收尾空格
2. 以空格作为分隔符拆分数组
3. 取数组最后一个元素长度即为所得

## 3. 题解  
**法一**  
```js
/**
* @param {string} s
* @return {number}
*/
var lengthOfLastWord = function(s) {
  s = s.trim();
  const lastSpaceIndex = s.lastIndexOf(' ');
  return lastSpaceIndex < 0 ? s.length : s.length - lastSpaceIndex - 1;
};
```  
**法二**  
```js
/**
* @param {string} s
* @return {number}
*/
var lengthOfLastWord = function(s) {
  const arr = s.trim().split(' ');
  return arr[arr.length - 1].length;
};
```  