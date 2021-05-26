---
title: 排序算法-1
date: 2021-05-17
categories:
 - 算法
tags:
 - 算法
 - 排序
siderbar: none
---

## 一个小试练【难度：🌟】
在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序，使得排序后数组中球的顺序为：黄、红、蓝。  
> 如：红黄黄蓝蓝红蓝蓝红红红黄黄黄，排序后为：黄黄黄黄黄红红红红红蓝蓝蓝蓝。

```js
var str = '红黄黄蓝蓝红蓝蓝红红红黄黄黄';
var obj = {
  '黄': 0,
  '红':1,
  '蓝': 2
}
const str2 = str.split('').sort((a, b) => obj[a] - obj[b]);
console.log(str2); // ["黄", "黄", "黄", "黄", "黄", "红", "红", "红", "红", "红", "蓝", "蓝", "蓝", "蓝"]
```

## 1. 选择排序（SelectSort）
**【思路说明】**    
1. 从数组的开头起，以第一个元素作为初始比较对象，遍历整个数组，选择出最小的元素放在数组的第一个位置；
2. 然后再从第二个元素开始，以第二个元素作为初始比较对象，遍历未知顺序的数组部分，选择出最小的元素放在数组的第二个位置；
3. 对后面的元素分别重复上述步骤，直到所有的数据完成排序。  
**【复杂度说明】**  
- 时间复杂度为O(n^2)
- 空间复杂度为O(1)  
**【代码实现】**  
```js
function selectSort(array) {
  var minIndex = 0; // 最小值索引
  var tempValue; // 数据交换时暂存变量
  for(var i = 0; i < array.length; i++) {
    minIndex = i;
    for(var j = i + 1; j < array.length; j++) {
      if(array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    // 判断minIndex是否发生变更，若发生变更，则该索引对应的元素是最小值，交换两个元素位置即可
    if(minIndex !== i) {
      tempValue = array[minIndex];
        array[minIndex] = array[i];
        array[i] = tempValue;  // 这里的交换可以用ES6一行代码实现：[array[minIndex], array[i]] = [array[i], array[minIndex]]
    }
  }
  return array;
}
```

## 2. 快速排序（QuickSort）
**【思路说明】**  
1. 在数组中，选择一个元素作为‘基准（pivot）’；（基准值可以任意选择，但是选择中间的值比较容易理解）
2. 所有小于‘基准’的元素，都移到‘基准’的左边，所有大于‘基准’的元素，都移到‘基准’的右边；
3. 对‘基准’左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。  
**【复杂度说明】**  
- 时间复杂度为O(nlogn)
- 空间复杂度为O(n)  
**【代码实现】**  
```js
function quickSort(array) {
  if(array.length < 2) return array;
  var pivotIndex = Math.floor(array.length / 2);
  var pivot = array.splice(pivotIndex, 1)[0]; // 这一步很关键哦
  var leftArray = [];
  var rightArray = [];
  for(var i = 0; i < array.length; i++) {
    if(array[i] < pivot) {
      leftArray.push(array[i])
    } else {
      rightArray.push(array[i])
    }
  }
  return quickSort(leftArray).concat([pivot], quickSort(rightArray))
}
```
