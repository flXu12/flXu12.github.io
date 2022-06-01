---
title: leetcode——丢失的数字(268-简单)
date: 2022-06-01
categories:
 - 算法
tags:
 - 算法
 - 位运算
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定一个包含`[0,n]`中n个数的数组nums，找出`[0,n]`这个范围内没有出现在数组中的那个数。

```bash
# 示例1
输入： nums = [3,0,1]
输出： 2
解释：n = 3，因为有3个数字，所以所有的数字都在范围[0,3]内。2是丢失的数字，因为它没出现在nums中。

# 示例2
输入： nums = [0,1]
输出： 2
解释：n = 2，因为有2个数字，所以所有的数字都在范围[0,2]内。2是丢失的数字，因为它没出现在nums中。  

# 示例3
输入：nums = [9,6,4,2,3,5,7,0,1]
输出：8
解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。

# 示例4
输入：nums = [0]
输出：1
解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。
```

**提示：**  
- n == nums.length  
- 1 <= n <= 10^4  
- 0 <= nums[i] <= n  
- nums中的所有数字都独一无二

## 2. 思路分析
思路一：求和运算，取差值  
1. 求和1～n，得到完整的1到n的和： `(n + 1) * n / 2`  
2. 求和目标数组
3. 求差即为所求

思路二：异或运算：从0～n依次对目标数组进行异或运算
**异或运算特点**：   
- 任意一个数和0异或仍然为自己： `N ^ 0 = N`  
- 任意一个数和自己异或是0: `N ^ N = 0`  
- 异或操作满足交换律和结合律: `N ^ M ^ N = (N ^ N) ^ M = 0 ^ M = M` 

## 3. 题解
**法一：求和运算**
```js
/**
* @param {number[]} nums
* @return {number} 
*/
var missingNumber = function(nums) {
  let result = (nums.length + 1) * nums.length / 2;
  nums.forEach(item => {
    result -= item;
  });
  return result;
}
```   

**法二：异或运算**   
```js
/**
* @param {number[]} nums
* @return {number} 
*/
var missingNumber = function(nums) {
  let result = 0;
  nums.forEach((item, index) => {
    result ^= item ^ index;
  });
  return result ^ nums.length;
}
``` 