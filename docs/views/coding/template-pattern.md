---
title: 【阿白在coding】设计模式之模板方法模式
date: 2022-06-21
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 开始享受一个人的时光，学习，工作，美食，美景，都是我一个人的。

## 1. 模板方法模式
**定义**：是一种只需要使用继承就可以实现的模式。子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来实现。

## 2. 模板方法模式的实现
### 2.1 Coffee or Tea
**泡咖啡**：  
1. 把水煮沸  
2. 用沸水冲泡咖啡  
3. 把咖啡倒进杯子  
4. 加糖和牛奶    
```js
const Coffee = function() {};

Coffee.prototype.boilWater = function() {
  console.log('把水煮沸');
}

Coffee.prototype.brewCoffeeGriends = function() {
  console.log('用沸水冲泡咖啡');
}

Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子');
}

Coffee.prototype.addSugarAndMilk = function() {
  console.log('加糖和牛奶');
}

Coffee.prototype.init = function() {
  this.boilWater();
  this.brewCoffeeGriends();
  this.pourInCup();
  this.addSugarAndMilk()
}
```

**泡茶**：  
1. 把水煮沸  
2. 用沸水浸泡茶叶  
3. 把茶水倒进杯子  
4. 加柠檬   
```js
const Tea = function() {};

Tea.prototype.boilWater = function() {
  console.log('把水煮沸');
}

Tea.prototype.steepTeaBag = function() {
  console.log('用沸水浸泡茶叶');
}

Tea.prototype.pourInCup = function() {
  console.log('把茶水倒进杯子');
}

Tea.prototype.addLemon = function() {
  console.log('加柠檬');
}

Tea.prototype.init = function() {
  this.boilWater();
  this.steepTeaBag();
  this.pourInCup();
  this.addLemon();
}
```

**分离共同点与不同点**：  
```js
// 抽象父类
const Beverage = function() {};

Beverage.prototype.boilWater = function() {
  console.log('把水煮沸');
}

Beverage.prototype.brew = function() {}; // 空方法，由子类重写

Beverage.prototype.pourInCup = function() {}; // 空方法，由子类重写

Beverage.prototype.addCondiments = function() {}; // 空方法，由子类重写

Beverage.prototype.init = function() {
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
}

// Cofee子类
const Coffee = function() {};

Coffee.prototype = new Beverage();

Coffee.prototype.brew = function() {  // 重写父类方法
  console.log('用沸水冲泡咖啡');
}

Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子');
}

Coffee.prototype.addCondiments = function() {
  console.log('加糖和咖啡');
}

const coffee = new Coffee();
coffee.init();
// 输出：
// 把水煮沸
// 用沸水冲泡咖啡
// 把咖啡倒进杯子
// 加糖和咖啡

// Tea子类
const Tea = function() {};

Tea.prototype = new Beverage();

Tea.prototype.brew = function() {  // 重写父类方法
  console.log('用沸水浸泡茶叶');
}

Tea.prototype.pourInCup = function() {
  console.log('把茶倒进杯子');
}

Tea.prototype.addCondiments = function() {
  console.log('加柠檬');
}

const tea = new Tea();
tea.init();
// 输出：
// 把水煮沸
// 用沸水浸泡茶叶
// 把茶倒进杯子
// 加柠檬
```

### 2.2 非继承式实现Coffee or Tea  
JavaScript实际上并没有提供真正的类式继承，继承是通过对象与对象之间的委托来实现的。  

```js
const Beverage = function(param) {
  const boilWater = function() {
    console.log('把水煮沸');
  }

  const brew = param.brew || function () {
    throw new Error('必须传递brew方法');
  }

  const pourInCup = param.pourInCup || function () {
    throw new Error('必须传递pourInCup方法');
  }

  const addCondiments = param.addCondiments || function () {
    throw new Error('必须传递 addCondiments 方法'); 
  }

  const F = function() {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }
  return F;
}

const Coffee = Beverage({
  brew: function () { console.log('用沸水冲泡咖啡'); },
  pourInCup: function () { console.log('把咖啡倒进杯子'); },
  addCondiments: function() { console.log('加糖和牛奶'); }
});

const Tea = Beverage({
  brew: function () { console.log('用沸水浸泡茶叶'); },
  pourInCup: function () { console.log('把茶倒进杯子'); },
  addCondiments: function() { console.log('加柠檬'); }
});

const coffee = new Coffee();
coffee.init();

const tea = new Tea();
tea.init();
```