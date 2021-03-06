---
title: leetcode——最长公共前缀（14-简单）
date: 2021-07-06
categories:
 - 算法
tags:
 - 算法
 - leetcode-easy
sidebar: auto
--- 

## 1. 题目描述
编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串“”。  

```bash
# 示例1
输入： strs = ["flower", "flow", "flight"]
输出： "fl"

# 示例2
输入： strs = ["dog", "racecar", "car"]
输出： ""
解释： 输入不存在公共前缀
```

**提示：**  
- 0 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i]仅由小写英文字母组成

## 2. 思路分析
- 将第一个元素设置为基准元素，将其依次与后面的元素进行比较；
- 若目标元素查找基准元素索引为0，表示该基准元素是其最长公共前缀，将下一个元素作为目标元素与基准元素进行对比；
- 若目标元素查找基准元素索引不等于0，表示该基准元素不是其前缀，将基准元素的最后一个字符串干掉，再次进行比较

## 3. 题解
```js
var longestCommonPrefix = function(strs) {
  if(!strs.length) return "";
  var prefix = strs[0];
  var k = 1;
  while(prefix.length && k < strs.length) {
    if(strs[k].indexOf(prefix) === 0) {
      k++;
    } else {
      prefix = prefix.substring(0, prefix.length - 1);
    }
  }
  return prefix;
}
```