---
title: leetcode——爬楼梯（70-简单）
date: 2021-07-19
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
假设你正在爬楼梯，需要n阶你才能到达楼顶。每次你可以爬1或2个台阶。你有多少种不同的方法可以爬到楼顶呢？  
**注意**：给定n是一个正整数

```bash
# 示例1
输入：2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1阶 + 1阶
2. 2阶

# 示例2
输入：3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1阶 + 1阶 + 1阶
2. 1阶 + 2阶
3. 2阶 + 1阶
```

## 2. 思路分析
动态规划： 将多阶段过程转化为一系列单阶段问题，利用各阶段之间的关系，逐个求解。  
- 上1阶：有1种方法；
- 上2阶：有2种方法：1+1， 2；
- 上3阶：有3种方法：1+1+1，1+2，2+1
- 上4阶：有5种方法：1+1+1+1，2+1+1，1+1+2，1+2+1，2+2

令dp[n]表示能到达第n阶的方法总数，则：  
```bash
dp[n] = dp[n-1] + dp[n-2]  
```  

## 3. 题解
**题解1**：时间复杂度高
```js
/**
@param {number} n
@return {number}
*/
var climbStairs = function(n) {
  if(n < 3) return n;
  return climbStairs(n-1) + climbStairs(n-2);
}
```  

**题解2**：空间换时间
```js
/**
@param {number} n
@return {number}
*/
var climbStairs = function(n) {
  var result = [1, 2];
  for (var i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i -2])
  }
  return result[n -1];
}