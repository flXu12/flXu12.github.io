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

## 2. 判断两个对象是否相等  
场景：现有如下两个对象：  
```js
let obj1 = {
  name: 'xiaobai',
  age: 18
};

let obj2 = {
  name: 'xiaobai',
  age: 18
}
```  
对象`obj1`和对象`obj2`实际拥有的`key`/`value`是相同的，但如果此时对这两个对象做相等判断，会得到false的结论：  
```js
obj1 == obj2; // false
obj1 === obj2; // false
```  
原因是对象类型是通过引用来进行比较的，只有当两个对象指向同一个内存时，才会相等：  
```js
let obj1 = {
  name: 'xiaobai',
  age: 18
}

let obj3 = obj1; 

obj1 === obj3; // true
```  
那么，如果两个对象拥有相同的`key`/`value`，应该如何判断他们是“值相等”的呢？  
我们需要遍历两个对象的每个属性，判断它们是否相等：  
```js
/**
 * @param {object} obj1
 * @param {object} obj2
 * @return {boolean}
**/
function isEqual(obj1, obj2) {
  // 二者指向同一个内存
  if(obj1 === obj2) {
    return true;
  } else if([Object.prototype.toString.call(obj1) === '[object Object]' && Object.prototype.toString.call(obj2) === '[object Object]') { // 二者都是对象类型（不包含null）
    // 二者拥有的属性个数不同
    if(Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for(let prop in obj1) {
      if(obj2.hasOwnProperty(prop)) {
        if(!isEqual(obj1[prop], obj2[prop])) return false;
      } else {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
```   
但是，上述代码未考虑到如下几种情况：  
- 对象中存在值为`NaN`的属性（因为`NaN` === `NaN`返回false，通常使用`Number.isNaN()`来进行判断）
- 对象中存在函数、数组类型的属性

实际上，`lodash`已经提供了判断值相等的方法`isEqual`，这个方法执行深比较来确定两者的值是否相等，支持`array`, `buffer`, `boolean`, `date`, `object`, `error object`, `map`, `number`, `sets`, `string`, `symbol`等等，不包括继承的和可枚举的属性。    
**_.isEqual(value, other)**  
- value: 用来比较的值  
- other: 另一个用来比较的值  
- 返回：Boolean  
源码： [lodash源码之isEqual](https://github.com/lodash/lodash/blob/4.17.21/lodash.js#L11599)


