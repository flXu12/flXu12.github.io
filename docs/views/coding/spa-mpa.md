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

### 2.2 MPA最简实现