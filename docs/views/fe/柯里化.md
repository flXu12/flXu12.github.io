---
title: 柯里化
date: 2021-05-31
categories:
 - 前端
tags:
 - JavaScript
sidebar: auto
---  

> JavaScript中，函数是一等公民。

## 0. 小试牛刀——数组扁平化  
已知有如下嵌套数组，编写一个程序将数组扁平化处理，去重，升序。  
```js
// 原始数组
var array = [1, 2, 3, [4, 3, [2, 7], 2], 5, [5, 9, 10], 7]
// 扁平化处理后的数组
array = [1, 2, 3, 4, 3, 2, 7, 2, 5, 5, 9, 10, 7]
// 去重、升序后：
array = [1, 2, 3, 4, 5, 7, 9, 10]
```  
扁平化：
【法一】：Array.prototype.forEach  
```js
function flatten(array) {
  var result = [];
  array.forEach(item => {
    if(Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item;)
    }
  });
  return result;
}
```  
【法二】：Array.prototype.reduce
```js
function flatten(array) {
  return array.reduce((pre, item) => {
    return pre.concat(Array.isArray(item) ? flatten(item) : item);
  }, [])
}
```  
【法三】：Array.prototype.flat
```js
function flatten(array) {
  return array.flat(Infinity);
}
```  
【法四】：Array.prototype.toString  
```js
function flatten(array) {
  return array.toString().split(',');
}
```  
【法五】：ES6扩展运算符,展开每一个类型为数组的元素
```js
function flatten(array) {
  while(array.some(item => Array.isArray(item))) {
    array = [].concat(...array)
  }
  return array
}
```
去重、升序:  
```js
function handle(array) {
  return Array.from(new Set(array)).sort((a, b) => { return a-b; })
}
```
## 1. 高阶函数  
高阶函数（Higher-order function)就是输入参数里有函数，或者输出是函数的函数。  
js内置了很多高阶函数，并且被我们频繁地使用，如：  
- Array.prototype.map
- Array.prototype.filter
- Array.prototype.reduce（可用于数组扁平化处理）  

以上都是将函数作为输入参数的，还有一种是输出函数的场景：**【函数柯里化】**
## 2. 什么是柯里化
## 3. 柯里化的特点
## 4. 柯里化的用途