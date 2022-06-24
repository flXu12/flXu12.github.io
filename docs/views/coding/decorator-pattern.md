---
title: 【阿白在coding】设计模式之装饰者模式
date: 2022-06-24
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 这是一篇没有文案的文章。  

## 1. 装饰者模式
**定义**：是一种给对象动态地增加职责的方式。能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。  

这种给对象动态添加职责的方式，并没有真正地改变对象自身，而是将对象放入另一个对象之中，这些对象以一条链的方式进行引用，形成一个聚合对象。

## 2. 实现装饰者模式
### 2.1 飞机大战
**场景描述**：编写一个飞机大战的游戏，随着经验值的增加，飞机对象可以升级成更厉害的飞机，一级飞机只能发射普通的子弹，升到第二级时可以发射导弹，升到第三级时可以发射原子弹。  

**实现一**： 模拟类的方式实现装饰者模式  
```js
const Plane = function() {}

Plane.prototype.fire = function() {
  console.log('发射普通子弹');
}

// 装饰类：导弹
const MissibleDecorator = function(plane) {
  this.plane = plane;
}

MissibleDecorator.prototype.fire = function() {
  this.plane.fire();
  console.log('发射导弹');
}

// 装饰类：原子弹
const AtomDecorator = function(plane) {
  this.plane = plane;
}

AtomDecorator.prototype.fire = function() {
  this.plane.fire();
  console.log('发射原子弹');
}

// 应用
let plane = new Plane();
plane = new MissibleDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();
/**
发射普通子弹
发射导弹
发射原子弹
 */ 
```

**实现二**：JavaScript的装饰器模式
```js
const plane = {
  fire: function() {
    console.log('发送普通子弹');
  }
}

const missibleDecorator = function() {
  console.log('发射导弹');
}

const atomDecorator = function() {
  console.log('发射原子弹');
}

const fire1 = plane.fire;

plane.fire = function() {
  fire1();
  missibleDecorator();
}

const fire2 = plane.fire;
plane.fire = function() {
  fire2();
  atomDecorator();
}

plane.fire();
/**
发送普通子弹
发射导弹
发射原子弹
 */ 
```

### 2.2 插件式的表单验证
**描述**：在一个web项目里，可能存在非常多的表单，如用户名，密码等信息。在点击按钮提交表单前，需要做一些校验，比如用户名和密码不能为空。  

**实现一**： 普通实现    
```html
<html>
  <body>
    用户名：<input id="username" type="text" />
    密码：<input id="password" type="password" />
    <input id="submitBtn" type="button" value="提交" />
  </body>
  <script>
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');

    const formSubmit = function() {
      if(username.value === '') {
        return alert('用户名不能为空');
      }
      if(password.value === '') {
        return alert('密码不能为空');
      }
      const param = {
        username: username.value,
        password: password.value;
      }
      ajax('http://xxx.com/login', param);
    }

    submitBtn.onclick = function() {
      formSubmit();
    }
  </script>
</html>
```  
**缺点**：formSubmit函数做了两件事，除了提交ajax请求外，还需要验证用户输入的合法性，复用性差，代码臃肿。  

**实现二**：分离ajax请求和表单校验逻辑  
```js
const validate = function() {
  if(username.value === '') {
    alert('用户名不能为空');
    return false;
  }
  if(password.value === '') {
    alert('密码不能为空');
    return false;
  }
}

const formSubmit = function() {
  if(validate() === false) {
    return;
  }
  const params = {
    username: username.value,
    password: password.value
  }
  ajax('http://xxx.com/login', params)
}

submitBtn.onclick = function() {
  formSubmit();
}
```  
**缺点**：虽然表单校验和ajax请求的逻辑是分开了，但实际在formSubmit内部还是要计算validate函数返回值，其实并没有完全分离开。


**实现三**：装饰器模式完全分离validate和formSubmit  
```js
Function.prototype.before = function(before) {
  const _self = this;
  return function() {
    if(before.apply(this, arguments) === false) {
      // before返回false的情况直接return，不再执行后面的原函数
      return;
    }
    return _self.apply(this, arguments);
  }
}

const validate = function() {
  if(username.value === '') {
    alert('用户名不能为空');
    return false;
  }
  if(passowrd.value === '') {
    alert('密码不能为空');
    return false;
  }
}

let formSubmit = function() {
  const params = {
    username: username.value,
    password: password.value
  }
  ajax('http://xxx.com/login', params);
}

formSubmit = formSubmit.before(validate); // 将表单校验动态地接在formSubmit函数之前，使validate成为一个即插即用的函数

submitBtn.onclick = function() {
  formSubmit();
}
```