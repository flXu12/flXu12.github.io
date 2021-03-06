---
title: 【day day up系列】2021年2月学习笔记
date: 2021-02-22
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 聚水成河，汇河成海

# 2021年2月小记

## 1. 编译和运行的区别
**编译型语言**

代码是由CPU执行的，而CPU无法直接执行类似if...else这样的高级语言，只能执行二进制指令，因此需要将高级语言转化为CPU能识别的汇编语言/机器指令才能执行。
- 编译：包含编译和链接两个过程。前者把源文件转换成机器可以识别的二进制语言，后者将生成的二进制文件组装成一个可执行文件。
- 运行：将编译生成的可执行文件在系统中运行的过程。

**解释型语言**

**JavaScript是轻量级解释型语言。** 在执行之前不需要将代码转化为其他形式，而是直接以文本格式（text form）被接收和处理。其编译过程发生在代码运行中，而非之前。

MDN——什么是JavaScript：
![](../images/daily-002.png)

## 2.  我不知道的yarn upgrade
在指定包名称进行升级时，执行yarn upgrade [package]命令会升级该依赖到package.json中约束的最新版本，产生一个文件修改，即yarn.lock，这是我之前对yarn upgrade的理解。但昨天遇到一个问题，对这个命令有了更深的理解，但苦于无法在网上找到相关资料（OS：是我的问题太low么？）  

以下举例说明吧，更直观些：  

假如目前有个项目A，其package.json中有如下依赖：

```JSON
{
  ...
  "dependencies": {
    "package-a": "^1.0.1"
  }
  ...
}
```

在A项目下有一个yarn.lock文件，其中生成的关于package-a的依赖信息如下：

```text
...
"package-a@^1.0.1":
  version "1.0.3"
  ...(一些不重要的属性)
  dependencies:
    "package-b" "^1.1.1"
...
"package-b@^1.1.1":
  version "1.1.2"
...
```

在生成的node_modules文件中就会有如下依赖关系：

├── node_modules 

│　　├── package-a (1.0.3)
 
│　　　　　├── package-b (1.1.2)

那么问题来了：package-b因为修复了一个小小的bug,升级了个版本号1.1.3，package-a未更新，版本号依旧是1.0.3，而项目A需要包含这次bugfix，然后同事B让我直接在项目A下执行yarn upgrade package-a:

```text
我：为啥不先更新下package-a中的package-b的依赖，然后发个包，然后在项目A下执行yarn upgrade package-a呢？
B：yarn upgrade会进行递归更新呀！
我：虽然package-a中没有锁定package-b的版本号，但是package-a的yarn.lock对版本号依旧是有约束的，不应该先更新package-a的yarn.lock吗？
B：yarn upgrade会递归更新呀！！
我：那这样yarn.lock的约束性不就没得了吗？
B：你执行yarn upgrade package-a就完事了！
```

然后我就抱着疑惑的态度执行了yarn upgrade package-a。。。

**我以为的yarn upgrade package-a:**
哼，肯定没有产生变化的yarn.lock文件。

**实际的yarn upgrade package-a:**
哇哦，真香，yarn.lock文件竟然有变化！

在项目A的yarn.lock文件中，package-a没有更新，但是package-b更新了：
```text
...
"package-b@^1.1.1":
  version "1.1.3"
...
```

在查找了yarn官方文档以及各种Google无果后，我暂且得出如下结论：

**执行yarn upgrade [package]指令，除了package本身的更新外，还会递归更新package内的所有依赖，更新的依据是package.json，而不是yarn.lock**

## 3. vue之v-if与v-for
**v-if**：条件渲染。

**v-for**：基于一个数组渲染一个列表。

vue官方教程：【**<font color="#0000dd">必要的</font>**】不推荐在同一元素上使用v-if和v-for。

- **优先级**: 
  - 在vue2中，当v-if与v-for作用于同一元素时，v-for优先级高于v-if；
  - 在vue3中，当v-if与v-for作用于同一元素时，v-if优先级高于v-for.
- **性能问题**：
  - 当v-for优先级高于v-if时（vue2），即使列表中最终只需要渲染一部分元素，但由于v-for会遍历所有数组元素，导致每次重新渲染时都会遍历整个列表，不论v-if时truthy还是falsy.
- **功能阻塞**：
  - 当v-if优先级高于v-for时（vue3），假设v-if的判断需要拿到v-for数组遍历中的变量，则会抛出错误提示该变量未定义。考虑场景：

  ```html
  <!-- error: property "item" is not defined on instance -->
  <li v-for="(item, index) in datas" :key="index" v-if="item.show">{{item.text}}</li>
  ```
OS: vue官网每句话都值得推敲。

## 4. 你了解语法糖吗
**什么是语法糖？**

> 语法糖（Syntactic sugar），指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。

**糖在不改变其所在位置的语法结构的前提下，实现了运行时等价**。就好比一粒用糖衣包裹的中药，能让人免于苦口，但又能达到中药的疗效。

