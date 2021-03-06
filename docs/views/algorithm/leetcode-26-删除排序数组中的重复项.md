---
title: leetcode——删除排序数组中的重复项（26-简单）
date: 2021-07-10
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给你一个有序数组`nums`，请你**原地**删除重复出现的元素，使每个元素**只出现一次**，返回删除后数组的新长度。  
不要使用额外的数组空间，你必须在**原地修改输入数组**并在使用O(1)额外空间的条件下完成。‘

```bash
# 示例1
输入： nums = [1, 1, 2]
输出： 2, nums = [1, 2]
解释： 函数应该返回新的长度2，并且原数组nums的前两个元素被修改为1,2,。不需要考虑数组中超出新长度后面的元素。

# 示例2
输入： nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
输出： 5, nums = [0, 1, 2, 3, 4]
解释： 函数应该返回新的长度5，并且原数组nums的前五个元素被修改为0,1,2,3,4。不需要考虑数组中超出新长度后面的元素。
```

**提示：**  
- 0 <= nums.length <= 3 * 10^4
- -10^4 <= nums[i] <= 10^4
- nums已按升序排列

## 2. 思路分析
遍历数组，若当前遍历元素等于前一个元素，则移除当前元素；反之，继续往后遍历。

## 3. 题解
```js
var removeDuplicates = function(nums) {
  var i = 1;
  while(i < nums.length) {
    if(nums[i] === nums[i-1]) {
      nums.splice(i, 1);
    } else {
      i++;
    }
  }
  return nums.length;
}
```