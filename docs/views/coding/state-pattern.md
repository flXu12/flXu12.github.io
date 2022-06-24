---
title: 【阿白在coding】设计模式之状态模式
date: 2022-06-24
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 这篇依然没得文案。

## 1. 状态模式  
**定义**：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的。   
**理解**：将状态分装成独立的类，并将请求委托给当前的状态对象，当对象的内部状态改变时，会带来不同的行为变化。从客户的角度来看，我们使用的对象，在不同的状态下具有不同的行为，这个对象看起来是从不同的类中实例化而来的，实际上是使用了委托的效果。 

状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。  

## 2. 状态模式的实现
### 2.1 电灯程序
**描述**：有一个电灯，电灯上面只有一个开关。当电灯开着的时候，此时按下开关，电灯会切换到关闭状态；再按一次开关，电灯又将被打开。同一个开关按钮， 在不同的状态下，表现出来的行为是不一样的。  
**实现一**：  
```js
const light = function() {
  this.state = 'off';  // 给电灯设置初始状态off
  this.button = null; // 电灯开关按钮
}

Light.prototype.init = function() {
  const button = document.createElement('button');
  const self = this;

  button.innerHTML = '开关';
  this.button = document.body.appendChild(button);
  this.button.onclick = function() {
    self.buttonWasPressed();
  }
}

Light.prototype.buttonWasPressed = function() {
  if(this.state === 'off') {
    console.log('开灯');
    this.state = 'off';
  } else if(this.state === 'on') {
    console.log('关灯');
    this.state = 'on';
  }
}

const light = new Light();
light.init();
```

**升级**：有一种电灯，只有一个开关，但是第一次按下开关时打开弱光，第二次按下开关时打开强光，第三次按下开关时才是关闭电灯。  
```js
// 改造buttonWasPressed方法
Light.prototype.buttonWasPressed = function() {
  if(this.state === 'off') {
    console.log('打开弱光');
    this.state = 'weakLight';
  } else if(this.sate === 'weakLight') {
    console.log('打开强光');
    this.state = 'strongLight';
  } else if(this.state === 'strongLight') {
    console.log('关灯');
    this.state = 'off';
  }
}
```

**实现二**：状态模式改进电灯程序   
**关键**： 每个状态都是一个类。  
```js
const OffLightState = function(light) {
  this.light = light;
}
OffLightState.prototype.buttonWasPressed = function() {
  console.log('弱光');
  this.light.setState(this.light.weakLightState); // 切换状态为weakLightState
}

const WeakLightState = function(light) {
  this.light = light;
}
WeakLightState.prototype.buttonWasPressed = function() {
  console.log('强光');
  this.light.setState(this.light.strongLightState); // 切换状态到strongLightState
}

const StrongLightState = function(light) {
  this.light = light;
}
StrongLightState.prototype.buttonWasPressed = function() {
  console.log('关灯');
  this.light.setState(this.light.offLightState); // 切换状态到offLightState
}

const Light = function() {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
}
Light.prototype.init = function() {
  const button = document.getElementById('button');
  const self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';

  this.currState = this.offLightState; // 设置当前状态
  this.button.onclick = function() {
    self.currState.buttonWasPressed();
  }
}
Light.prototype.setState = function(newState) {
  this.currState = newState;
}

// 应用
const light = new Light();
light.init();
```

### 2.2 JavaScript版本的状态机  
状态模式是状态机的实现之一，在JavaScript这种“无类”语言中，没有规定让状态对象一定要从类中创建出来。下面的实现通过了Function.prototype.call方法将请求委托给某个字面量对象来执行。  
```js
const Light = function() {
  this.currState = FSM.off;
  this.button = null;
}

Light.prototype.init = function() {
  const button = document.createElement('button');
  const self = this;
  button.innerHTML = '已关灯';
  this.button.onclick = function() {
    self.currState.buttonWasPressed.call(self); // 把请求委托给FSM状态机
  }
}

const FSM = {
  off: {
    buttonWasPressed: function() {
      console.log('关灯');
      this.button.innerHTML = '下一次按我是开灯';
      this.currState = FSM.on;
    }
  },
  on: {
    buttonWasPressed: function() {
      console.log('开灯');
      this.button.innerHTML = '下一次按我是关灯';
      this.currState = FSM.off;
    }
  }
}

const light = new Light();
light.init();
```