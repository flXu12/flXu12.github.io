---
title: 【阿白在coding】实现一个SPA和一个MPA
date: 2023-02-23
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

## 1. 概念
### 1.1 什么是SPA？
SPA(single page application, 即：单页面应用)，是一种网络应用程序或网站的模型，通过动态重写当前页面来与用户交互，页面在任何时间点都不会重新加载。举个例子来说就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子。

### 1.2 什么是MPA？
MPA(multiple page application，即：多页面应用)，每个页面都是一个主页面，都是独立的。每一次页面跳转的时候都会重新加载。

### 1.3 SPA VS MPA
| | 单页面应用(SPA) | 多页面应用(MPA) |  
|---- | ---- | ---- |  
| 组成 | 一个外壳页面和多个页面片段 | 多个独立页面 |  
| 刷新方式 | 局部刷新 | 整页刷新 |  
| URL模式 | 哈希模式(如：http://a.b.html#page1) | 历史模式(如：http://a.b/page1.html) |  
| SEO搜索引擎优化 | 难实现 | 容易实现 |  
| 页面切换 | 速度快 | 速度慢 |  
| 数据传递 | 容易 | 通过url/cookie/localStorage等传递 |   

搜索引擎在做网页排名的时候，要根据网页的内容才能给网页权重，来进行网页的排名。搜索引擎是可以识别html内容的，而我们每个页面所有的内容都放在html中，所以这种多页应用SEO排名效果好。

## 2. 最简实现
### 2.1 SPA最简实现
```js
// Router: 通过监听url中的hash来进行路由跳转
class Router {
  constructor (){
    this.routes = {};  // // 存放路由path及callback
    this.cuttentUrl = '';

    // 监听路由change调用相对应的路由回调
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback;
  }

  push(path) {
    this.routes[path] && this.routes?.[path]();
  }
}
```  
使用：  
```js
window.miniRouter = new Router();
miniRouter.route('/', () => console.log('page1'));
miniRouter.route('/page2', () => console.log('page2'));

miniRouter.push('/');  // page1
miniRouter.push('/page2'); // page2
```

### 2.2 MPA最简实现  
借用 HTML5 history API:  
- `history.pushState` 浏览器历史纪录添加记录  
- `history.replaceState` 修改浏览器历史纪录中当前纪录   

通过`window.onpopstate`事件处理浏览器回退。
```js
// Router
class Router {
  constructor () {
    this.routes = {};
    
    // 监听popstate事件
    window.addEventListener('popstate', event => {
      const path = event.state?.path;
      this.routes[path] && this.routes[path]();
    })
  }

  init(path) {
    history.replaceState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  route(path, callback) {
    this.routes[path] = callback;
  }

  push(path) {
    history.pushState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }
}
```  
使用：  
```js
window.miniRouter = new Router();
miniRouter.route('/', () => console.log('page1'));
miniRouter.route('/page2', () => console.log('page2'));

miniRouter.push('/page2'); // page2
```