---
title: 事件循环
date: 2021-06-21
categories:
 - 前端
tags:
 - JavaScript
sidebar: auto
---  

> 自2021年6月15日起，travis-ci.org不再支持构建了。按照迁移指南，我将博客的构建任务从travis-ci.org迁移到travis-ci.com，无缝切换，甚至保留了我的历史构建记录。迁移后明显感觉构建速度飞快，原本要等待排队十几几十分钟，迁移到.com后几乎是push以后5分钟就部署好了，好感up～ 

## 1. 以下代码输出了什么？  
**关键字：<font color="#ff0000">setTimeout、Promise、async/await</font>**  
case 1:  
```js
console.log(1)
setTimeout(() => { console.log(2)}, 0)
new Promise((resolve) => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
})
console.log(5);
```  
答案：  
```bash
1, 3, 5, 4, 2
```  

case2:  
```js
console.log(1);
setTimeout(() => { console.log(2)}, 0);
new Promise(resolve => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
  new Promise(resolve => {
    setTimeout(() => { console.log(5)}, 0);
    resolve()
  })
})
console.log(6)
```  
答案：  
```bash
1, 3, 6, 4, 2, 5
```  
case3:  
```js
console.log(1);
setTimeout(() => { console.log(2)}, 0);
new Promise(resolve => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
  new Promise(resolve => {
    console.log(5)
    resolve()
  })
})
console.log(6)
```  
答案：  
```bash
1, 3, 6, 4, 5, 2
```  

case4:  
```js
console.log(1);
setTimeout(() => { console.log(2)}, 0);
new Promise(resolve => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
  new Promise(resolve => {
    console.log(5)
    resolve()
  }).then(() => {
    console.log(6)
  })
})
console.log(7)
```  
答案：  
```bash
1, 3, 7, 4, 5, 6, 2
```

case5:  
```js
console.log(1);
setTimeout(() => { console.log(2)}, 0);
new Promise(resolve => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
  new Promise(resolve => {
    setTimeout(() => { console.log(5) }, 0);
    resolve()
  }).then(() => {
    console.log(6)
  })
})
console.log(7)
```  
答案：
```bash
1, 3, 7, 4, 6, 2, 5
```

case6:  
```js
async function async1() {
  console.log(1);
  await async2();
  console.log(2);
}
async function async2() {
  console.log(3);
}

console.log(4);
setTimeout(() => { console.log(5)}, 0);
async1();
new Promise(resolve => {
  console.log(6);
  resolve();
}).then(() => {
  console.log(7);
});
console.log(8);
```  
答案：  
```bash
4, 1, 3, 6, 8, 2, 7, 5
```  

case7:  
```js
async function async1() {
  console.log(1);
  await async2();
  console.log(2);
}
async function async2() {
  console.log(3);
  await async3();
  console.log(4);
}
async function async3() {
  console.log(5);
}

console.log(6);
setTimeout(() => { console.log(7)}, 0);
async1();
new Promise(resolve => {
  console.log(8);
  resolve();
}).then(() => {
  console.log(9);
});
console.log(10);
```  
答案：  
```bash
6, 1, 3, 5, 8, 10, 4, 9, 2, 7
```  

case8:  
```js
async function async1() {
  console.log(1);
  await async2();
  console.log(2);
}
async function async2() {
  console.log(3);
  await async3();
  console.log(4);
}
async function async3() {
  console.log(5);
  await async4();
  console.log(6);
}
async function async4() {
  console.log(7);
}

console.log(8);
setTimeout(() => { console.log(9) }, 0);
async1();
new Promise(resolve => {
  console.log(10);
  resolve();
}).then(() => {
  console.log(11)
});
console.log(12);
```  
答案：  
```bash
8, 1, 3, 5, 7, 10, 12, 6, 11, 4, 2, 9
```

case9:  
```js
async function async1() {
  console.log(1);
  await async2();
  console.log(2);
}
async function async2() {
  console.log(3);
  await async3();
  console.log(4);
}
async function async3() {
  console.log(5);
}

console.log(6);
setTimeout(() => { console.log(7) }, 0);
async1();
new Promise(resolve => {
  console.log(8);
  resolve();
}).then(() => {
  console.log(9);
  new Promise(resolve => {
    setTimeout(() => { console.log(10)}, 0);
    resolve();
  }).then(() => {
    console.log(11);
  })
});
console.log(12);
```  
答案：  
```bash
6, 1, 3, 5, 8, 12, 4, 9, 2, 11, 7, 10
```

## 2. 事件循环
JavaScript是一门单线程语言，它的异步和多线程实现是通过Event Loop（事件循环）机制来实现的。
> 单线程：在程序执行时，按照顺序依次进行，必须等待前面的程序执行完成，后面的才会执行。通俗点讲，就是同一时间只能做一件事。 

**为什么JavaScript“需要”是一门单线程语言？**  
原因是从使用场景来看，js主要用于DOM操作，并进行一些用户交互行为。其中DOM渲染与js代码的执行使用必须是同一个线程（假如是多个线程，其中一个线程在某个DOM节点添加了内容，同时另一个线程删除了这个DOM节点，这个时候浏览器无法衡量线程的优先级）。  
JavaScript作为一门单线程语言，始终将单线程作为其核心特征，保持简单。  
> HTML5提出了web worker标准，允许js创建多个线程，以充分利用多核CPU的计算能力，但前提是子线程受控于主线程且不允许操作DOM。所以就本质来讲，js的单线程特征始终不变。

### 2.1 相关概念
想知道什么是事件循环，就需要先了解以下几个概念：  
- **调用栈（call stack）**：事件循环开始时，会从全局代码开始逐行执行，当遇到函数调用时，会将函数push到调用栈中，当函数执行完毕，会从调用栈中弹出。  
> 栈：先进后出  
- **消息队列（message queue）**：js中诸如setTimeout、setInterval中的回调函数会列入消息队列中，等待进入调用栈中执行。  
> 队列：先进先出。  
- **微任务队列（microtask queue）**：js中诸如Promise、async/await这样的异步操作会列入微任务队列，等待进入调用栈中执行，优先级闭消息队列高。