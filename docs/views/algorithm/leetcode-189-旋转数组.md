---
title: leetcode——旋转数组（189-中等）
date: 2021-07-07
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
给定一个数组，将数组中的元素向右移动`k`个位置，其中`k`是非负数。  

```bash
# 示例1
输入： nums = [1, 2, 3, 4, 5, 6, 7], k = 3
输出：[5, 6, 7, 1, 2, 3, 4]

# 示例2
输入： nums = [-1, -100, 3, 99], k = 2
输出： [3, 99, -1, -100]
```

**提示：**  
- 1 <= nums.length < 2 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- 0 <= k <= 10^5

## 2. 思路分析  
当数组中的元素向右移动k个位置，则原数组中最后的k%nums.length个元素会移到头部进行填充，剩下的元素右移。

## 3. 题解
**解法一：** 取模平移  
```js
var rotate = function(nums, k) {
  if(nums.length < 2) return nums;
  var count = k % nums.length;
  var length = nums.length;
  if(!count) return nums;
  nums.unshift(...nums.slice(-count));
  nums.splice(length);
  return nums
}
```

**解法二：** 反转  
```js
var rotate = function(nums, k) {
  if(nums.length < 2) return nums;
  var count = k % nums.length;
  if(!count) return nums;
  var temp = nums.reverse();
  return temp.slice(0, k).reverse().concat(temp.slice(k).reverse());
}
```