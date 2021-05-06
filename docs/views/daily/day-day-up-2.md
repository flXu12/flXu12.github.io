---
title: 【day day up系列】2021年3月学习笔记
date: 2021-03-01
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 生活就是这样，会慢慢磨平你的棱角，或使你成为一颗璞玉，前提是你耐得住打磨，忍得了寂寞。

## 1. Vue3 Composition API: ref vs reactive
Composition API，即组合式API，是vue3提出的一个新概念，能做到一个独立的逻辑关注点相关的代码在同一个地方进行集中管理。

**ref：** 通过ref函数使 **<font color="#0000dd">值类型</font>** 的变量变成响应式。
```vue
<template>
  <!-- 模板中使用ref变量(当ref变量在模板中使用时，会自动解套，无需在模板中额外书写.value) -->
  <div>{{counter}}</div>
</template>

<script>
  // 引入ref函数
  import { ref } from 'vue';

  export default {
    setup() {
      // 声明ref变量
      const counter = ref(0);
      console.log(counter); // { value: 0 }
      console.log(counter.value); // 0

      // 更新ref变量
      counter.value++;
      console.log(counter.value); // 1

      return {
        counter
      }
    }
  }
</script>
```

**reactive：** 通过reactive函数使 **<font color="#0000dd">对象类型</font>** 的变量变成响应式。等同于vue2.x中的Vue.observable()
```vue
<template>
  <div>{{ state.count }}</div>
</template>

<script>
  // 引入reactive函数
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        count: 0
      });

      // 更新reactive变量
      state.count++; // 1

      // 解构state后得到的属性值修改不会引起state的更新，解构后的属性会丢失其响应性。
      const { count } = state;
      count++; // 2
      console.log(state.count); // 1

      // 将reactive变量转换成一组ref,解构后的属性会保留与源对象之间的响应式
      const { count } = toRefs(state);
      // 通过ref变量更新的方式（.value）更新取值
      count.value++; // 2
      console.log(state.count); // 2

      return {
        // toRefs将响应式对象的每个property都变成了响应式的ref变量
        toRefs(state); 
      }
    }
  }
</script>
```

**比较：** 

- 共同点：都用于创建响应式数据。
- 区别：
  - ref用于创建值类型的响应式；reactive用于创建对象类型的响应式。
  - ref的更新方式通过修改xxx.value进行；reactive的更新需要通过toRefs方法转换从而使每个属性都具备响应式。

## 2. 页面导入样式比较：link vs @import
在html文档中，css有四种引入方式：

1. 内联样式（行内样式）：在html标签的style属性中添加样式
```html
<div style="color: red">这是一段红色的文字</div>
```
2. 嵌入样式：在style标签中添加样式
```html
<head>
  <style>
    .aaa {
      color: red;
    }
  </style>
</head>
<body>
  <div class="aaa">这是一段红色的文字</div>
</body>
```
3. 链接样式：在head标签中通过link添加样式
```css
 /* aaa.css文件 */
.aaa {
  color: red;
}
```
```html
<head>
  <link ref="stylesheet" type="text/css" href="./aaa.css">
</head>
<body>
  <div class="aaa">这是一段红色的文字</div>
</body>
```
4. 导入样式：在style标签中使用CSS规则引入外部样式文件，或者在.css 样式文件中引入外部样式文件
```html
<head>
  <style>
    @import url('./aaa.css');
  </style>
</head>
<body>
  <div class="aaa">这是一段红色的文字</div>
</body>
```
PS: css文件中也可以引入外部样式文件
```css
@import url('./bbb.css');

.aaa {
  color: red;
}
```
外部引入样式的方式有两种，即link标签和@import引入。

**link vs @import**：

- @import是css提供的，只能加载css；link除了加载css外，还可以定义RSS等其他事务。
- **兼容性**：@import是CSS2.1提出的，低版本浏览器（IE5以下）不支持；link是XHTML标签，无兼容问题。
- **加载顺序**：@import引入的样式需等页面加载完成后再加载（所以可能出现页面一开始没有css样式，在网速慢的情况下可能出现页面闪烁一下后样式正常的现象）；link引入的样式在页面载入的同时加载；
- **DOM操作**：link支持通过JS控制DOM来改变样式（通过DOM操作插入link标签，从而引入样式）；@import不支持（因为无法获取DOM）

