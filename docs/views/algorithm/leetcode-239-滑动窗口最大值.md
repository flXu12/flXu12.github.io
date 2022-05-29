---
title: leetcode——滑动窗口最大值（239-困难）
date: 2022-05-28
categories:
 - 算法
tags:
 - 算法
 - 滑动窗口
 - leetcode-hard
sidebar: auto
--- 

## 1. 题目描述
给你一个整数数组`nums`，有一个大小为k的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的k个数字。滑动窗口每次只向右移动一位。返回滑动窗口中的最大值。

**示例1**：   
```bash
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```  

**示例2**：  
```bash
输入：nums = [1], k = 1
输出：[1]
```

**提示：**   
- 1 <= nums.length <= 10^5  
- -10^4 <= nums[i] <= 10^4  
- 1 <= k <= nums.length  

## 2. 思路分析
在窗口滑动的过程中，队列中的第一个元素就是最大值。  
**双端队列（单调队列）**：是一种具有队列和栈的性质的数据结构。双端队列中的元素可以从两端弹出或插入。  
思路：  
1. 遍历数组，同时在双端队列的头维护当前窗口的最大值  
2. 在遍历过程中，发现当前元素比队列中的元素大，就将原来队列中的元素移除，确保队列的第一个值始终是当前窗口的最大值  
3. 在整个遍历过程中，记录每个窗口的最大值到结果数组中
4. 最终结果数组就是所求结果。

## 3. 题解
**法一：暴力解法**
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 **/
var maxSlidingWindow = function(nums, k) {
  let result = [];
  for(let i = 0; i < nums.length - k + 1; i++) {
    let max = nums[i];
    for(let j = i + 1; j < i + k; j++) {
      max = Math.max(max, nums[j])
    }
    result.push(max)
  }
  return result;
}
```

**法二：双端队列**  
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 **/
var maxSlidingWindow = function(nums, k) {
  if(nums.length === 0) return [];
  let queue = [];
  let result = [];
  for(let i = 0; i < nums.length; i++) {
    // 若当前元素大于队列中第一个元素，则移除原队列中的所有元素
    while(i && queue.length && nums[i] > queue[queue.length - 1]) {
      queue.pop();
    }
    // 将当前元素放入队列中
    queue.push(nums[i]);
    // 移动窗口，若窗口的第一个元素值等于队列中的最后一个元素，则移除原队列中的最后一个元素
    if(i >= k && nums[i - k] === queue[0]) {
      queue.shift();
    }
    if(i >= k - 1) {
      result.push(queue[0])
    }
  }
  return result;
}