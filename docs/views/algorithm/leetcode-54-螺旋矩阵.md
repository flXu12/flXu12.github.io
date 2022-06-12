---
title: leetcode——螺旋矩阵(54-中等)
date: 2022-06-12
categories:
 - 算法
tags:
 - 算法
 - leetcode-meduim
sidebar: auto
--- 

## 1. 题目描述
给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

```bash
# 示例1
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]

# 示例2
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

**提示：**  
- m == matrix.length  
- n == matrix[i].length  
-  1 <= m, n <= 10  
- 100 <= matrix[i][j] <= 100  

## 2. 思路分析
按照“右 -> 下 -> 左 -> 上“的方向移动；每一次“碰壁”，就调整到下一个方向。   
边界处理：    
- 1. 数组的边界：  
  - 上：0     
  - 下：matrix.length - 1  
  - 左：0  
  - 右：matrix[0].length - 1    
- 2. 已经访问过的元素  

## 3. 题解
```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if(matrix.length === 0) return [];
  const row = matrix.length;
  const column = matrix[0].length;
  let left = 0, right = column - 1, top = 0, bottom = row - 1;
  let res = [];
  while(res.length < row * column) {
    // 从左到右
    for(let i = left; i <=right; i++) {
      res.push(matrix[top][i]);
    }
    top++;
    for(let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;
    for(let i = right; i >= left; i--) {
      res.push(matrix[bottom][i]);
    }
    bottom--;
    for(let i = bottom; i >= top; i--) {
      res.push(matrix[i][left]);
    }
    left++;
  }
  return res;
};
```   
