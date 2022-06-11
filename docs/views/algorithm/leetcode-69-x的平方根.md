---
title: leetcode——x的平方根(69-简单)
date: 2022-06-11
categories:
 - 算法
tags:
 - 算法
 - 二分法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给你一个非负整数`x` ，计算并返回`x`的**算术平方根**。  
由于返回类型是整数，结果只保留**整数部分**，小数部分将被**舍去**。  

**注意**：不允许使用任何内置指数函数和算符，例如`pow(x, 0.5)`或者`x ** 0.5` 。

```bash
# 示例1
输入： x = 4
输出： 2

# 示例2
输入： x = 8
输出： 2
解释： 8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
```

**提示：**  
- 0 <= x <= 2^31 - 1

## 2. 思路分析
**二分查找**：在有序集合中搜索特定值的过程。  
1. 预处理：对未排序的集合进行排序  
2. 二分查找：找到合适的循环条件，每一次将查询空间一分为二  
3. 后处理：在剩余空间中，找到合适的目标值
 
- 初始条件：left = 0, right = length - 1  
- 终止：left > right  
- 向左查找：right = mid - 1  
- 向右查找：left = mid + 1

**思路**： 当x > 2时，它的整数平方根一定小于x/2，因此可以将  

## 3. 题解
```js
/**
* @param {number} x
* @return {number}
*/
var mySqrt = function(x) {
  if(x === 0) return 0;
  let left = 1;
  let right = x / 2;
  while(left < right) {
    const mid = Math.floor((left + right) / 2) + 1;
    if(mid > x / mid) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }
  return left;
}
```   
