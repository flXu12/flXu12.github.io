---
title: 【day day up系列】2021年5月学习笔记
date: 2021-05-07
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 保持进步是一种态度，不因小而不为，不因难而不攻。

## 1. tree shaking
> tree shaking是一个通常用于描述移除JavaScript上下文中的未引用代码（dead-code）行为的术语。它依赖于ES2015中的import和export语句，用来检测代码模块是否被导入、导出，且被JavaScript文件使用。

在JavaScript应用程序中，我们使用模块打包（webpack或rollup）将多个JavaScript文件打包成单个文件时会自动删除未被引用的代码，这样可以使最终文件具有简洁的结构和最小体积。

**<font color="#0000dd">tree shaking</font>** 本质是消除无用的js代码。一个形象描述：你可以将应用程序想象成一棵树，其中绿色表示实际使用的source code（源码）和library（库），是有生机的叶子。灰色表示未被引用的代码，是枯萎的叶子。因此，为了干掉枯叶，需要摇动这棵树使它们掉下。  

未引用代码（dead-code）是指该代码永远不会被执行的代码，如下图中框起来的部分代码：
![](../images/daily-008.png)  

要理解并使用tree shaking，你需要：
- 使用ES2015模块语法（即import和export）
- 在项目package.json文件中，添加一个"sideEffects"入口
- 引入一个能够删除dead-code的压缩工具（minifier）（如： UglifyJSPlugin）

**webpack与rollup打包小实践**
代码仓库地址：[webpack与rollup打包小实践](https://github.com/flXu12/tree-shaking)  

1. 首先来看看源码的三个文件。其中main.js是打包的入口文件，分别引入了两个外部js资源learn.js和color.js。
![](../images/daily-009.png)  
2. 观察发现上述的main.js中会存在一些无用的代码，包括无用的外部依赖。
![](../images/daily-010.png)
3. 我们希望上图中标注的无用代码可以在打包的时候摒弃掉，只保留有用的代码。分别使用webpack和rollup打包后的结果：   
> 注：由于webpack生产环境打包后代码被压缩成一行，这里为了可读性将构建后的代码进行了格式化（换行处理） 

![](../images/daily-011.png)
4. 首先来分析下rollup：通过构建产物可以看到，rollup基本维持了源码的原本形式，只是将引入的外部代码块以源码的形式嵌入了打包后的文件中。并且我们期望的摒弃第2步的无用代码的想法也达成了。
5. 再来分析webpack：源码被webpack编译过后只能从结构上看到我们的期望也是达成了的，其中函数声明与调用采用闭包的方式呈现，虽然看不到return语句，但实际执行与rollup构建结果一致。
6. 对比rollup和webpack打包的结果，可以发现从可读性来说，rollup构建后的产物可读性更高。

> webpack对代码分割和资源导入具备“天然的支持”。在项目开发时使用webpack构建，在库开发时使用rollup构建。  

## 2. tree shaking之sideEffects
> 基于上节tree shaking的一个补充扩展，因在实践中也踩过这样的坑，在这里记录下~   

还原踩坑背景：  
当前开发的项目A（下文称A）使用webpack打包，在入口的mian.js文件中通过import引入了一个npm包（下文称npm-B）的样式文件（import 'npm-B/npm-B.css'），在开发环境下页面展示正常，打包部署到生产环境后，经排查发现npm-B中的组件样式丢失了，而这些样式都在npm-B.css文件中。  
```js
// A main.js
import "npm-B/npm-B.css";
```  
排查：定位样式异常的DOM元素，找到该元素对应的类名，在构建后的css产物中搜索发现没找到该类名对应的样式，在npm-B.css文件中找到了。由此可以判定，生产环境下的npm-B.css样式文件未被构建。  
定位：基于关键字“import css webpack 样式丢失”搜索相关问题，发现基本都是tree shaking相关的一些问题，进而排查到sideEffects对外部引入文件打包的影响。发现npm-B的package.json中sieEffects属性置为false，从而导致样式文件npm-B.css丢失。    
```json
// npm-B package.json
{
  "sideEffects": false
}
``` 
相关链接：[webpack tree shaking 踩坑](https://blog.csdn.net/qq_34356563/article/details/85000295)

tree shaking依赖于ES2015模块系统中的静态结构特性，如import和export。webpack4扩展了dead-code的检测能力，通过package.json的"sideEffects"属性作为标记，指定该模块在使用import引入时的tree shaking特性。 

**将文件标注为无副作用**：将package.json中的"sideEffects"属性设置为false，表明包中的所有代码不包含副作用，告知webpack在打包的时候可以安全地删除未使用的export。

> **什么是副作用**:在导入时会执行特殊行为的代码，而不仅仅暴露一个或多个export。如polyfill，它会影响全局作用域，但不提供export。

> 任何import引入的文件都会受到tree shaking的影响，也就是说，如果你在项目中使用了诸如css-loader并导入了外部的css文件，就需要将其添加到sideEffects列表中，避免在webpack构建时样式文件丢失，导致生产环境下样式失效。  

基于上述说明，npm-B.css样式丢失的问题可以通过以下几种方式之一来解决：  
1. 修改npm-B的package.json文件中sideEffects属性值为: 
```json
// npm-B的package.json
{
  "sideEffects": ["**/*.css"]
}
```  
2. 修改A引入npm-B.css的方式为非import引入：
```js
require('npm-B/npm-B.css');
```  
或
```css
/* A的style.css */
/* 从node_modules中引入的外部样式文件，需要加上前缀~ */
@import '~npm-B/npm-B.css';
```
```js
// A的main.js
import './style.css';
```

## 3. DSL模板
DSL(Domain Specific Language, 为特定领域设计的专用语言)

## 4. cookie, sessionStorage, localStorage
**<font color="#0000dd">为什么不用sessionStorage来存储用户信息？</font>**：[sessionStorage的数据能否在多标签页共享，取决于标签页如何打开](https://github.com/lmk123/blog/issues/66)

## 5. Scheme
Scheme是一种函数式编程语言，是Lisp的两种主要方言之一（另一种为Common Lisp）。  
Scheme的哲学是：设计计算机语言不应该进行功能的堆砌，而应该尽可能减少弱点和限制，使剩下的功能显得必要。