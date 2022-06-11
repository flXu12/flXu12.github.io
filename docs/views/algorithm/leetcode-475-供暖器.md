---
title: leetcode——供暖器(475-中等)
date: 2022-06-11
categories:
 - 算法
tags:
 - 算法
 - 二分法
 - leetcode-meduim
sidebar: auto
--- 

## 1. 题目描述
冬季已经来临。 你的任务是设计一个有固定加热半径的供暖器向所有房屋供暖。  
在加热器的加热半径范围内的每个房屋都可以获得供暖。  
现在，给出位于一条水平线上的房屋 houses 和供暖器 heaters 的位置，请你找出并返回可以覆盖所有房屋的最小加热半径。    
**说明**：所有供暖器都遵循你的半径标准，加热的半径也一样。

```bash
# 示例1
输入: houses = [1,2,3], heaters = [2]
输出: 1
解释: 仅在位置2上有一个供暖器。如果我们将加热半径设为1，那么所有房屋就都能得到供暖。

# 示例2
输入: houses = [1,2,3,4], heaters = [1,4]
输出: 1
解释: 在位置1, 4上有两个供暖器。我们需要将加热半径设为1，这样所有房屋就都能得到供暖。

# 示例3
输入：houses = [1,5], heaters = [2]
输出：3
```

**提示：**  
- 1 <= houses.length, heaters.length <= 3 * 10^4  
- 1 <= houses[i], heaters[i] <= 10^9

## 2. 思路分析
**二分查找**：在有序集合中搜索特定值的过程。  
1. 预处理：对未排序的集合进行排序  
2. 二分查找：找到合适的循环条件，每一次将查询空间一分为二  
3. 后处理：在剩余空间中，找到合适的目标值
 
- 初始条件：left = 0, right = length - 1  
- 终止：left > right  
- 向左查找：right = mid - 1  
- 向右查找：left = mid + 1

**思路**： 需要找到供暖器距离房屋最大的距离，即为最小加热半径。  

**易错点**：heaters数组的元素不一定是有序数组。因此需要首先对数组进行一次排序。

## 3. 题解
```js
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
  let res = 0;
  heaters.sort();
  for(const house of houses) {
    const i = binarySearch(heaters, house);
    const j = i + 1;
    const leftDistance = i < 0 ? Number.MAX_VALUE : house - heaters[i];
    const rightDistance = j >= heaters.length ? Number.MAX_VALUE : heaters[j] - house;
    const curDistance = Math.min(leftDistance, rightDistance);
    res = Math.max(res, curDistance);
  }
  return res;
};

var binarySearch = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  if(nums[left] > target) {
    return -1;
  }
  while(left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if(nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }
  return left
}
```   
