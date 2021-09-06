---
title: leetcode——最长递增子序列(300-中等)
date: 2021-09-06
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给你一个整数数组`nums`, 找到其中最长严格递增子序列(Longest Increasing Subsequence, LIS)的长度。  
子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7]是数组[0,3,1,6,2,2,7]的子序列。  

```bash
# 示例1
输入： nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是[2,3,7,101]，因此长度为4

# 示例2
输入：nums = [0,1,0,3,2,3]
输出：4

# 示例3
输入：nums = [7,7,7,7,7,7,7]
输出：1
```

**提示：**  
- 1 <= nums.length <= 2500
- -10^4 <= nums[i] <= 10^4

## 2. 思路分析
**动态规划**  
定义dp[i]表示以nums[i]结尾的最长递增子序列的长度，则有：  
```bash
dp[i] = max(dp[j]+1, dp[k]+1, dp[p]+1, ...)
# 需满足如下条件：  
nums[i] > nums[j]
nums[i] > nums[k]
nums[i] > nums[p]
...
```
**复杂度**: 时间O(n^2),空间O(n)

## 3. 题解
```js
/**
* @param {number[]} nums
* @return {number}
*/
var lengthOfLIS = function(nums) {
  var dp = [];
  for(var i = 0; i < nums.length; i++) {
    dp[i] = 1;
    for(var j = 0; j < i; j++) {
      if(nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j]+1)
      }
    }
  }
  return Math.max(...dp)
}
```