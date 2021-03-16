---
title: 【阿白在coding】手写apply、call、bind
date: 2021-03-01
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 撒下一粒种子，让它接受天地山河的馈赠，期待其成长为一棵大树。

## 1. 概念
- apply
> apply()：调用一个指定this值的函数，并提供一个数组（or类数组）形式的参数，返回该函数调用后的结果。
- call
> call()：调用一个指定this值的函数，并提供一个或多个参数，返回该函数调用后的结果。
- bind
> bind()：创建一个指定函数的拷贝，指定this值，并提供一个或多个参数，返回该新函数。

## 2. 使用
先看看以下代码执行结果：
```js
// 对象的this
var name = '阿白';
var age = 16;
var obj = {
  name: 'Super Marry',
  objAge: this.age,
  objFunc: function() {
    console.log(this.name + '年龄' + this.age);
  }
}
obj.objAge; // 16
obj.objFunc(); // Super Marry年龄undefined

// 函数的this
var name = '阿白';
var age = 16;
function hello() {
  console.log(this.name + '年龄' + this.age);
}
hello(); // 阿白年龄16
```
第一个例子中打印的this.age为undefined，因为此时的this指向的是obj这个对象，而对象本身没有age这个属性，因此this.age取值为undefined。

第二个例子中打印语句能获取到全局的name和age，因为函数的上下文是在运行时产生的，此时的this指向的是全局window对象，而声明的name和age变量均挂在全局window上，因此能取到值。

归根结底，是因为this的指向不同，导致在函数中取到的变量存在差异。从apply、call、bind三者的概念来看，他们的共同点都是可以指定this，也就是说可以执行上下文。啥意思呢，来看下面的示例：

```js
// 对象的this
var name = '阿白';
var age = 16;
var obj = {
  name: 'Super Marry',
  objAge: this.age,
  objFunc: function() {
    console.log(this.name + '年龄' + this.age);
  }
}
obj.objAge; // 16
obj.objFunc(); // Super Marry年龄undefined

// apply指定上下文与参数
var newObj = {
  name: '小明',
  age: '30'
}
obj.objFunc.call(newObj); // 小明年龄30
obj.objFunc.apply(newObj); // 小明年龄30
obj.objFunc.bind(newObj)(); // 小明年龄30
```
 
以上可以看出，通过apply、call、bind给obj.objFunc方法指定上下文，可以从该上下文中拿到this.name和this.age的值。 其中call与apply类似，在指定上下文后会立即调用该方法，而bind则是返回一个指定上下文方法的拷贝，需要手动调用。

下面，再来看看携参情况的差异：
```js
// 对象的this
var name = '阿白';
var age = 16;
var obj = {
  name: 'Super Marry',
  objAge: this.age,
  objFunc: function(param1, param2) {
    console.log(this.name + '年龄' + this.age + '，喜欢' + param1 + '，讨厌' + param2);
  }
}
obj.objAge; // 16
obj.objFunc(); // Super Marry年龄undefined，喜欢undefined，讨厌undefined

// apply指定上下文与参数
var newObj = {
  name: '小明',
  age: '30'
}
obj.objFunc.call(newObj, '萝卜', '白菜'); // 小明年龄30，喜欢萝卜，讨厌白菜
obj.objFunc.apply(newObj, ['萝卜', '白菜']); // 小明年龄30，喜欢萝卜，讨厌白菜
obj.objFunc.bind(newObj, '萝卜', '白菜')(); // 小明年龄30，喜欢萝卜，讨厌白菜
obj.objFunc.bind(newObj, ['萝卜', '白菜'])(); // 小明年龄30，喜欢萝卜,白菜，讨厌undefined
obj.objFunc.bind(newObj, ['萝卜', '白菜'], '茄子')(); // 小明年龄30，喜欢萝卜,白菜，讨厌茄子
obj.objFunc.bind(newObj, ['萝卜', '白菜'], ['茄子', '辣椒'])(); // 小明年龄30，喜欢萝卜,白菜，讨厌茄子,辣椒
```

## 3. 异同
- call VS apply
  - 同：
    - 改变函数执行的上下文，并立即调用该函数，返回函数调用结果。
    - 当第一个参数为null或undefined时，非严格模式下执行全局对象。
  - 异：
    - 参数写法的区别：
      - func.call(obj, param1, param2, ...)   
      - func.apply(obj, [param1, param2, ...])
  - 怎么用：当不确认参数时，用apply；确认参数个数时，用call

- （call or apply） VS bind
  - 同：改变函数执行的上下文。
  - 异：
    - 调用时机：call会立即调用，bind仅返回一个函数的拷贝，需要手动调用。

来验证下吧：
```js
// 对象的this
var name = '阿白';
var age = 16;
var obj = {
  name: 'Super Marry',
  objAge: this.age,
  objFunc: function() {
    console.log(this.name + '年龄' + this.age);
  }
}
obj.objAge; // 16
obj.objFunc(); // Super Marry年龄undefined

// apply指定上下文与参数
var newObj = {
  name: '小明',
  age: '30'
}
obj.objFunc.call(); // 阿白年龄16
obj.objFunc.apply(); // 阿白年龄16
obj.objFunc.call(null); // 阿白年龄16
obj.objFunc.apply(null); // 阿白年龄16
obj.objFunc.call(undefined); // 阿白年龄16
obj.objFunc.apply(undefined); // 阿白年龄16
obj.objFunc.bind()(); // 阿白年龄16
obj.objFunc.bind(null)(); // 阿白年龄16
obj.objFunc.bind(undefined)(); // 阿白年龄16
```
## 4. 来coding吧！
### call源码实现：
1. 指定上下文（当null时，上下文为window）
2. 添加函数
3. 执行函数
4. 删除函数
```js
Function.prototype.call = function(context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}
```

### apply源码实现
```js
Function.prototype.apply = function(context, argsArr) {
  context = context || window;
  context.fn = this;
  let result;
  if(argsArr) {
    result = context.fn(...argsArr);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}
```

### bind源码实现
```js
Function.prototype.bind = function(context, ...args1) {
  const _this = this;
  return function F(...args2) {
    if(this instanceof F) {
      return new _this(...args1, ...args2);
    }
    return _this.apply(context, args1.concat(args2))
  }
}
```