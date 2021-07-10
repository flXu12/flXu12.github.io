---
title: leetcode——三数之和（15-中等）
date: 2021-07-10
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给你一个包含`n`个整数的数组nums，判断`nums`中是否存在元素a, b, c，使得a + b + c = 0。请你找出所有和为0且不重复的三元组。  

```bash
# 示例1
输入： nums = [-1, 0, 1, 2, -1, -4]
输出： [[-1, -1, 2], [-1, 0, 1]]

# 示例2
输入： nums = [-2, 0, 0, 2, 2]
输出： [[-2, 0, 2]]

# 示例3
输入： nums = []
输出： []

# 示例4
输入： nums = [0]
输出： []
```

**提示：**  
- 0 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5

## 2. 思路解析
- 1. 排序
- 2. 遍历，固定一个数i，利用双指针查找另外两个符合条件的数
- 3. 和大于0，右指针左移一位；和小于0，左指针右移一位

## 3. 题解
```js
var threeSum = function(nums) {
  var i = 0;
  var array = [];
  nums.sort();
  while(i < nums.length - 2) {
    if(nums[i] > 0) break; // 若i对应元素>0，则表示另外两个数也绝对大于0，因此跳出循环，直接返回
    var sum = 0 - nums[i];
    var left = i + 1, right = nums.length - 1;
    while(left < right) {
      if(nums[left] + nums[right] === sum) {
        array.push([nums[i], nums[left], nums[right]]);
        while(nums[left] === nums[left + 1] && left < right) left++;
        while(nums[right] === nums[right - 1] && left < right) right--;
        left++;
        right--;
      } else if(nums[left] + nums[right] > 0) {
        while(nums[right] === nums[right - 1] && left < right) right--;
        right--;
      } else {
        while(nums[left] === nums[left + 1] && left < right) left++;
        left++;
      }
    }
    while(nums[i] === nums[i + 1]) i++;
    i++;
  }
  return array;
}
```