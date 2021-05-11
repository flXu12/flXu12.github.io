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

**<font color="#0000dd">tree shaking</font>**本质是消除无用的js代码。一个形象描述：你可以将应用程序想象成一棵树，其中绿色表示实际使用的source code（源码）和library（库），是有生机的叶子。灰色表示未被引用的代码，是枯萎的叶子。因此，为了干掉枯叶，需要摇动这棵树使它们掉下。

TODO：webpack与rollup打包小实践

## 2. DSL模板