---
title: leetcode——验证回文串（125-简单）
date: 2021-12-298
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。   
**说明：**本题中，我们将空字符串定义为有效的回文串。

**示例**：  
```bash
输入： "A man, a plan, a canal: Panama"
输出：true
解释："amanaplanacanalpanama"是回文串

输入："race a car"
输出： false
解释："raceacar"不是回文串
```

**提示：**  
- 1 <= s.length <= 2 * 10^5
- 字符串s由ASCII字符组成

## 2. 思路分析
**什么是回文串？**  
回文串是一个正读和反读都一样的字符串。  

知识点： 双指针。

第一步，撇掉字母和数字以外的字符，将字母转换成小写。
第二步，同时从两端开始遍历字符串，如果有不相等的，则直接返回false。

## 3. 题解
```js
/**
 * @param {string} s
 * @return {boolean}
*/
var isPalindrome = function(s) {
  const str = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let i = 0;
  let j = str.length - 1;
  while(i <= j) {
    if(str[i++] !== str[j--]) return false;
  }
  return true;
}
```