## 3. Array(100).map(x=>1)结果是多少？
在真正执行这段语句之前我以为的是输出结果为100各元素为1的数组，然而事实是输出了长度为100的空数组。

![](../images/daily-003.jpeg)

来扫盲吧~

关键词：Array构造器、Array.prototype.map()。

**Array构造器**

Array构造器会根据指定的元素创建一个数组；当仅有一个元素且类型为数字时，会创建一个指定长度的数组。**<font color="#0000dd">言外之意就是该数组此时不包含任何实际元素，更不能认为它是一个包含了指定个数的undefined的元素。</font>**

**Array.prototype.map()**

map方法会给原数组中的每个元素按顺序调用一次callback函数，callback函数执行后返回的值组合形成一个新数组。**<font color="#0000dd">callback函数只会在有值的索引上被调用；没有被赋过值或者使用delete删除的索引不会被调用。</font>**

**结论**

由以上两点基本可以找到输出为一个长度为100的数组的原因了，使用Array(100)构造函数生成的数组并没有对其中的数组元素进行赋值；map方法不会被未赋值的数组元素调用。因此Array(100).map(item => 1)中的callback实际上一次都没有被调用过。来验证下吧：
```js
var a = undefined, b = null;  // 虽然值为falsy，但实际被赋过值的变量
var c = Array(3); // 创建长度为3的数组，数组元素未被赋值
c.push(a, b); // 现在数组的前三个元素未被赋值，后俩元素被赋值了
var d = c.map(item => 1);
console.log(d);

// 为了更好看到map被调用的情况，看看另一个map,在map中写下打印语句
var e = c.map((item, index) => {
  console.log(index);
  return 1;
});
console.log(e);
```
![](../images/daily-004.png)

## 4. 为什么0.1+0.2不等于0.3 ？
见过最多的回答是前端浮点数计算是非精确计算，既然如此，那为什么0.1+0.1=0.2，0.2+0.2=0.3，而0.1+0.2 !== 0.3呢？
![](../images/daily-005.png)

计算机无法直接对十进制的数字进行运算，需要先将数字转换成二进制，对二进制计算后转换成十进制输出。

首先了解下计算的步骤：

1. 将0.1转换成二进制（A）；将0.2转换成二进制（B）
2. 去掉超出标准位数的多余位，分别得到A'，B'
3. 将处理后的0.1对应二进制加上处理后的0.2对应二进制，即A' + B' = C'
4. 将求和后的二进制数转换为十进制，即C' => C

```js
// 1.0.1和0.2转换成二进制后对应的原始字符串(无限循环)
var a = 0.1.toString(2); // a = "0.0001100110011001100110011001100110011001100110011001101"
var b = 0.2.toString(2); // b = "0.001100110011001100110011001100110011001100110011001101"

// 2.转换成标准位的二进制
var aa = Number(a); // aa = 0.00011001100110011001
var bb = Number(b); // bb = 0.00110011001100110011

// 3. 二进制求和
var cc = 0.01001100110011001001 // 转换成十进制后为0.30000000000000004
```
**既然浮点数的计算存在精度丢失的问题，那么我们如何处理浮点数的计算呢？**
```js
// 法一：将小数转换成整数后计算
function(num1, num2) {
  const len1 = (num1.toString().split('.')[1] || '').length;
  const len2 = (num2.toString().split('.')[1] || '').length;
  const base = Math.pow(10, Math.max(len1, len2));
  return (num1 * base + num1 * base) / base;
}

// 法二：借助第三方库（适用于超精度计算、多场景下的浮点数运算）
```
**总结** ：
- 0.1+0.1并不是精确地等于0.2，而是因为其经过二进制计算后转换成十进制时在精度范围内最接近的数字是0.2
- 浮点数的计算精度丢失可能发生在以下步骤：进制转换（十进制to二进制、二进制to十进制）；对阶运算
- 浮点数的计算精度问题解决：将小数转换成整数后进行计算；借助第三方库（math.js、big.js）

