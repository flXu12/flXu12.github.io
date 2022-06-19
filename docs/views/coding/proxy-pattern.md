---
title: 【阿白在coding】设计模式之代理模式
date: 2022-06-20
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 千里之行，始于足下。  

## 1. 代理模式
**定义**：为一个对象提供一个代用品或占位符，以便控制对它的访问。    
**虚拟代理**：将一些开销很大的对象，延迟到真正需要它的时候才去创建。    
**缓存代理**：为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传进来的参数跟之前一致，则可以直接返回前面存储的运算结果。  

## 2. 代理模式的实现
### 2.1 虚拟代理实现图片预加载
在Web开发中，如果直接给某个 img 标签节点设置 src 属性，由于图片过大或者网络不佳，图片的位置往往有段时间会是一片空白。常见的做法是先用一张loading 图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到 img 节点里。  

**实现一**：无代理  
```js
const myImage = (function() {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  }
})();

// 应用
myImage.setSrc('http://xxx.xxx.xx/test.png');
```  
**缺点**：当网速较慢时，在图片加载好之前，会有一段空白时间。

**实现二**：代理模式  
```js
const myImage = (function() {
  const imgNode = document.createElement('mg');
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  }
})();

const proxyImage = (function() {
  const img = new Image();
  img.onload = function() {
    myImage.setSrc(img.src);
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('file://xxx.xxx.xx/loading.gif'); // 在真正的图片加载完成之前，先加载本地的一个loading图片
      img.src = src;
    }
  }
}
)();

// 应用
proxyImage.setSrc('http://xxx.xxx.xx/test.png');
```

**实现三**：不使用代理的图片预加载  
```js
const MyImage = (function() {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  const img = new Image();
  img.onload = function() {
    imgNode.src = img.src;
  }

  return {
    setSrc: function(src) {
      imgNode.src = 'file://xxx.xxx.xx/loading.gif';
      img.src = src;
    }
  }
})()

// 应用
MyImage.setSrc('http://xxx.xxx.xx/test.png');
```  
**缺点**：违背了单一职责原则。  
单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。

### 2.2 虚拟代理合并HTTP请求
**场景描述**：假设我们在做一个文件同步的功能，当我们选中一个checkbox的时候，它对应的文件就会被同步到另一台备用服务器上。  

**实现一**：无代理  
```html
<body>
  <div>
    <input type="checkbox" id="1"/>1
    <input type="checkbox" id="2"/>2
    <input type="checkbox" id="3"/>3
    <input type="checkbox" id="4"/>4
    <input type="checkbox" id="5"/>5
    <input type="checkbox" id="6"/>6
    <input type="checkbox" id="7"/>7
    <input type="checkbox" id="8"/>8
    <input type="checkbox" id="9"/>9
  </div>
  <script>
    const synchronousFile = function(id) {
      console.log(`开始同步文件，id为${id}`);
    }

    const checkbox = document.getElementByTagName('input');
    for(let i = 0, c; c = checkbox[i++];) {
      c.onclick = function() {
        if(this.checked === true) {
          synchronousFile(this.id);
        } 
      }
    }
  </script>
</body>
```  
**缺点**：当我们快速选中3个checkbox时，会依次向服务器发送3次同步文件的请求。  

**实现二**：虚拟代理。收集一段时间内的请求，一次性发送给服务器。  
```js
const synchronousFile = function(id) {
  console.log(`开始同步文件，id为${id}`);
}

const proxySynchronousFile = (function() {
  let cache = []; // 保存一段时间内需要同步的id
  let timer = null; // 定时器id

  return function(id) {
    cache.push(id);
    if(timer) {
      return;
    }

    timer = setTimeout(function() {
      synchronousFile(cache.join(',')); // 2秒后发送同步文件的请求
      clearTimeout(timer);
      timer = null;
      cache.length = 0; // 清空cache数组
    }, 2000)
  }
})()

// 应用
const checkbox = document.getElementByTagName('input');
  for(let i = 0, c; c = checkbox[i++];) {
    c.onclick = function() {
      if(this.checked === true) {
        proxySynchronousFile(this.id);
      } 
    }
  }
```

### 2.3 缓存代理计算乘积
**实现一**：无代理  
```js
const mult = function() {
  console.log('开始计算。。。')
  let a = 1;
  for(let i = 0; i < arguments.length; i++) {
    a = a * arguments[i];
  }
  return a;
}

// 应用
mult(2, 3); // 输出：6
mult(2, 3, 4); // 输出：24
```

**实现二**：加入缓存代理  
```js
const proxyMult = (function() {
  let cache = [];
  return function() {
    const args = Array.prototype.join.call(arguments, ',');
    if(args in cache) {
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments);
  }
})();

// 应用
proxyMult(1, 2, 3, 4); // 输出： 24
proxyMult(1, 2, 3, 4); // 输出： 24，但并未执行mult
```

### 2.4 用高阶函数动态创建代理
即：以上述计算乘积为例，假设还需要求和，那么可以将函数作为参数传入代理，为各种计算方法创建缓存代理。   

```js
// 计算乘积
const mult = function(){
  var a = 1;
  console.log('开始计算乘积。。。')
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a * arguments[i];
  }
  return a;
}; 

// 计加和
const plus = function(){
  var a = 0;
  console.log('开始计算求和。。。');
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a + arguments[i];
  }
  return a;
}; 

// 创建缓存代理
const createProxyFactory = function(fn) {
  let cache = [];
  return function() {
    const args = Array.prototype.join.call(arguments, ',');
    if(args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
}

const proxyMult = createProxyFactory(mult); 
const proxyPlus = createProxyFactory(plus);

// 应用
proxyMult( 1, 2, 3, 4 ); //输出：24
proxyMult( 1, 2, 3, 4 ); //输出：24，走缓存
proxyPlus( 1, 2, 3, 4 ); //输出：10
proxyPlus( 1, 2, 3, 4 ); //输出：10，走缓存
```