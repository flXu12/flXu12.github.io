---
title: 剑指offer——和为s的连续正数序列（57-简单）
date: 2022-05-30
categories:
 - 算法
tags:
 - 算法
 - 滑动窗口
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
输入一个正整数`target`，输出所有和为`target`的连续正整数序列（至少包含两个数）。  
序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。  

**示例1**：  
```bash
输入: target = 9
输出: [[2,3,4], [4,5]]
```  

**示例2**：  
```bash
输入: target = 15
输出: [[1,2,3,4,5], [4,5,6], [7,8]]
```  

**提示：**   
- 1 <= target <= 10^5

## 2. 思路分析
通过左右双指针移动，维护一个长度可变的滑动窗口。  
对于一个给定值`target`,总是小于它的中值与中值+1的和。例如：100 < 50 + 51, 99 < 50 + 51.  
**中值（中位数）**：指将统计总体当中的各个变量值按照从小到大的顺序排列起来，处于数列中间位置的值就是中值。
由上可知，只要窗口左边界超过中值，则窗口中的数据之和一定大于`target`.    

思路：    
- 若窗口值过小，则右指针+1；  
- 若窗口值过大，则左指针+1；
- 若左指针所指元素 > `target`中值，则结束

## 3. 题解  
```js
/**
* @param {number} target
* @return {number[][]} 
*/
var findContinuousSequence = function(target) {
  let result = [], arr = [];
  let left = 1, right = 1; // 连续正整数，从1开始
  let sum = 0;
  while(left <= target / 2) {
    if(sum < target) { // 窗口值小于target，右指针+1，对应sum加上移入窗口的右元素值
      sum += right;
      arr.push(right);
      right++;
    } else if(sum > target) { // 窗口值大于target，左指针+1，对应sum减去移出窗口的左元素值
      sum -= left;
      arr.shift();
      left++;
    } else { // 窗口值 === target,将窗口序列推入result；left指针+1，sum减去移出窗口的左元素，继续寻找新的窗口
      result.push(arr.slice(0)); // 不能直接将arr推入result，因为arr是可变的，需要推入arr的副本
      sum -= left;
      arr.shift(); // 每次指针发生变化都需要更新arr.
      left++;
    }
  }
  return result;
}
```