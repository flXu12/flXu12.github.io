---
title: 【day day up系列】2022年3月学习笔记
date: 2022-03-05
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 昨天追完了《人世间》，2022第一部喜欢的剧^^

## 1. 客户端渲染(CSR)、服务端渲染(SSR)
页面渲染流程：  
1. 浏览器通过请求得到一个HTML文本  
2. 渲染进程解析HTML文本，构建DOM树  
3. 解析HTML的同时，如果遇到内联样式或者样式脚本，就并行下载并构建CSSOM树；如果遇到JS脚本，就会下载并执行脚本  
4. DOM树和CSSOM树构建完成后，渲染进程将两者合并为渲染树  
5. 渲染进程对渲染树进行布局，生成布局树  
6. 渲染进程对布局树进行绘制，生成绘制记录  
7. 渲染进程对布局树进行分层，分别栅格化每一层，并得到合成帧  
8. 渲染进程将合成帧信息发送给GPU进程显示到页面中。  
页面的渲染其实就是浏览器将HTML文本转化为页面帧的过程。  
### 1.1 客户端渲染
客户端渲染（client side render）,即在执行JS脚本的时候，HTML页面就已经开始解析并且构建DOM树，此时JS的作用是动态的改变DOM树的结构，从而影响最终生成的页面帧（即我们看到的页面）。
### 1.2 服务端渲染
服务端渲染（server side render），即浏览器在请求页面url时，服务端会将处理以后的HTML文本组装好并返回给浏览器，此时的HTML文本不需要再执行JS脚本。

> 本节内容参考[SSR原理](https://github.com/yacan8/blog/issues/30)

## 2. 前后端分离[WIP]

## 3. 发布-订阅模式
### 3.1 概念
在软件架构中，发布-订阅是一种消息范式，消息的发送者（<font color="#008dff">发布者</font>）不会将消息**直接**发送给特定的接收者（<font color="#008dff">订阅者</font>），而是发送给调度中心，由调度中心统一调度；同样的，订阅者也并不关心发布者的存在，只需要通过调度中心注册并获取到发布者发布的消息。   
在发布-订阅模式中，发布者和订阅者是完全解耦的。  
![](../images/daily-032.png)  

**例子**：比如我们经常看的微信公众号，当很喜欢某个公众号发布的内容时，就会点击关注，然后公众号每次有内容发布时，都会收到微信消息提示，告知有新的内容更新了。  
在这个例子里边，用户作为订阅者，可以订阅多个不同的公众号；而公众号作为发布者，将事件发布到调度中心，然后由调度中心发送消息告知用户。

#### 3.2 简易版发布-订阅实现
发布-订阅需要以下要素：  
- 创建一个类
- on方法：订阅  
- emit方法：发布  
- off方法：取消订阅  
- once方法： 仅订阅一次  

```js
class EventEmitter {
  constructor() {
    this._events = {}; // 调度中心
  }

  // 订阅
  on(eventName, callback) {
    // 同一个事件可以注册多个回调，因此用数组存储
    const callbacks = this._events[eventName] || []; 
    callbacks.push(callback);
    this._events[eventName] = callbacks;
  }

  // 发布
  emit(eventName, ...args) {
    const callbacks = this._events[eventName] || [];
    callbacks.forEach(cb => cb(...args));
  }

  // 取消订阅
  off(eventName, callback) {
    const callbacks = this._events[eventName] || [];
    const newCallbacks = callbacks.filter(cb => cb !== callback && cb.initialCallback != callback);
    this._events[eventName] = newCallbacks;
  }

  // 仅订阅一次
  once(eventName, callback) {
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one)
    }
    one.initialCallback = callback;
    this.on(eventName, one);
  }
}
```  

使用：  
```js
const eventEmitter = new EventEmitter();

const callback1 = function() { console.log('callback1'); }
const callback2 = function() { console.log('callback2'); } 
const onceCallback = function() { console.log('once callback'); }

eventEmitter.on('eventName1', callback1);
eventEmitter.on('eventName1', callback2);
eventEmitter.off('eventName1', callback2);

eventEmitter.once('eventName2', onceCallback);

eventEmitter.emit('eventName1');
eventEmitter.emit('eventName2');

// 结果
//  'callback1'
//  'once callback'
```