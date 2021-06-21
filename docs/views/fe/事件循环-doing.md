---
title: 事件循环
date: 2021-06-21
categories:
 - 前端
tags:
 - JavaScript
sidebar: auto
---  

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