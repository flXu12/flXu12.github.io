---
title: leetcode——两个数组的交集（350-简单）
date: 2021-07-06
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述  
给定两个数组，编写一个函数计算它们的交集。  

```bash
# 示例1
输入： nums1 = [1, 2, 2, 1], nums2 = [2, 2]
输出： [2, 2]

# 示例2
输入： nums1 = [4, 9, 6], nums2 = [9, 4, 9, 8, 4]
输出： [4, 9]
```

**说明：**  
- 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致
- 我们可以不考虑输出结果的顺序

## 2. 思路分析
考察点是：**映射**  
将映射处理成：**元素：出现次数**

## 3. 题解
```js
var intersect = function(nums1, nums2) {
  var map = {};
  // 遍历nums1，初始化映射
  nums1.forEach(item => {
    if(!map[item]) {
      map[item] = 1;
    } else {
      map[item] += 1;
    }
  });
  // 设置指针从0开始，遍历nums2，若元素在map中出现过，则次数减1，并将nums2对应指针位置的元素赋值为目标元素
  var k = 0;
  nums2.forEach(item => {
    if(map[item] > 0) {
      map[item] -= 1;
      nums2[k] = item;
      k++;
    }
  });
  return nums2.slice(0, k);
}
```

## 4. 进阶
### 4.1 如果给定的数组已经排好序呢？你将如何优化你的算法？
**思路分析：** 
双指针解法。比较两个指针的元素是否相等，若相等，则将该指针对应的元素存入一个新数组；若不相等，则将较小元素对应的指针后移一位，直到任意一个数组终止。  
**题解：**  
```js
var intersect = function(nums1, nums2) {
  var k = 0;
  var p1 = 0, p2 = 0;
  while(p1 < nums1.length && p2 < nums2.length) {
    if(nums1[p1] === nums2[p2]) {
      nums1[k] = nums1[p1];
      p1++;
      p2++;
      k++;
    } else if(nums1[p1] < nums2[p2]) {
      p1++;
    } else {
      p2++;
    }
  }
  return nums1.slice(0, k);
}
```

**小贴士：**  
在上述题解过程中，尽量避免了创建新的数组。由于已经被遍历过的数组后续不再使用，因此可将交集元素存入已经使用过的数组，只需在返回时截取交集部分的元素即可。
