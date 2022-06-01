---
title: leetcode——只出现一次的数字(136-简单)
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
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。    
**说明**：你的算法应该具有线性时间复杂度。你可以不使用额外空间来实现吗？

```bash
# 示例1
输入： [2,2,1]
输出： 1

# 示例2
输入： [4,1,2,1,2]
输出： 4
```

## 2. 思路分析
异或运算：  
- 任意一个数和0异或仍然为自己： `N ^ 0 = N`  
- 任意一个数和自己异或是0: `N ^ N = 0`  
- 异或操作满足交换律和结合律: `N ^ M ^ N = (N ^ N) ^ M = 0 ^ M = M`

题目描述重复的元素只出现两次，那么根据异或的交换律和结合律得到：对所有元素依次进行异或得出的结果即为只出现一次的元素。

## 3. 题解
```js
/**
* @param {number[]} nums
* @return {number} 
*/
var singleNumber = function(nums) {
  let result = 0; 
  nums.forEach(item => {
    result ^= item;
  });
  return result;
}
```