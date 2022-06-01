---
title: leetcode——只出现一次的数字2(137-中等)
date: 2022-06-01
categories:
 - 算法
tags:
 - 算法
 - 位运算
 - leetcode-meduim
sidebar: auto
--- 

## 1. 题目描述
给你一个整数数组nums, 除某个元素仅出现一次外，其余每个元素都恰出现三次。请你找出并返回那个仅出现了一次的元素。

```bash
# 示例1
输入： nums = [2,2,3,2]
输出： 3

# 示例2
输入： nums = [0,1,0,1,0,1,99]
输出： 99
```

**提示：**  
- 1 <= nums.length <= 3 * 10^4  
- -2^31 <= nums[i] <= 2^31 - 1  
- nums中，除某个元素仅出现一次外，其余每个元素都恰出现三次

## 2. 思路分析
思路一：哈希表，用一个map结构存储每个元素出现的次数，最终返回仅出现一次的元素。  
思路二：对数组去重后求和，乘以3，减去原数组元素之和，结果等于目标元素的两倍。  
由于重复元素恰出现3次，那么对于数组`[A,A,A,B,B,B,C]`有：  
1. 去重，得到`[A,B,C]`  
2. 求和，乘3，得到`3 * (A + B + C)`
3. 相减，得到`3 * (A + B + C) - (A + A + A + B + B + B + C) = 2 * C`  
4. 上一步结果除以2即为所求，得到`C`

## 3. 题解
**法一：使用Map保存元素出现次数**
```js
/**
* @param {number[]} nums
* @return {number} 
*/
var singleNumber = function(nums) {
  let map = new Map();
  nums.forEach(item => {
    if(map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  });

  for(let [key, value] of map) {
    if(map.get(key) === 1) return key;
  }
}
```  

**法二：数学运算**
```js
/**
* @param {number[]} nums
* @return {number} 
*/
var singleNumber = function(nums) {
  const set = new Set(nums);
  let sum = 0;
  set.forEach(item => {
    sum += 3 * item;
  });
  nums.forEach(item => {
    sum -= item
  });
  return sum / 2;
}
```