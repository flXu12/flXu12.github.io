---
title: 【day day up系列】2021年4月学习日记
date: 2021-04-11
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 热爱生活，往心之所向那里去。

## 1. console.dir()
在控制台显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。
![](../images/daily-006.png)

![](../images/daily-007.png)

## 2. ES6中的TDZ（暂时性死区）
- TDZ(Temporal Dead Zone, 暂时性死区)是ES6（ES2015）中对作用域新的专用语义。

- ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，就会形成封闭作用域。<font color="#ff0000">凡是在声明之前就使用这些变量，就会报错。</font>

```js
// 在代码块内，使用let/const命令声明变量之前，该变量都是不可用的。

// console语句无法获取a的值，因为if语句内是一个块级作用域，从该作用域顶部开始到使用let声明a之前，a都不可用。
let a = 1;
if(true) {
  console.log(a);  // Uncaught ReferenceError: Cannot access 'a' before initialization
  let a = 2;   
}

// 此时可以获取a的值，a在上级块作用域中
let a = 1;
if(true) {
  console.log(a);  // 1 
}

// 使用let声明的a作用域与在if块内使用var声明的a作用域一致。let/const不允许在相同作用域内重复声明同一个变量。
let a = 1;
if(true) {
  console.log(a);  // Uncaught SyntaxError: Identifier 'a' has already been declared
  var a = 1;
}

// 使用var声明的a在if作用域内也生效。let/const不允许在相同作用域内重复声明同一个变量。
var a = 1;
if(true) {
  console.log(a); // Uncaught SyntaxError: Identifier 'a' has already been declared
  let a = 1;
}
```
## 3. 队头阻塞问题
 1. **<font color="#0000dd">什么是队头阻塞（Head-of-Line blocking, HOL blocking）</font>**  
 队头阻塞是一个专有名词，这个问题产生的根本原因是使用了**队列**这种数据结构，在计算机网络得到范畴中是一种性能受限的现象。  
 队列这种数据结构遵循FIFO（first-in-first-out，先进先出）原则，就好比超市排队付款的时候，第一个人手机支付有问题或没带现金，会导致整个队伍阻塞很久。  
 因此，我们可以这样理解队头阻塞：在队头（Head）发生的问题会阻塞（block）整个队伍（line）。
 
 2. HTTP中的队头阻塞问题
 - 队头阻塞在计算机网络的范畴中表现为一种性能受限的现象。原因是某一列的第一个数据包（or队头）受阻导致整列数据包受阻。 

 **HTTP/1.1的队头阻塞**  
队头阻塞的原因：HTTP/1.1协议的一个基本限制就是一个HTTP链接必须完整的传输完资源块后，才能继续发送新的资源块（本质原因是：资源块之间不使用分隔符）。如果前面的数据量很大或传输缓慢，就会导致新的资源块迟迟无法返回，也就是队头阻塞的情况。    
一个缓解的办法：每个页面加载多个并行的TCP连接（通常为6个），每个响应数据分布在各自的连接上，那么除非响应数超过6个，否则不会出现队头阻塞。  
弊端：虽然开启多个并行TCP连接能够解决大部分队头阻塞的问题，但是每个TCP连接建立的代价是很昂贵的（服务器状态、内存；TLS加密计算；HTTPS连接时间）。

**HTTP/2的队头阻塞**
 基于HTTP/1.1的改进：单个TCP连接，正确复用资源块（HTTP/2可以在资源块前添加帧，用于标志资源块属于哪个资源，在哪里结束，从哪里开始等信息）。  

 队头阻塞的原因：HTTP/2只解决了HTTP级别的队头阻塞（也称为“应用层”队头阻塞），然而位于传输层的TCP队头阻塞问题依然存在。TCP只负责<font color="#0000dd">按顺序</font>传输数据包（将数据包从一个计算机传输到另一个计算机），无法分辨上层HTTP。比如当前TCP需要传输package1, package2, package3三个数据包，假设package2在网络中被丢失了，当package1倍正确传输到浏览器后，TCP发现package1与package3之间存在间隙，则会保持等待状态，知道package2重传副本后，再继续按照package2、package3的顺序将剩余的两个数据包传递给浏览器。也就是说：**被丢失的package2阻塞了package3的传输。即：TCP层的队头阻塞（由于丢失或延迟的数据包）也会导致HTTP队头阻塞。**  

 **HTTP/3（QUIC）的队头阻塞**
 基于HTTP/2的改进：HTTP/2的队头阻塞原因是传输层TCP无法分辨不同的流，那么HTTP/3则是实现一个新的传输层QUIC，让传输层能够分辨不同的流。  
 队头阻塞的原因：QUIC在单个资源流中依然保留排序。即：如果单个流中有一个字节间隙，那么流的后面部分依然会被阻塞，直到这个间隙被填满。  
 消除队头阻塞？ 事实上，对于HTTP/3(QUIC)来说，消除队头阻塞实际上对web性能并没有太大帮助。

 > 本段内容参考了这篇文章：[QUIC 和 HTTP/3 队头阻塞的细节](https://github.com/rmarx/holblocking-blogpost/blob/master/README_CN.md)

 ## 3. void 0 VS undefined
最近在学习工具库的代码，发现了一些对我来说不太常规的码，形如：
```js
// 初始化某个变量取值为undefined
let someVariable = void 0; 

// 判断val是否为undefined
function isUndefined(val) {
  return val === void 0;
}

// 在函数传参时，可以使用void 0避免JavaScript引擎将undefined解释成一个变量
```
**<font color="#0000dd">void运算符：对给定的表达式进行求值，然后返回undefined。</font>**, 也就是说，void后边不管跟上啥表达式，只要表达式合法，返回的都是undefined。  

既然void 0 本身就返回的是undefined，为嘛不直接用undefined，而是中间绕这么一圈？  
原因是undefined并不是保留词（不能用作变量名或函数名），而是JavaScript内置的一个属性（全局作用域的一个变量，且初始值是原始数据类型undefined），在旧版本的IE中能够被重写，如：
```js
var undefined = 'just for try';
console.log(undefined); 
// chrome及大部分浏览器返回：undefined
// IE 8 返回：just for try
```
自ECMAscript5标准以来，undefined是一个不能被配置和重写的属性（参考[Object.defineProperty中的属性描述符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)），即：
```js
{
  writable: false,  // 不能被赋值运算符改变
  enumerable: false,  // 不会出现在对象的枚举属性中
  configurable: false  // undefined属性描述符不能被改变，且不能从对象上删除undefined属性
}
```
因为undefined有被重写的风险，所以使用了不会被重写的void 0.  
为嘛用void 0，而不是void 'abc',void []呢？   
因为void 0写起来更简便，能节省字节大小。在许多JavaScript压缩工具中，还会用void 0去代替代码中的undefined。

【当函数返回值不会被使用的时候，应该使用void运算符，确保返回undefined。】