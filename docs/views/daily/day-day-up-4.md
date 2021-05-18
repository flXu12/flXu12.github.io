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

**webpack与rollup打包小实践**
代码仓库地址：![webpack与rollup打包小实践](https://github.com/flXu12/tree-shaking)  

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

有机会可以尝试深入实践webpack与rollup构建原理~

## 2. DSL模板
DSL(Domain Specific Language, 为特定领域设计的专用语言)

## 3. cookie, sessionStorage, localStorage
**<font color="#0000dd">为什么不用sessionStorage来存储用户信息？</font>**：[sessionStorage的数据能否在多标签页共享，取决于标签页如何打开](https://github.com/lmk123/blog/issues/66)

## 4. Scheme
Scheme是一种函数式编程语言，是Lisp的两种主要方言之一（另一种为Common Lisp）。  
Scheme的哲学是：设计计算机语言不应该进行功能的堆砌，而应该尽可能减少弱点和限制，使剩下的功能显得必要。