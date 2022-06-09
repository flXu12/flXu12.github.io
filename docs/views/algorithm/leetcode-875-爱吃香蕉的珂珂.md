---
title: leetcode——爱吃香蕉的珂珂(875-中等)
date: 2022-06-09
categories:
 - 算法
tags:
 - 算法
 - 二分法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
珂珂喜欢吃香蕉。这里有`n`堆香蕉，第`i`堆中有`piles[i]`根香蕉。警卫已经离开了，将在`h`小时后回来。  
珂珂可以决定她吃香蕉的速度`k`（单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉`k`根。如果这堆香蕉少于`k`根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  
珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉.  
返回她可以在`h`小时内吃掉所有香蕉的最小速度`k`（`k`为整数）。

```bash
# 示例1
输入： piles = [3,6,7,11], h = 8
输出： 4

# 示例2
输入： piles = [30,11,23,4,20], h = 5
输出： 30

# 示例3
输入：piles = [30,11,23,4,20], h = 6
输出：23
```

**提示：**  
- 1 <= piles.length <= 10^4
- piles.length <= h <= 10^9
- 1 <= piles[i] <= 10^9

## 2. 思路分析
**二分查找**：在有序集合中搜索特定值的过程。  
1. 预处理：对未排序的集合进行排序  
2. 二分查找：找到合适的循环条件，每一次将查询空间一分为二  
3. 后处理：在剩余空间中，找到合适的目标值
 
- 初始条件：left = 0, right = length - 1  
- 终止：left > right  
- 向左查找：right = mid - 1  
- 向右查找：left = mid + 1

**思路**： 假设珂珂每小时只吃掉1根香蕉，然后逐步递增吃香蕉的速度到`i`，刚好满足在h小时吃掉所有的香蕉，那么此时`i`即为所求。  

## 3. 题解
```js
/**
* @param {number[]} piles
* @param {number} h
* @return {number}
*/
var minEatingSpeed = function(piles, h) {
  let left = 1;
  let right = Math.max(...piles, 1);
  while(left < right) {
    const mid = left + ((right - left) >> 1); // 关注位运算 >> 
    if(canEat(piles, mid, h)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

var canEat = function(piles, speed, h) {
  let sum = 0;
  piles.forEach(item => {
    sum += Math.ceil(item / speed); // 向上取整。如果这堆香蕉少于speed根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
  });
  return sum > h;
}
```   
