---
title: leetcode——寻找旋转排序数组中的最小值(154-困难)
date: 2022-06-11
categories:
 - 算法
tags:
 - 算法
 - 二分法
 - leetcode-hard
sidebar: auto
--- 

## 1. 题目描述
已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,4,4,5,6,7] 在变化后可能得到：  
- 若旋转 4 次，则可以得到 [4,5,6,7,0,1,4]
- 若旋转 7 次，则可以得到 [0,1,4,4,5,6,7]  
注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。   
给你一个可能存在**重复**元素值的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的**最小元素**。
你必须尽可能减少整个过程的操作步骤。

```bash
# 示例1
输入：nums = [1,3,5]
输出：1

# 示例2
输入：nums = [2,2,2,0,1]
输出：0
```

**提示：**  
- n == nums.length  
- 1 <= n <= 5000  
- -5000 <= nums[i] <= 5000  
- nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转  

## 2. 思路分析
**二分查找**：在有序集合中搜索特定值的过程。  
1. 预处理：对未排序的集合进行排序  
2. 二分查找：找到合适的循环条件，每一次将查询空间一分为二  
3. 后处理：在剩余空间中，找到合适的目标值
 
- 初始条件：left = 0, right = length - 1  
- 终止：left > right  
- 向左查找：right = mid - 1  
- 向右查找：left = mid + 1

**思路**：  
- 旋转后的数组首元素一定大于尾元素。  
- 目标：找到将数组一分为二的点，该点左侧的元素都大于首元素，右侧的元素都小于首元素。   
- mid: 数组中间元素，大于首元素时，mid加1；小于首元素时，mid减1. 

## 3. 题解
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let left = 0;
  let right = nums.length - 1;
  while(left < right) {
    const mid = left + Math.floor(( right - left) / 2); // 不纠结mid应该靠左还是靠右，扩大查找的范围
    if(nums[mid] > nums[right]) {
      left = mid + 1;
    } else if(nums[mid] < nums[right]){
      right = mid;
    } else { 
      right--;  // 对比153,需要考虑元素重复的问题
    }
  }
  return nums[left];
};
```   
