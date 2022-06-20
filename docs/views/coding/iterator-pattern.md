---
title: 【阿白在coding】设计模式之迭代器模式
date: 2022-06-20
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 时间和我都在往前走。  

## 1. 迭代器模式
**定义**：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。   
**内部迭代器**：内部定义好迭代规则，完全接手整个迭代过程，外部只需要一次初始调用。    
**外部迭代器**：必须显式地请求迭代下一个元素。  

## 2. 迭代器模式的实现
**简单的迭代器**：  
```js
const each = function(arr, callback) {
  for(let i = 0; i < arr.length; i++) {
    callback.call(arr[i], i, arr[i]);
  }
}

// 应用
each([1,2,3,4], function(index, item) {
  console.log(item)
})
```

### 2.1 内部迭代器 vs 外部迭代器 
**场景描述**：判断2个数组里元素的值是否完全相等。   

**实现一**：基于`each`（内部迭代器）的实现  
```js
const compare = function(arr1, arr2) {
  if(arr1.length !== arr2.length) {
    throw new Error('arr1和arr2不相等');
  }
  each(arr1, function(index, item) {
    if(item !== arr2[index]) {
      throw new Error('arr1和arr2不相等');
    }
  });
  console.log('arr1和arr2相等');
}

// 应用
compare([1,2,3], [1,2,4]); // throw new Error ( 'arr1和arr2不相等' );
```

**实现二**：外部迭代器  
```js
// 迭代器实现
const Iterator = function(obj) {
  let current = 0;
  const next = function() { current += 1; };
  const isDone = function() { return current >= obj.length; };
  const getCurrentItem = function() { return obj[current] };

  return {
    next,
    isDone,
    getCurrentItem
  }
}

// compare函数实现
const compare = function(arr1, arr2) {
  while(!arr1.isDone() && !arr2.isDone()) {
    if(arr1.getCurrentItem() !== arr2.getCurrentItem()) {
      throw new Error('arr1和arr2不相等');
    }
    arr1.next();
    arr2.next();
  }
  console.log('arr1和arr2相等')；
}

// 应用
const iterator1 = Iterator([1,2,3]);
const iterator2 = Iterator([1,2,3]);
compare(iterator1, iterator2); // 输出：arr1和arr2相等
```
### 2.2 迭代类数组对象和字面量对象
```js
const each = function(obj, callback) {
  let value, isArray = isArraylike(obj);
  
  if(isArray) { // 类数组
    for(let i = 0; i < obj.length; i++) {
      value = callback.call(obj[i], i, obj[i]);
      if(value === false) {
        break;
      }
    }
  } else {
    for(let i in obj) { // 字面量对象
      value = callback.call(obj[i], i, obj[i]);
      if(value === false) {
        break;
      }
    }
  }

  return obj;
}
```

### 2.3 倒序迭代器
```js
const reverseEach = function(arr, callback) {
  for(let i = arr.length - 1; i >= 0; i--) {
    callback(i, arr[i]);
  }
}

// 应用
reverseEach([0,1,2], function(index, item) {
  console.log(item); // 输出：2，1，0
})
```

### 2.4 中止迭代器
```js
const each = function(arr, callback) {
  for(let i = 0; i <= arr.length; i++) {
    if(callback(i, arr[i]) === false) { // callback的执行结果返回false时，提前中止迭代
      break;
    }
  }
}

// 应用
each([1,2,3,4,5], function(index, item) {
  if(item > 3) {
    return false;
  }
  console.log(item); // 输出：1，2，3
})
```