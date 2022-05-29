---
title: leetcode——找到字符串中所有字母异位词（438-中等）
date: 2022-05-29
categories:
 - 算法
tags:
 - 算法
 - 滑动窗口
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给定两个字符串s和p，找到d中所有p的异位词的子串，返回这些子串的起始索引。不考虑答案输出的顺序。  
**异位词：** 指由相同字母重排列形成的字符串（包括相同的字符串）。

**示例1**：    
```bash
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释：
起始索引等于0的子串时"cba"，它是"abc"的异位词
其实索引等于6的子串时"bac"，它是"abc"的异位词
```  

**示例2**：  
```bash
输入：s = "abab", p = "ab"
输出：[0,1,2]
解释：
起始索引等于0的子串是"ab"，它是"ab"的异位词
起始索引等于1的子串是"ba"，它是"ab"的异位词
起始索引等于2的子串是"ab"，它是"ab"的异位词
```

**提示：**   
- 0 <= s.length, p.length <= 3 * 10^4  
- s和p仅包含小写字母

## 2. 思路分析
通过双指针维护一个长度为p的窗口。  
判断字母异位词：窗口中的字母出现次数与目标串中的字母出现次数一致。

## 3. 题解
```js
/**
 * @param {string} s
 * @return {number}
 **/
var findAnagrams = function(s, p) {
  let hash = {};
  // hash：记录p字符串中每个元素出现的次数，count: p字符串长度
  for(let i = 0; i < p.length; i++) {
    if(!hash[p[i]]) {
      hash[p[i]] = 0;
    }
    hash[p[i]]++;
  }

  const isValidate = function(temp) {
    for(let i = 0; i < temp.length; i++) {
      // 包含两种情况：1.temp[i]不是p串中的子元素；2.temp[i]对应的元素个数超出p串中同值的元素个数
      if(!hash[temp[i]]) return false;
      hash[temp[i]]--;
    }
    return true;
  }

  let result = [];
  let left = 0;
  let right = p.length;
  while(right <= s.length) {
    let temp = s.slice(left, right);
    if(isValidate(temp)) result.push(left);
    left++;
    right++;
  }
  return result;
}
```