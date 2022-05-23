---
title: 【day day up系列】2022年5月学习笔记
date: 2022-05-18
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 五月有宜人的温度，朝气的花花，要进步，希望与更加美好的人事物相遇～

## 1. 获取数组最后一个元素
问题演变具体场景： 获取某个`path`中的最后一层目录或文件名（如：`/www/bai/du/index.html`中的`index.html`）？   
1. Array.proptotype.pop()  
**Array.proptotype.pop()**: 删除数组的最后一个元素，并返回该元素的值。此方法会修改原数组。  
```js
let arr = [1,2,3,4];
arr.pop(); // 4
```  
2. arr[arr.length -1]  
根据数组长度获取最后一个元素的索引，取索引所在的元素返回即可。  
```js
let arr = [1,2,3,4];
arr[arr.length -1]; // 4
```  
3. Array.prototype.slice(-1)  
**Array.prototype.slice([begin[, end]])**：根据索引`begin`和`end`获取原数组的浅拷贝（包括`begin`,不包含`end`），返回一个新的数组。原数组不会被改变。  
```js
let arr = [1,2,3,4]；
arr.slice(-1); // [4]
```

