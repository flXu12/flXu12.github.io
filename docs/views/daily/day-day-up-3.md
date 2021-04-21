---
title: 【day day up系列】2021年4月学习日记
date: 2021-04-11
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 热爱生活，往心之所向那里去。

## 1. console.dir()
在控制台显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。
![](../images/daily-006.png)

![](../images/daily-007.png)

## 2. ES6中的TDZ（暂时性死区）
**<font color="#0000dd">什么是TDZ？</font>**
- TDZ(Temporal Dead Zone, 暂时性死区)是ES6（ES2015）中对作用域新的专用语义。

- ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，就会形成封闭作用域。<font color="#ff0000">凡是在声明之前就使用这些变量，就会报错。</font>

```js
// 在代码块内，使用let/const命令声明变量之前，该变量都是不可用的。

// console语句无法获取a的值，因为if语句内是一个块级作用域，从该作用域顶部开始到使用let声明a之前，a都不可用。
let a = 1;
if(true) {
  console.log(a);  // Uncaught ReferenceError: Cannot access 'a' before initialization
  let a = 2;   
}

// 此时可以获取a的值，a在上级块作用域中
let a = 1;
if(true) {
  console.log(a);  // 1 
}

// 使用let声明的a作用域与在if块内使用var声明的a作用域一致。let/const不允许在相同作用域内重复声明同一个变量。
let a = 1;
if(true) {
  console.log(a);  // Uncaught SyntaxError: Identifier 'a' has already been declared
  var a = 1;
}

// 使用var声明的a在if作用域内也生效。let/const不允许在相同作用域内重复声明同一个变量。
var a = 1;
if(true) {
  console.log(a); // Uncaught SyntaxError: Identifier 'a' has already been declared
  let a = 1;
}
```

