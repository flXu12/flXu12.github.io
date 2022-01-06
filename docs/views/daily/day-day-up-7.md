---
title: 【day day up系列】2021年1月学习笔记
date: 2021-01-04
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 新年快乐。

## 1. parseInt(1/0, 19)输出了啥
> 来源于《你不知道的JavaScript（中）》——强制类型转换  
答案是18。  
来看看parseInt的定义：  
`parseInt(string, radix)`解析一个字符串并返回指定基数的十进制整数，radix是2-36之间的证书，表示被解析字符串的基数。    
分析步骤：  
1. parseInt接受的第一个参数是string类型，所以需要把`1/0`转换成字符串：`1/0 ==> Infinity ==> 'Infinity'`，所以实际执行的是`parseInt('Infinity', 19)`;   
2. parseInt接受的第二个参数是基数19，对应的有效数字范围是0-9和a-i;  
3. 'Infinity'第一个字符'I'以19为基数时值为18，第二个字符'n'不是一个有效的数字字符，因此解析到此为止。