**JS语法糖**

1. 对象字面量（Object literals）

字面量是由语法表达式定义的常量。对象字面值是封闭在花括号对{}中的一个对象的0个或多个“属性名-值”对的列表。
```js
const student = {
  name: 'abai Xu',
  age: 16
}
```
ES6为对象字面量带来了一些改进，写法更简洁：
```js
const name = 'abai Xu',
function getName() { 
  return name; 
}

const student = {
  name, // 等效于name: name
  age: 16,
  getName // 等效于getName: getName
}
```
2. 箭头函数（ES6）

普通函数：
```js
// 声明普通函数
function func1(name) {
  // xxx
}

// 匿名函数赋值给变量
const func2 = function(name) {
  // xxx
}
 
// 箭头函数提供了更简洁的匿名函数写法：
const func2 = (name) => {
  // xxx
}
```
当然，箭头函数不只是单纯提供了不同的写法，其本质与普通函数还是有很大区别的，包括：
- 箭头函数不能被作为构造函数，即不能对其使用new关键字
- 箭头函数没有prototype属性
- 普通函数的作用域是其运行时的上下文环境，二箭头函数的作用于是其定义时的上下文环境，所以this的指向不同。

3. 解构赋值（ES6）

ES6允许按照一定模式，从**数组**和**对象**中提取值，对变量进行赋值。
```js
// 一般变量赋值
let a = 1;
let b = 2;
let c = 3;

// 数组的解构赋值
let [a, b, c] = [1, 2, 3];

// 数组的解构赋值允许指定默认值,当数组成员严格等于undefined时，默认值才会生效。
let [a = 1] = [];
console.log(a); // 1

// 对象的解构赋值
let {foo, bar} = { foo: 'aaa', bar: 'bbb'}
console.log(foo, bar); // 'aaa' 'bbb'

// 对象的解构赋值也允许指定默认值，当对象的属性值严格等于undefined时，默认值才会生效。
let {x, y = 5} = {x: 1}
console.log(x, y); // 1 undefined

// 字符串的解构赋值
const [a, b, c, d, e] = 'hello';
console.log(a, b, c, d, e); // 'h' 'e' 'l' 'l' 'o'

// 函数参数解构赋值
function func1([x, y]) {
  return x + y;
}
func1([1, 2]);

// 函数默认参数
function func2({x = 0, y = 1} = {}) {
  return [x, y];
}
func2({x: 3, y: 3}); // [3,3]
func2({}); // [0, 1]
func2({x: 3}); // [3, 1]
func2(); // [0, 1]
```

4. rest参数与扩展运算符（spread）（ES6）

**rest参数：** 形式为...变量名。将数量不确定的参数放入数组中，用于获取函数的多余参数。
```js
// 参数求和——arguments写法
function sum() {
  let result = 0;
  for(let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
// 调用
sum(1,2,3); // 6

// 参数求和——rest参数写法
function sum(...arr) {
  let result = 0;
  for(let i of arr) {
    result += i;
  }
  return result;
}
// 调用
sum([1,2,3]); // 6
```
另一个例子：
```js
// arguments是一个累数组对象，因此无法直接使用数组方法。
function sort() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数写法
function sort(...arr) {
  return arr.sort();
}
```
**扩展运算符：** 好比rest参数的逆运算，将一个数组转为用都好分隔的参数序列。

5. 模板字符串（ES6）
```js
// 普通写法
const text1 = 'my name is ' + obj.a + ', I am a coder'; // 单行
const text2 = 'my name is ' + obj.a + ', \n I am a coder'; // 换行 

// 模板字符串
const text1 = `my name is ${obj.a}, I am a coder`;
const text2 =  `my name is ${obj.a},
I am a coder`;
```
6. ES6 Class

JavaScript中，生成实例对象的传统方法是通过构造函数。

class的本质是function，让对象原型的写法更加清晰，更像面向对象编程的语法。
```js
// 构造函数写法
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return '(' + this.x + ',' + this.y + ')';
}
// 使用new关键字生成实例
const p = new Point(1,2);

// class写法
class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}
// 使用new关键字生成实例
const p = new Point(1,2);
```

## 5. 开发依赖 vs 生产依赖
**开发环境：**
项目尚在编码阶段时的环境。代码中可能还有各种console.log、注释、格式化等。

**生产环境：**
项目已经完成编码，并发布上线可供用户浏览的阶段时的环境。代码可能经过了压缩、优化等处理。

**开发依赖/运行依赖（devDependencies）：**
只在开发阶段需要，一旦项目投入使用，便不再依赖这些库，不会被打入包内.
```bash
# 安装方式：
npm install <packageName> --save-dev

yarn add <packageName> -D
```

**生产依赖（dependencies）：**
不仅在开发环境中需要使用，在项目投入使用时，仍然需要的依赖。
```bash
# 安装方式：
npm install <packageName> --save

yarn add <packageName>
```


