---
title: 【day day up系列】2022年9月学习笔记
date: 2022-09-09
categories:
 - 日常
tags:
 - css
 - daily
siderbar: auto
---

> 昨天经历了些什么？

## 1. 怎么中断forEach循环?
**答**： 抛出错误。  
### forEach功能  
对数组的每个元素执行一次回调函数。  
### forEach语法   
```js
/**
 * @params {function} callback (currentValue[, index, array]) 为数组中每个元素执行的函数，接收三个参数
 * @params {object} 当执行回调函数时用作this的值(参考对象)
 * @return undefined
 */
Array.prototype.forEach(callback[, thisArg]);
```
### forEach原理  
```js
Array.prototype.forEach = function(callback, self) {
  let _arr = [...this];
  for(let i = 0; i < _arr.length; i++) {
    callback.call(self, _arr[i], i, _arr);
  }
}
```  
### 跳出forEach循环
```js
let arr = [...new Array(10).keys()];
try {
  arr.forEach(item => {
    if(item > 5) throw new Error('break');
  });
} catch (err) {
  if(err.message === 'break') {
    console.log('break success');
  } else {
    console.error(err);
  }
}
```