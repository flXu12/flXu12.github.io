---
title: leetcode——打家劫舍(198-中等)
date: 2021-09-08
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有互相连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。  
给定一个代表每个房屋存放金额的非负整数数组，计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。  

```bash
# 示例1
输入：[1,2,3,1]
输出：4
解释：偷窃1号房屋（金额=1），然后偷窃3号房屋（金额=3）。偷窃到的最高金额 = 1+3 = 4

# 示例2
输入：[2,7,9,3,1]
输出：12
解释：偷窃1号，3号，5号房屋，金额 = 2+9+1 = 12
```  

**提示：**  
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 400

## 2. 思路分析
**动态规划**  
定义状态dp[i]表示偷盗至第i个房屋时，所获取的最大利益，则有： 
```bash
dp[i] = max(dp[i-2]+nums[i], dp[i-1])
```  
另，需要特殊处理第1,2个房屋：  
- 第1个房屋： dp[0] = nums[0]
- 第2个房屋： dp[1] = max(nums[0], nums[1])  

那么我们所求即为: `dp[nums.length-1]`

## 3. 题解
```js
/**
* @param {number[]} nums
* @return {number}
*/
var rob = function(nums) {
  if(nums.length === 1) return nums[0];
  if(nums.length === 2) return Math.max(nums[0], nums[1]);
  for(var i = 2; i < nums.length; i++) {
    nums[i] = Math.max(nums[i-2]+nums[i], nums[i-1])
  }
  return nums[nums.length-1];
}
```