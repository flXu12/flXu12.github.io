---
title: leetcode——加一（66-简单）
date: 2021-07-08
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
给定一个由**整数**组成的**非空**数组所表示的非负整数，在该数的基础上加一。  
最高位数字存放在数组的首位，数组中每个元素只存储**单个**数字。  
你可以假设除了整数0之外，这个整数不会以0开头。  

```bash
# 示例1
输入： digits = [1, 2, 3]
输出： [1, 2, 4]
解释： 输入数组表示数字123

# 示例2
输入： digits = [4, 3, 2, 1]
输出： [4, 3, 2, 2]
解释： 输入数组表示数字4321

## 示例3
输入： digits = [0]
输出： [1]
```  

**提示：**  
- 1 < digits.length <= 100
- 0 <= digits[i] <= 9

## 2. 思路分析
数字加法运算需要考虑两种情况：  
- 不进位（即，最后一位小于9）
- 进位（即，最后一位是9）  
  - 存在补位（即，原数字全部为9，位数加一，如99 + 1 = 100，两位数变成3位数）
  - 无补位（即位数不变，如：11 + 1 = 12，两位数）

上面的说法可以简要概述为：非9加1返回，逢9变0进位。

## 3. 题解
```js
var plusOne = function(digits) {
  for(var i = digits.length -1; i >= 0; i--) {
    if(digits[i] !== 9) {
      digits[i]++;
      break;
    } else {
      digits[i] = 0;
    }
  }

  if(digits[0] === 0) {
    digits.unshift(1);
  }
  return digits
}
```