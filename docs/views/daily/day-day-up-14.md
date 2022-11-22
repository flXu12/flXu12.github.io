---
title: 【day day up系列】2022年11月学习笔记
date: 2022-11-22
categories:
 - 日常
tags:
 - css
 - daily
siderbar: auto
---


## 1. Number.prototype.toLocaleString()
功能：返回这个数字在**特定语言环境**下的表示字符串。    
背景：在开发过程中使用`Number.prototype.toLocaleString()`对数字转成字符串进行展示，通过浏览器访问站点进行访问预览。     
问题：当对数字`123456`进行字符串转换后，期望展示成`123456`, 发现页面展示`123,456`.    
原因：浏览器安装了代理插件解决google访问的问题，在搜索时发现搜索时间显示的是**佛历**，定位显示在曼谷。。。在使用`Number.prototype.toLocaleString()`对数字进行转换时，识别到当前的时区是曼谷，并基于此进行字符串的转换。

## 2. extend组件内部样式丢失

## 3. table布局列宽计算

## 4. 文字超长省略+hover显示tooltip

## 5. 如何实现最省资源的页面下钻