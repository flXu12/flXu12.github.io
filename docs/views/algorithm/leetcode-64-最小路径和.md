---
title: leetcode——最小路径和(64-中等)
date: 2021-09-08
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给定一个包含非负整数的m*n网格grid，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向下或者向右移一步。  
**示例**：  
![](../images/algorithm-006.jpg)  

```bash
# 示例1
输入：grid = [[1,3,1], [1,5,1], [4,2,1]]
输出：7
解释：路径1--3--1--1--1的总和最小

# 示例2
输入：grid = [[1,2,3], [4,5,6]]
输出：12
```  

**提示：**  
- m == grid.length
- n == grid[i].length
- 1 <= m,n <=200
- 0 <= grid[i][j] <= 100

## 2. 思路分析
**动态规划**，从子问题的最优解进行构建。  
定义dp[i][j]表示包含第i行第j列元素的最小路径和；  
定义初始状态为dp[0][0] = grid[0][0], 即左上角元素的值。
题目定义每个元素的上一个位置只能来自其上方或者左侧，则有如下状态方程：  
```bash
dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
```   
另，还需要考虑两种特殊情况：  
- 第一行元素只能来自其左侧
- 第一列元素只能来自其上侧

综上，题目所求就是包含右下角元素的最小路径和:  
```js
var row = grid.length;
var col = grid[0].length;
// 所求即为：
dp[row-1][col-1] = ？？？
```

## 3. 题解
```js
/**
* @param {number[][]} grid
* @return {number}
*/
var minPathSum = function(grid) {
  var row = grid.length;
  var col = grid[0].length;
  // 处理第一行
  for(var i = 1; i < col; i++) {
    grid[0][i] += grid[0][i-1];
  }
  // 处理第一列
  for(var j = 1; j < row; j++) {
    grid[j][0] += grid[j-1][0];
  }

  for(var i = 1; i < row; i++) {
    for(var j = 1; j < col; j++) {
      grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1])
    }
  }

  return grid[row-1][col-1]
}
```