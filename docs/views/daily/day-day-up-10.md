---
title: 【day day up系列】2022年4月学习笔记
date: 2022-04-07
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 最近在重温《死神》，平均20分钟/集，总共366集，有了一个长期的放松方式，比追电视剧轻松多啦～

## 1.【踩坑系列】二次封装组件[WIP]

## 2. parseInt(0.0000005) === 5?
`parseInt(string, radix)`：  
- 描述：解析一个字符串并返回指定基数的十进制整数，`radix`是2-36之间的**整数**或**NaN**，表示被解析字符串的基数。
- 参数说明：  
  - string：要被解析的值。如果参数不是一个字符串，则将其转换为字符串，字符串开头的空白符将被忽略。  
  - radix：可选，从2到36，表示字符串的基数。  
- 返回值说明：
  - 整数
  - NaN：`radix < 2`或`radix > 36`时；第一个非空格字符不能转为数字时  
- **特殊说明**  
  - 如果`string`参数中包含不是`radix`参数中的字符，则`parseInt`将忽略该字符及其后续字符。  
  - 由于某些数字在字符串表示形式中使用`e`字符（如6.022x23表示6.022e23），因此当对于非常大或者非常小的数字使用`parseInt`时会产生数字截断的"意外"，这种情况下应当使用`Math.floor()`。
  - 当`string`类型为`BigInt`时，`parseInt`将`BigInt`转换为`Number`，这个过程中会失去精度，因为非数字值（包括"n"）会被丢弃。   
- 当`radix`是`undefined`、0或未指定时，会有如下几种情况：  
  - 若`string`以"`0x`"或"`0X`"开头，则`radix`被假定为16，`string`会被当作十六进制去解析。  
  - 若`string`以"`0`"开头，则`radix`被假定为10（<font color="#008dff">但不是所有浏览器都支持，也有浏览器使用8</font>）。**在使用`parseInt`时，一定要指定一个`radix`。**    
  - 若`string`以任何其他值开头，则`radix`为10。

现在回归标题：为啥子parseInt(0.0000005)严格等于5呢？  
答案在上述说明中可以得到，以下是分析步骤：  
- 第一个参数`string`不是字符串类型时，会将其转换成字符串，这时调用String(0.0000005)得到'5e-7'；
- 由于'5e-7'命中**当`radix`是`undefined`、0或未指定时，会有如下几种情况**中的第3条，此时第二个参数`radix`为10；
- 上述处理后得到的计算式为`parseInt('5e-7', 10)`;  
- 命中**特殊说明**第一条，`parseInt`会忽略`radix`中不包含的字符，无法识别字符'e'及其后续字符；  
- 上述处理后得到的计算结果等同于`parseInt('5', 10)`，即为5.

## 3. peerDpendencies那些事
### 3.1 场景描述
最近在一个项目中遇到了个依赖安装的问题，下面来描述下过程：  
1. 当前有个项目仓库名为`project-A`，由于用到了一些业务类的工具库，就在dependencies里引入了工具库`lib-B`  
```json
// project-A的package.json
{
  // ...
  "dependencies": {
    "lib-B" : "^1.0.0"
  }
  // ...
}
```  
2. 工具库`lib-B`的代码中部分功能需要使用`vue`、`vuex`、`moment`库，依赖情况如下：  
```json
// lib-B的package.json
{
  "dependencies": {},
  "devDependencies": {
    "vue": "^2.6.12",
    "vuex": "^3.5.1",
    "moment": "^2.29.1"
  },
  "peerDependencies": {
    "vue": "^2",
    "vuex": "^3",
    "moment": "^2"
  }
}
```  
3. 当我们在`project-A`仓库下执行依赖安装后，再运行项目时，会发现项目无法运行起来，错误信息提示类似“vue is not found in package.json”，并提示我们执行`npm install vue`来安装缺失的依赖。  
4. 一般这种情况下，我们的解决办法就是按照提示所言，执行`npm install vue`，然后重新`npm run serve`，并且这么做以后，项目确实按照期望跑起来了。

### 3.2 问题
我思考了如下几个问题，以`vue`为例：  
1. 类似`vue`这样的依赖，`project-A`并没有直接使用，为什么要安装？  
2. `vue`在`lib-B`中作为`devDependencies`被安装了，怎么打包的时候没打进去呢？  
3. 既然`lib-B`依赖了`vue`，那为什么不把`vue`装到`dependencies`里，而是放到了`devDependencies`和`peerDependencies`里？  
4. `vue`官方提供的安装方式是将其安装到`dependencies`，而`lib-B`的做法如果是合理的，那是否表示所有的公共库在管理第三方基础依赖时，都需要将其放到`devDependencies`和`peerDependencies`中？

## 3.3 解惑  
**开发环境、生产环境**   
开发环境：项目尚在编码阶段时的环境。代码中可能还有各种console.log、注释、格式化等。  
生产环境：项目已经完成编码，并发布上线可供用户浏览的阶段时的环境。代码可能经过了压缩、优化等处理。  

**dependencies、DevDependencies、peerDependencies**   
`dependencies`：又称**生产依赖**，不仅在开发环境中需要使用，在项目投入使用时（即生产环境），仍然需要的依赖。安装方式：`npm install <packageName>`  
`devDependencies`：又称**开发依赖、运行依赖**，只在开发阶段（开发环境）需要，一旦项目投入使用（生产环境），便不再需要的依赖，不会被打入包内。安装方式：`npm install <packageName> -D`    
`peerDependencies`：又称**对等依赖**，不会自动安装的依赖。在`npm install`时不会安装，并且也不会被打入包内，但要求引用这个库的项目安装的依赖，引用者需要自行安装这些依赖。打个比方：某个包`b`的`peerDependencies`中有依赖项`c`，此时项目`a`安装了依赖`b`，那么就必须同时安装依赖`c`。   

**peerDependencies存在的意义是？**  


上边抛出的四个问题是依次递进的，前2个问题比较好解答，但为了更好解释后两个问题，所以也列举出来了。

## 4. vm.$refs.xxx获取到了个啥？
有时候是`VueComponent`，即vue实例，有时候是`element`，即一个`DOM`。

## 5. fixed从父原则导致z-index无效
[fixed从父原则导致z-index无效](http://obkoro1.com/web_accumulate/codeBlack/fixed%E7%9A%84%E4%BB%8E%E7%88%B6%E5%8E%9F%E5%88%99.html)