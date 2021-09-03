---
title: leetcode——最大子序和（53-简单）
date: 2021-07-20
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定一个整数数组nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

```bash
# 示例1
输入： nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
输出：6
解释：连续子数组[4, -1, 2, 1]的和最大，为6

# 示例2
输入： nums = [1]
输出：1

# 示例3
输入：nums = [0]
输出：0

# 示例4
输入： nums = [-1]
输出：-1

# 示例5
输入： nums = [-10000]
输出： -10000
```  

**提示：**  
- 1 <= nums.length <= 3 * 10^4
- -10^5 <= nums[i] <= 10^5

## 2. 思路分析
**思路一**：优化前缀  时间O(n),空间O(1)   
定义函数`S(i)`，表示计算从0（含0）到i（含i）的值，则`S(j) - S(i-1)`表示从i（含i）到j（含j）的值。需要维护max与min，最终返回max。  

**思路二**：动态规划  时间O(n),空间O(1)  
`dp[i]`表示从0到i（含i）的最大子序和，子序的最后一个元素就是`nums[i]`。  
`dp[i]`可以表示为`dp[i] = max(dp[i-1] + nums[i], nums[i])`，因此在计算最大子序和时，我们只需要关注前一个状态的值（即`dp[i-1]`）。  
定义currMaxSum为0到当前位置i的最大子序和，maxSum为全局最大子序和，则有：  
`currMaxSum = max(currMaxSum + nums[i], nums[i])`  
`maxSum = max(currMaxSum, maxSum)` 
## 3. 题解
**解法一：优化前缀**  
```js
/**
@param {number[]} nums
@return {number}
*/
var maxSubArray = function(nums) {
  var max = nums[0];
  var min = 0;
  var sum = 0;
  for(var i = 0; i < nums.length; i++){
    sum += nums[i];
    if(sum - min > max) max = sum - min;
    if(sum < min) min = sum;
  }
  return max;
}
```

**解法二：动态规划**  
```js
/**
@param {number[]} nums
@return {number}
*/
var maxSubArray = function(nums) {
  var max = nums[0];
  for(var i = 1; i< nums.length; i++){
    nums[i] = Math.max(0, nums[i-1]) + nums[i];
    if(nums[i] > max) max = nums[i];
  }
  return max;
}
```