## 5. 函数如何增加自定义参数而不覆盖原本的默认参数
日常开发中，我们有时会碰到组件库提供的事件中的默认参数无法满足我们的需求，需要额外传入自定义参数的情况。

以下以element ui库的table组件为例，来看看代码吧！

```vue
<template>
  <el-table
    @selection-change="selectionChange"
    @select-all="selectAll($event, 'abc')"
    @cell-click="(row, column) => { cellClick(row, column, 'abc') }"
  >
    <el-table-column>xxx</el-table-column>
  </el-table>
</template>
<script>
export default {
  methods: {
    // 当选择项发生变化时会触发改时间，默认参数为selection
    selectionChange(selection) {
      console.log(selection); // 输出为实际selection数据
    },

    // 当用户手动全选checkbox时触发的时间，默认参数为selection，但是这里多传了一个自定义参数params
    selectAll(event, params) {
      console.log(event, params); // 输出selection数据，'abc'
    },

    // 当某个单元格被点击时触发该事件，默认参数为row, column, cell, event; 这里前端使用闭包重新定义了该事件，裁掉了无用的默认参数，多传了一个自定义参数params
    cellClick(row, column, params) {
      console.log(row, column, params); // 输出row数据，column数据，'abc'
    }
  }
}
</script>
```

**总结**：

1. 无自定义参数时，在template中直接写方法名即可，参考@selection-change="selectionChange"
2. 有自定义参数且仅有一个默认参数时，需要给方法传参，$event表示默认参数，参考@select-all="selectAll($event, 'abc')"
3. 有自定义参数且有多个默认参数时，需要使用闭包的方式对默认方法进行改写，参考@cell-click="(row, column) => { cellClick(row, column, 'abc')}"

## 6. 【vue】如何定义一个事件？
Vue实例提供了一个自定义事件的系统，对于父子组件之间的通信场景，使父组件可以像处理原生DOM事件一样，通过v-on监听自组件实例中的任何事件。

```vue
// 父组件
<template>
  <div>
    <h1>我是父组件，点击子组件后，数字是：{{ number }}</h1>
    <child v-on:update-number="updateNumber" />
    <!--等同于-->
    <child @update-number="updateNumber" />
  </div>
</template>
<script>
  import Child from './child.vue';

  export default {
    components: {
      Child
    },
    data() {
      return {
        number: null
      }
    },
    methods: {
      // 接收自组件传过来的参数number
      updateNumber(number) {  
        this.number = number * 2
      }
    }
  }
</script>
```
```vue
// 子组件child.vue
<template>
  <div>
    <h1>我是子组件，点击下方按钮时，会随机产生一个数字，并将此数字作为参数传递给父组件</h1>
    <button @click="handleClick">点我点我</button>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        const number = Math.floor(Math.random() * 100);
        // 通过this.$emit触发父组件的@update-number事件，并传递参数number
        this.$emit('update-number', number);
      }
    }
  }
</script>
```

## 7. npm version：包管理之版本升级那些事
我们日常开发或维护一个npm包时，会在每次功能的迭代后做一件事，也就是发布。整个发布流程包括版本升级、项目打包，npm包发布。从初始化一个npm项目开始，整个流程大致如下：
```txt
1. 初始化项目仓库，添加package.json文件，记录项目基本信息，初始版本号version字段（通常为1.0.0）;
2. 功能开发；
3. 阶段性功能开发完成，准备部署生产环境；
4. 升级版本号（1.0.1），并打上tag提交到远程仓库；
5. 项目打包；
6. 发布npm包。
```
其中第4步的细节会比较多，第一个问题是**如何升级版本号？**
#### <font color="#0000dd">npm version命令</font>
npm提供了超级多的命令参数，将我们的重复人肉劳动尽可能的精简到极致.
```shell
npm version --help  # npm version命令参数概览
npm version  # 获取当前的详细版本信息
npm version major  # 升级主版本号 1.1.1 --> 2.0.0
npm version minor  # 升级次版本号 1.1.1 --> 1.2.0
npm version patch  # 升级补丁号 1.1.1 --> 1.1.2
npm version premajor  # 升级预备主版本号 1.1.1 --> 2.0.0-0
npm version preminor  # 升级预备次版本号 1.1.1 --> 1.2.0-0
npm version prepatch  # 升级预备补丁号 1.1.1 --> 1.1.2-0
npm version prerelease  # 升级预发布版本号 1.1.1 --> 1.1.2-0
```

