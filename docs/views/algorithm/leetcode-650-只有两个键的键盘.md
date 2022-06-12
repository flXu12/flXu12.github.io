---
title: leetcode———只有两个键的键盘(650-中等)
date: 2022-06-12
categories:
 - 算法
tags:
 - 算法
 - leetcode-meduim
sidebar: auto
--- 

## 1. 题目描述
最初记事本上只有一个字符 'A' 。你每次可以对这个记事本进行两种操作：  
- Copy All（复制全部）：复制这个记事本中的所有字符（不允许仅复制部分字符）。  
- Paste（粘贴）：粘贴 上一次 复制的字符。  
给你一个数字 n ，你需要使用最少的操作次数，在记事本上输出恰好 n 个 'A'。返回能够打印出 n 个 'A' 的最少操作次数。  

```bash
# 示例1
输入：3
输出：3
解释：
最初, 只有一个字符 'A'。
第 1 步, 使用 Copy All 操作。
第 2 步, 使用 Paste 操作来获得 'AA'。
第 3 步, 使用 Paste 操作来获得 'AAA'。

# 示例2
输入：n = 1
输出：0
```

**提示：**   
- 1 <= n <= 1000

## 2. 思路分析
- n = 1, 啥都不用做  
- n = 2, C-P，2次操作  
- n = 3, C-P-P，3次操作  
- n = 4, C-P-C-P 或 C-P-P-P, 4次操作  

1. 质数次数为其本身；  
2. 合数（自然数中除能被1和本身整除外，还能被其他的数整除的数）次数为将其分解到所有不能再分解的质数的操作次数的和。

## 3. 题解
```js
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function(n) {
  let res = 0;
  for(let i = 2; i <= n; i++) {
    while(n % i === 0) {
      res += i;
      n = Math.floor(n / i);
    }
  }
  return res;
};
```   
