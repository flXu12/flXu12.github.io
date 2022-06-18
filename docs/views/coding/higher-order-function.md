---
title: 【阿白在coding】高阶函数
date: 2022-06-18
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 努力中，最近靠猫子照片给自己打气加油～  

## 1. 高阶函数（Higher-Order Function）  
高阶函数指至少满足下列条件之一的函数：  
- 函数作为参数传递  
- 函数作为返回值输出。  
 
你可能没意识到，我们日常开发时，其实用到了非常多的高阶函数哦：   
- Array.prototype.map  
- Array.prototype.filter  
- Array.prototype.reduce  
- ...

## 2. 高阶函数应用
### 2.1 函数柯里化（function currying）
描述：编写一个函数，计算每月开销。已知在每天结束之前，我们都会记录当天花了多少钱。  

普通方法实现：   
```js
let monthlyCost = 0;
const cost = function(money) {
  monthlyCost += money;
};

cost(100); // 第一天开销是100
cost(200); // 第二天开销是200
// ...

alert(monthlyCost);  // 输出：300
```  
缺陷：每天花的钱都需要记录一次，就需要执行一次cost，但实际我们只需要关心月底结算的一次即可。  

柯里化函数实现：   
```js
const cost = (function() {
  let args = [];
  return function() {
    if(arguments.length === 0) {
      let money = 0;
      for(let i = 0; i < args.length; i++) {
        money += args[i];
      }
      return money;
    } else {
      [].push.apply(args, arguments);
    }
  }
})()

cost(100); // 第一天开销100，未计算money
cost(200); // 第二天开销200，未计算money
// ...

alert(cost()); // 求值money：300
```

### 2.2 函数节流（throttle）  
JavaScript中的函数大多数情况下都是由用户主动调用触发的，但有些函数不是由用户直接控制的，可能会被频繁地调用（如：window.onresize事件、mousemove事件、上传进度等），进而造成性能问题。   

throttle函数的原理： 将被执行的函数延迟执行一段时间，如果改次延迟执行还未完成，则忽略接下来调用该函数的请求。  

实现：  
```js
/**
 * @param {function} fn 需要被延迟执行的函数
 * @param {number} interval 延迟执行的时间
 */ 
const throttle = function(fn, interval) {
  let _self = fn; // 保存需要被延迟执行的函数的引用
  let timer;  // 定时器
  let firstTime = true; // 是否第一次调用

  return funtion() {
    let args = arguments;
    let _me = this;

    if(firstTime) { // 如果第一次调用，则不需要延迟
      _self.apply(_me, args);
      return firtTime = false;
    }

    if(timer) { // 如果定时器还在，则说明上一次执行还未完成
      return false;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500)
  }
}

// 调用举例
window.onresize = throttle(function() {
  console.log(111)
}, 500);
```

### 2.3 分时函数
有些函数在执行时会严重影响页面性能（如：一次性创建成百上千个DOM节点，可能造成浏览器的卡顿甚至假死）。    
比如下面这个函数：  
```js
let arr = [];
for(let i = 1; i <= 1000; i++) {
  arr.push(i); // 假设arr装载了1000个节点的数据
}

const renderList = function(data) {
  for(let i = 0; i < data.length; i++) {
    const div = document.createElement('div');
    div.innerHTML = i;
    document.body.appenChild(div);
  }
}

renderList(arr);
```  

这个时候，我们通常会将创建DOM节点的任务分成多个批次来进行，原来可能是一秒成创建1000个节点，改成每隔200毫秒创建8个节点。分时函数就是这个原理。  

实现：  
```js
/**
 * @param {array} data 创建节点需要用到的数据
 * @param {function} fn 封装创建节点逻辑的函数
 * @param {number} count 每一批创建的节点数量
 */ 
const timeChunk = function (data, fn, count) {
  let obj, timer; // timer: 定时器id
  const start = function(){
    for(let i = 0; i < Math.min(count || 1, data.length); i++) {
      const obj = data.shift(); // Array.prototype.shift 删除数组第一个元素并返回之
      fn(obj);
    }
  }

  return function() {
    timer = setInterval(function() {
      if(data.length === 0) { // 如果全部节点都已经被创建完毕
        return clearInterval(timer);
      }
      start();
    }, 200); // 分批执行的时间间隔，也可以用参数的形式传入
  }
}
```

## 2.4 惰性加载函数  
通常用于嗅探不同浏览器之前的差异，根据浏览器的不同来做函数的不同实现。  

例如，我们需要一个能同时兼容不同浏览器的事件绑定函数addEvent。  
**常用写法**：    
```js
const addEvent = function(elem, type, handler) {
  if(window.addEventListener) {
    return elem.addEventListener(type, handler, false);
  }

  if(window.attachEvent) {
    return elem.attachEvent('on' + type, handler);
  }
}
```  
**缺陷**： addEvent每次被调用的时候都会执行其中的if条件，之后才能根据if判断结构正式确定最终绑定函数执行。   

**优化**：用立即执行函数包裹，将addEvent执行时机提前到代码加载时。  
```js
const addEvent = (function(elem, type, handler) {
  if(window.addEventListener) {
    return elem.addEventListener(type, handler, false);
  }

  if(window.attachEvent) {
    return elem.attachEvent('on' + type, handler);
  }
})()
```  
**缺陷**：有可能我们并不会用到addEvent函数，但是由于立即执行函数的原因，在代码加载时就执行了，此时就属于时多余的操作了。  

**惰性加载函数实现**：在第一次执行addEvent时，首先走if判断逻辑，然后在函数内部重写event，下次进addEvent函数时就不再包含if判断了。    
```js
const addEvent = function(elem, type, handler) {
  if(window.addEventListener) {
    addEvent = function(elem, type, handler) {
      elem.addEventListener(type, handler, false);
    }
  } else if(window.attachEvent) {
    addEvent = function(elem, type, handler) {
      elem.attachEvent('on' + type, handler);
  }

  addEvent(elem, type, handler);
}
```

