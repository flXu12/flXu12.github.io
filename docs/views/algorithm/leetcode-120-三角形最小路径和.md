---
title: leetcode——三角形最小路径和(120-中等)
date: 2021-09-06
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给定一个三角形`triangle`,找出自顶向下的最小路径和。  
每一步只能移动到下一行中相邻的结点上。相邻的结点在这里指的是下标与上一层结点下标相同或者等于上一层结点下标+1的两个结点。也就是说，如果正位于当前行的下标i，那么下一步可以移动到下一行的下标i或者i+1.

```bash
# 示例1
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下简图所示：
    2
   3 4
  6 5 7
 4 1 8 3
自顶向下的最小路径和为11（即，2+3+5+1=11）

# 示例2
输入：triangle = [[-10]]
输出：-10
```  

**提示：**  
- 1 <= triangle.length <=200
- triangle[0].length === 1
- triangle[i].length === triangle[i-1].length + 1
- -10^4 <= triangle[i][j] <= 10^4

## 2. 思路分析
**动态规划**  
定义`dp[i][j]`表示包含第i行第j列元素的最小路径和；
定义`dp[0][0]`表示初始位置（第0行第0列）所在的元素值；
则可得到状态转移方式：
```bash
dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]
```
另外：三角形每行最左和最右的元素的状态方程是固定的： 
```bash
# 最左
dp[i][0] = dp[i-1][0] + dp[i][0] # 因为dp[i-1][1]不相邻

# 最右
dp[i][i] = dp[i-1][i-1] + dp[i][i] # 因为dp[i-1][i]不存在
```  
**复杂度**: 时间O(n^2)，空间O(n^2)

## 3. 题解
```js
/**
* @param {number[]} triangle
* @return {number}
*/
var minimumTotal = function(triangle) {
  var row = triangle.length;
  if(!row) return 0;
  var dp = [];
  dp[0] = triangle[0];
  dp[0][0] = triangle[0][0];
  for(var i = 1; i < row; i++) {
    dp[i] = triangle[i];
    dp[i][0] = dp[i-1][0] + triangle[i][0]; // 处理最左
    for(var j = 1; j < i; j++){
      dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j-1]) + triangle[i][j];
    }
    dp[i][i] = dp[i-1][i-1] + triangle[i][i]; // 处理最右
  }
  return Math.min(...dp[row-1])
}
```

**优化：每一行的最优解仅依赖上一行的最优解**
```js
/**
* @param {number[]} triangle
* @return {number}
*/
var minimumTotal = function(triangle) {
  var row = triangle.length;
  if(!row) return 0;
  var dp = [];
  dp[0] = triangle[0][0];
  for(var i = 1; i < row; i++) { // 遍历行
    dp[i] = dp[i-1] + triangle[i][i]; // 处理最右
    for(var j = i - 1; j >= 1; j--) { // 从右往左遍历列
      dp[j] = Math.min(dp[j-1], dp[j]) + triangle[i][j];
    }
    dp[0] += triangle[i][0];
  }
  return Math.min(...dp)
}
```