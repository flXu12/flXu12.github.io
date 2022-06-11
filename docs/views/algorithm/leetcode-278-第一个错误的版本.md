---
title: leetcode——第一个错误的版本(278-中等)
date: 2022-06-11
categories:
 - 算法
tags:
 - 算法
 - 二分法
 - leetcode-medium
sidebar: auto
--- 

## 1. 题目描述
你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。  
假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。    
你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。

```bash
# 示例1
输入：n = 5, bad = 4
输出：4
解释：
调用 isBadVersion(3) -> false 
调用 isBadVersion(5) -> true 
调用 isBadVersion(4) -> true
所以，4 是第一个错误的版本。

# 示例2
输入：n = 1, bad = 1
输出：1
```

**提示：**  
- 1 <= bad <= n <= 2^31 -1

## 2. 思路分析
**二分查找**：在有序集合中搜索特定值的过程。  
1. 预处理：对未排序的集合进行排序  
2. 二分查找：找到合适的循环条件，每一次将查询空间一分为二  
3. 后处理：在剩余空间中，找到合适的目标值
 
- 初始条件：left = 0, right = length - 1  
- 终止：left > right  
- 向左查找：right = mid - 1  
- 向右查找：left = mid + 1

**思路**： 假设珂珂每小时只吃掉1根香蕉，然后逐步递增吃香蕉的速度到`i`，刚好满足在h小时吃掉所有的香蕉，那么此时`i`即为所求。  

## 3. 题解
```js
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */
/**
* @param {function} isBadVersion()
* @return {function}
*/
var solution = function(isBadVersion) {
  /**
   * @param {integer} n 
   * @return {integer}
  **/ 
 return function(n) {
   let left = 1;
   let right = n;
   while(left < right) {
     const mid = left + Math.floor((right - left) / 2); // 不纠结mid应该靠左还是靠右，扩大查找的范围
     if(isBadVersion(mid)) {
       right = mid;
     } else {
       left = mid + 1;
     }
   }
   return left;
 }
}
```   
