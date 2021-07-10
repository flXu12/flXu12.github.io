---
title: leetcode——Z字形变换（6-中等）
date: 2021-07-10
categories:
 - 算法
tags:
 - 算法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
将一个给定字符串`s`根据给定的行数`numRows`，以从上往下、从左到右进行Z字形排列。
比如输入字符串为`"PAYPALISHIRING"`行数为3时，排列如下：

```bash
P A H N
APLSIIG
Y I R
```  
之后，你的输出需要从左往右逐行读取，产生一个新的字符串，比如：`"PAHNAPLSIIGYIR"`。  
请你实现这个将字符串进行指定行数变换的函数。  

```bash
# 示例1
输入： s = "PAYPALISHIRING", numRows = 3
输出： "PAHNAPLSIIGYIR"

# 示例2
输入： s = "PAYPALISHIRING", numRows = 4
输出： "PINALSIGYHRPI"
解释：  
P  I  N
A LS IG
YA HR
P  I

# 示例3
输入： s= "A", numRows = 1
输出： "A"
```

**提示：**  
- 1 <= s.length <= 1000
- s 由英文字母（小写和大写）、',' 和 '.' 组成
- 1 <= numRows <= 1000

## 2. 思路分析
周期为2n - 2

## 3. 题解
```js
var convert = function(s, numRows) {
  if(numRows === 1) return s;
  var peroid = numRows * 2 - 2;
  var array = [];
  
}
```