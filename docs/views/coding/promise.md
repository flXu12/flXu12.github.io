---
title: 【阿白在coding】手写promise
date: 2021-03-22
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> programming和coding有着本质的区别， 咱要做一个有思想的programer，而不是每天重复搬砖的coder，追求程序员的不可替代性，是叱咤职场的必胜法宝之一。

## Promise源码实现

**<font color="#0000dd">1. Promise解决了什么问题？</font>**

Promise解决了回调地狱的问题。

**<font color="#0000dd">2. 什么是回调地狱（callback hell）？</font>**

js是单线程的同步操作，也就是说每次只能执行一个任务；对于I/O操作、网络请求、定时任务等异步操作，通常的处理方式是将其放入回调函数中执行。来看看回调函数的定义：

> A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.

简单来说就是一个函数依赖另一个函数调用，如下：
```js
function funcA(name, callback) {
  alert(name);
  callback();
}

funcA('阿白', function() {
  console.log('这里是一条打印语句。');
});
```

当回调函数被滥用时，就会产生<font color="#0000dd">回调地狱（又名“回调金字塔”）</font>。想象以下场景：函数A依赖函数B的执行结果，函数B依赖函数C的执行结果，以此类推，当这种链式依赖变得越来越长的时候，错误处理愈加难以维持，代码可读性降低，维护更加困难，具体表现在：

1. 多层嵌套；
2. 每次任务执行的结果存在两种可能（成功or失败），需要在每次任务执行后分别对这两种可能性做处理。

当我们在处理多个异步请求嵌套时，代码看起来是这样的：
```js
funcA(function(resA) {
  funcB(resA, function(resB)) {
    funcC(resB, function(resC)) {
      funcD(resC, function(resD)) {
        funcE(resD, function(resE)) {
          funcF(resE, function(resF)) {
            console.log(resF);
          }
        }
      }
    }
  }
})
```

**<font color="#0000dd">3. 怎么解决回调地狱？</font>**

1. 好的编码习惯：代码简洁，尽量避免使用匿名函数；
2. 模块化：拆分独立的功能函数，通过import导入；
3. 错误处理；
4. Promise/Generator/await async

其中Promise可以用于解决回调地狱的问题：
```js
// funcA是一个Promise：
const funcA = new Promise((resolve, reject) => {
  doSomething(() => {
    resolve('a');
  })
});

// 依次执行funcA, funcB, funcC, funcD, funcE, funcF
funcA()
  .then(funcB)
  .then(funcC)
  .then(funcD)
  .then(funcE)
  .then(funcF)
  .then((res) => {
    console.log(res)
  }).catch(err => {
    // 前面的链式调用中产生的错误，均会在这里被捕获到，可以在此处做错误处理
  })
```

**<font color="#0000dd">4. Promise常用的API有哪些？</font>**

```js
// 1. Promise.resolve(value)  返回一个以给定值解析后的Promise对象
const promise1 = Promise.resolve(123);
promise1.then(value => {
  console.log(value);  // 123
});

// 2. Promise.reject()  返回一个带有错误原因的Promise对象
function resolved(result) {
  console.log(result);
}
function rejected(error) {
  console.log(error)
}
Promise.reject(new Error('失败')).then(resolved, rejected); // Error: 失败

// 3. Promise.all() 接收一个promise的iterable类型（Array，Map，Set）输入，返回一个Promise实例，输入中所有promise的resolve回调结果组成的一个数组。只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(res => {
  console.log(res); // Array [3, 42, 'foo']
});

// 4. Promise.any()  接收参数同Promise.all()，接收一个Promise可迭代对象，只要其中的一个promise成功，就返回那个已经成功的promise。【存在兼容性问题】
const promise1 = new Promise((resolve, reject) => {
  reject('fail-1');
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'success-2');
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, 'success-3');
});

Promise.any([promise1, promise2, promise3]).then(res => {
  console.log(res); // sucess-2
})

// 5. Promise.race() // 接收参数同Promise.all()，返回一个promise，一旦迭代器中的某个promise解决或拒绝，就返回第一个promise的值。
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'success-1');
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'success-2');
});

Promise.race([promise1, promise2]).then(res => {
  console.log(res); // promise2更快完成，打印结果： success-2
});

// 6. Promise.allSettled()  接收参数同Promise.all()，返回一个在所有给定promise都已经fulfilled或rejected后的promise数组【存在兼容性问题】
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'foo');
});
Promise.allSettled([promise1, promise2]).then(res => {
  res.forEach(item => {
    console.log(item.status); // fulfilled // rejected
  });
});
```

**<font color="#0000dd">5. 手写代码实现Promise</font>**

**<font color="#0000dd">Promise的执行过程是怎么样的？</font>**

**<font color="#0000dd">Promise的缺点是啥？如何解决？</font>**

```js

```