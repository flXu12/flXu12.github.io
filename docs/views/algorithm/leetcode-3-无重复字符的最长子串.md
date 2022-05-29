---
title: leetcode——无重复字符的最长子串（3-中等）
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
给定一个字符串s，请你找出其中不含有重复字符串的最长子串的长度。

**示例1**：    
```bash
输入: s = "abcabcbb"
输出: 3
解释：因为无重复字符的最长子串是“abc”，所以其长度是3。
```  

**示例2**：  
```bash
输入：s = "bbbbb"
输出：1
解释：因为无重复字符的最长子串是"b"，所以其长度是1
```

**示例3**：  
```bash  
输入：s = "pwwkew"  
输出：3
解释：因为无重复字符的最长子串是"wke"，所以其长度为3。请注意，你的答案必须是子串的长度，“pwke”是一个子序列，不是子串
```

**提示：**   
- 0 <= s.length <= 5 * 10^4  
- s由英文字母、数字、符号和空格组成

## 2. 思路分析
维护一个可变长度的滑动窗口。  
**思路：**  
1. 维护一个窗口在输入的字符串中进行移动  
2. 当下一个元素在窗口中没出现过时，扩大窗口  
3. 当下一个元素在窗口中出现过时，缩小窗口，将出现过的元素及其左边的元素移出窗口
4. 记录下窗口出现过的最大值

**优化：**  
定义字符到索引的映射。当出现重复的字符时，即可跳过该窗口，而不需要对之前访问过的元素进行再次访问。

## 3. 题解
```js
/**
 * @param {string} s
 * @return {number}
 **/
var lengthOfLongestSubstring = function(s) {
  let hash = {};
  let result = 0; // 最长子串的长度
  for(let i = 0, j = 0; i < s.length; i++) {
    // i: 滑动窗口最后一个元素索引，j: 滑动窗口第一个元素索引
    if(hash[s[i]]) j = Math.max(hash[s[i]], j);
    result = Math.max(result, i - j + 1);
    hash[s[i]] = i + 1;
  }
  return result;
}
```