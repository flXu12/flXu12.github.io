---
title: Promise/A+规范
date: 2021-04-19
categories:
 - 前端
tags:
 - JavaScript
 - Promise
sidebar: auto
---

> 规范之所以被广为流传，原因通常是集最佳实践后总结的经验。

**Promise A+ : 一个开放、健全且通用的JavaScript Promise标准。**

## 1. 术语
1. **promise**：是一个具备符合上述标准的then方法的object或function。
2. **thenable**：是一个定义then方法的object或function。
3. **value**：是一个合法的JavaScript值（包括undefined、thenable、promise）
4. **exception**：是一个用throw语句抛出来的值
5. **reason**：是一个解释为什么promise被拒绝的值

## 2. 要求
### 2.1 Promise状态
一个promise的状态必须为以下三种状态中的一个：pending、fulfilled、rejected。

- 当状态为pending时，promise可能会转换为fulfilled或者rejected
- 当状态为fulfilled时，promise不能再转换为任意其他状态；必须有一个不变的value
- 当状态为rejected时，promise不能再转换为任意其他状态；必须有一个不变的reason

### 2.2 then方法
一个promise必须提供一个then方法，用于获取当前或最终的value或reason。then方法接收两个参数：
```js
promise.then(onFulfilled, onRejected)
```

1. onFulfilled和onRejected都是可选参数：如果onFulfilled（onRejected）不是一个function，onFulfilled（onRejected）就会被忽略。
2. 如果inFulfilled是一个function：必须且只能在promise状态变为fulfilled后调用，并且value作为第一个参数；只能被调用一次。
3. 如果onRejected是一个function：必须且只能在promise状态变为rejected后调用，并且reason作为第一个参数；只能被调用一次。
4. onFulfilled或onRejected只有在执行环境堆栈仅包含平台代码时才可被调用。
5. onFulfilled和onRejected只能作为function被调用（没有this）。
6. 同一个promise可能会多次调用then方法：promise状态变为fulfilled时，所有的onFulfilled回调会以其注册时的顺序依次执行；promise状态变为rejected时，所有的onRejected回调会以其注册时的顺序依次执行。
7. then方法必须返回一个promise。
```js
promise2 = promise1.then(onFulfilled, onRejected)
```

### 2.3 Promise解决过程
Promise解决过程是一个抽象操作，需要输入一个promise和一个value，我们用[[Resolve]](promise, x)来表示。如果x是thenable类型且看上去想一个promise，则解决程序会使用promise接受x的状态，否则使用x的值来执行promise。

只要then方法符合Promise/A+规范，那么thenable的处理就更加具备通用性；同时也能让Promise/A+规范的实现可以与那些不太规范但是可用的实现能良好共存。