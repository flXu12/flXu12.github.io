---
title: 【day day up系列】2022年2月学习笔记
date: 2022-02-08
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 虎年快乐，开工大吉。

## 1. vuex mutations中不支持return
今天在优化项目代码的时候发现一个同步方法写到了vuex actions里，就顺手改到mutations中了，然后发现项目运行数据异常，排查发现是代码中有这样一条赋值操作：  
```js
// aaa.js
const value = this.$store.commit('my-commit', payload);
console.log(value);
```  
在`mutations-->my-commit`中，return了一个确定不可能是`undefined`的值:  
```js
// mutations.js
['my-commit'](state, payload) {
  // xxx
  return 123;
}
```  
然后我们在控制台看到`aaa.js`打印输出的是`undefined`，竟然不是123。在vuex的issues中找到了同样有疑问的小伙伴：[Return values from mutation commits](https://github.com/vuejs/vuex/issues/1437)    
> Reply: So I think we can close this issue. Sorry for making it open for so long, but as I described, this is technically really hard to do with Vuex 3. We should consider this and take in to the design of next Vuex iteration for sure.  

根据issue的回复情况，官方答复是说在mutations中实现return在vuex3（匹配vue2）是一个技术难点，并考虑在vuex4中支持return。  
However, 经过测试，我发现在vuex@4.0.2中也并没有支持commit中return，也许之后能支持也说不定。

## 2. 防抖 VS 节流  
**场景**： 针对事件被高频触发场景（如resize, scroll, 实时检查input输入动作等），若事件的回调函数为异步或过于复杂，就会出现响应跟不上触发的现象，导致页面卡顿。    
**核心**： 用于防止高频js代码的执行。  
**<font color="#8800ff">防抖（debounce）</font>**  
当事件被触发时，设定一个周期延迟执行动作，若期间又被再次触发，则重新设定周期，直到周期结束，再执行动作。**【<font color="#ff0000">周期内最后一次操作有效</font>】**  
![](../images/daily-025.png)

**<font color="#8800ff">节流（throttling）</font>**   
固定周期内，只执行第一次动作，若在周期内有新事件被触发，不再执行；周期结束后，又有新事件触发，则开始新的周期。**【<font color="#ff0000">周期内第一次操作有效</font>】**  
![](../images/daily-026.png)  

**代码实现**  
```js
function debounce(fn, delay) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
}

function throttle(fn, delay) {
  let activeTime = 0;
  return () => {
    const current = Date.now();
    if(current - activeTime > delay) {
      fn.apply(this, arguments);
    }
    activeTime = Date.now();
  }
}
```  

**测试**  
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>防抖 vs 节流</title>
  <style>
    #container {
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;
      color: #fff;
      background: #000;
      font-size: 30px;
    }
  </style>
</head>

<body>
  <div id="container"></div>
  <script>
    let count = 1;
    const container = document.getElementById('container');

    function getUserAction () {
      container.innerHTML = count++;
    }

    container.onmousemove = getUserAction; // 不使用防抖，节流
    container.onmousemove = debounce(getUserAction, 1000); // 防抖
    container.onmousemove = throttle(getUserAction, 1000); // 节流

  </script>
</body>
</html>
```
**无节流，防抖**  
![](../images/daily-027.gif)  

**防抖**  
![](../images/daily-028.gif)  

**节流**  
![](../images/daily-029.gif)

参考如下资料：  
- [什么是节流和防抖](https://muyiy.cn/question/js/3.html)  
- [JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22#)  
- [JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26#)