第二个需要关注的点是：**升级哪个版本号？**
#### <font color="#0000dd">版本号策略</font>
| major | minor | patch | premajor | preminor | prepatch | prerelease |
| ----  | ----  | ----  | ----     | ----     | ----       | ----     |
| 主版本号 | 次版本号 | 补丁号 | 预备主版本 | 预备次版本 | 预备补丁号 | 预发布版本 |

在执行npm version 命令时，通常会根据当次提交的内容来判断版本号升级策略。以执行npm version patch为例，这行命令会执行以下步骤：

1. 修改package.json中的version为1.0.1
2. git commit -m '1.0.1'
3. git tag v1.0.1

例如：当前我们项目的package.json中的version字段为1.0.0，依次输入以下命令进行版本升级，来看看版本号的变化：

```bash
qingchengdeMacBook-Pro:npm-test qingcheng$ npm version
{
  'npm-test': '1.0.0',
  npm: '6.13.4',
  ares: '1.15.0',
  brotli: '1.0.7',
  cldr: '35.1',
  http_parser: '2.9.3',
  icu: '64.2',
  llhttp: '2.0.4',
  modules: '72',
  napi: '5',
  nghttp2: '1.40.0',
  node: '12.16.1',
  openssl: '1.1.1d',
  tz: '2019c',
  unicode: '12.1',
  uv: '1.34.0',
  v8: '7.8.279.23-node.31',
  zlib: '1.2.11'
}
qingchengdeMacBook-Pro:npm-test qingcheng$ npm version prepatch
v1.0.1-0
qingchengdeMacBook-Pro:npm-test qingcheng$ npm version patch
v1.0.1
qingchengdeMacBook-Pro:npm-test qingcheng$ npm version preminor
v1.1.0-0
qingchengdeMacBook-Pro:npm-test qingcheng$ npm version minor
v1.1.0
qingchengdeMacBook-Pro:npm-test qingcheng$ npm version premajor
v2.0.0-0
qingchengdeMacBook-Pro:npm-test qingcheng$ npm version major
v2.0.0
# 查看tag
qingchengdeMacBook-Pro:npm-test qingcheng$ git tag
v1.0.1
v1.0.1-0
v1.1.0
v1.1.0-0
v2.0.0
v2.0.0-0
```

## 8. 文本省略
**<font color="#0000dd">单行文本省略：</font>**

- overflow: hidden;  (文字长度超出限定宽度，则隐藏超出的内容)
- white-space: nowrap; （文字在一行显示，不能换行）
- text-overflow: ellipsis; （当文本溢出时，显示省略符号来代表被修剪的文本）

```html
<style>
  .demo {
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
</style>
<body>
  <div class="demo">这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本。</div>
</body>
```

**<font color="#0000dd">多行文本省略：</font>**

-  -webkit-line-clamp: 2; （用来限制在一个块元素显示的文本的行数，2表示最多显示2行，需要组合其它webkit属性）
- display: -webkit-box; （和-webkit-line-clamp结合使用，将对象作为弹性伸缩盒子模型显示）
- webkit-box-orient: vertical; （和-webkit-line-clamp结合使用，设置或检索伸缩盒对象的子元素的排列方式）
- overflow: hidden; （当文本溢出时，显示省略号来表示被修剪的文本）
- text-overflow: ellipsis; （当文本溢出以时，显示省略号来代表被修剪的文本）

这种实现方案存在兼容性问题，需要浏览器兼容以上-webkit属性。

```html
<style>
  .demo {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
<body>
  <div class="demo">这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本，这是一段很长的文本。</div>
</body>
```

