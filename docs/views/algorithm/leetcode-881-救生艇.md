---
title: leetcode———救生艇(881-中等)
date: 2022-06-12
categories:
 - 算法
tags:
 - 算法
 - 贪心算法
 - leetcode-meduim
sidebar: auto
--- 

## 1. 题目描述
给定数组 people 。people[i]表示第 i 个人的体重 ，船的数量不限，每艘船可以承载的最大重量为 limit。  
每艘船最多可同时载两人，但条件是这些人的重量之和最多为 limit。  
返回 承载所有人所需的最小船数 。

```bash
# 示例1
输入：people = [1,2], limit = 3
输出：1
解释：1 艘船载 (1, 2)

# 示例2
输入：people = [3,2,2,1], limit = 3
输出：3
解释：3 艘船分别载 (1, 2), (2) 和 (3)

# 示例3
输入：people = [3,5,3,4], limit = 5
输出：4
解释：4 艘船分别载 (3), (3), (4), (5)
```

**提示：**   
- 1 <= people.length <= 5 * 10^4  
- 1 <= people[i] <= limit <= 3 * 10^4

## 2. 思路分析
**贪心算法**：尽最大努力维持船上右两个人。  
**思路**：  
- 将人的体重进行排序  
- 维护两个指针，每次让最重的一名上船，同时让最轻的也上船（当体重和大于limit时，让最重的上船）

## 3. 题解
```js
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function(people, limit) {
  people.sort();
  let left = 0, right = people.length - 1;
  let res = 0;
  while(left <= right) {
    res++;
    if(people[left] + people[right] <= limit) {
      left++;
    }
    right--;
  }
  return res;
};
```   
