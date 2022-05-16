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

## 1. parseInt(0.0000005) === 5?
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

## 2. peerDpendencies那些事
### 2.1 场景描述
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
3. 当我们在`project-A`仓库下执行依赖安装后，再运行项目时，会发现项目无法运行起来，错误信息提示类似“vue是一个需要的依赖，但没有被安装”，并提示我们执行`npm install vue`来安装缺失的依赖。  
4. 一般这种情况下，我们的解决办法就是按照提示所言，执行`npm install vue`，然后重新`npm run serve`，并且这么做以后，项目确实按照期望跑起来了。

### 2.2 问题
我思考了如下几个问题，以`vue`为例：  
1. 类似`vue`这样的依赖，`project-A`并没有直接使用，为什么要安装？  
2. `vue`在`lib-B`中作为`devDependencies`被安装了，怎么打包的时候没打进去呢？  
3. 既然`lib-B`依赖了`vue`，那为什么不把`vue`装到`dependencies`里，而是放到了`devDependencies`和`peerDependencies`里？  

## 2.3 `peerDependencies`
对`peerDependencies`最直观的一种解释是：  
> 如果你安装我，那么你最好也安装x,y,z.   
`peerDependencies`：又称**对等依赖**，不会自动安装的依赖。在`npm install`时不会安装，并且也不会被打入包内，但要求引用这个库的项目安装的依赖，引用者需要自行安装这些依赖。打个比方：某个包`b`的`peerDependencies`中有依赖项`c`，此时项目`a`安装了依赖`b`，那么就必须同时安装依赖`c`。 
  
代入到上述场景，即为：如果你要安装`lib-B`，那么你最好也安装`vue@^2`,`vuex@^3`,`moment@^2`。这也回答了第1个问题，因为`project-A`安装了`lib-B`，所以也需要安装`vue`。 

在npm2中，插件（`lib-B`）中`peerDependencies`所指定的依赖会随着执行插件安装（`npm install lib-B`）被一起强制安装，因此不需要在宿主环境`package.json`中指定对插件中`peerDependencies`内容的依赖。  
在npm3中，不会在要求`peerDependencies`中的依赖被强制安装，而是会在安装结束后检查本次安装是否正确，如果不正确会给用户打印警告提示。这时如果出现提示“vue是一个需要的依赖，但没有被安装”，就需要在宿主环境的`package.json`中指定`vue`的依赖。  
代入到上述场景，也就解释了为什么在第4步中执行`npm install vue`后项目就可以按照预期正常运行。 

`peerDependencies`要求宿主环境安装其指定版本的依赖包，并且在插件（这里指`lib-B`）中使用这些依赖包时，永远使用的都是宿主环境所安装的依赖包，这样做的原因：  
- 通常`peerDependencies`中指定的依赖，在宿主环境中也需要直接依赖并被使用
- 能解决宿主环境和插件环境所装依赖版本不一致的问题
- 当`peerDependencies`中的某个包在某次版本更新时出现了新的特性或者不兼容修改，可以直接在宿主环境中升级，而不需要更新插件依赖--> 插件发包 --> 宿主环境更新插件版本这一系列操作

上述说明也解释了第3个问题，由于`vue`本身就是一个基础的框架库，当宿主环境安装插件时，通常也会直接依赖`vue`，而在后续`vue`升级出现新特性时只需要更新宿主环境的版本即可。同时将其装在`devDependencies`的原因是确保在构建时插件不会自持`vue`，而是取决于宿主环境的`vue`.  

## 2.4 带一波`dependencies` & `devDependencies` 
**开发环境**：项目尚在编码阶段时的环境。代码中可能还有各种console.log、注释、格式化等。  
**生产环境**：项目已经完成编码，并发布上线可供用户浏览的阶段时的环境。代码可能经过了压缩、优化等处理。  
`dependencies`  

`dependencies`：又称**生产依赖**，不仅在开发环境中需要使用，在项目投入使用时（即生产环境），仍然需要的依赖。安装方式：`npm install <packageName>`  
`devDependencies`：又称**开发依赖、运行依赖**，只在开发阶段（开发环境）需要，一旦项目投入使用（生产环境），便不再需要的依赖，不会被打入包内。安装方式：`npm install <packageName> -D`    

上述说明回答了第2个问题，因为`devDependencies`不会在构建时打入包内。

## 3. vm.$refs.xxx获取到了个啥？
`ref`被用于给元素或组件注册引用信息，该引用信息将会注册在父组件的`$refs`对象上。那么问题来了:  
通过在父组件打印`vm.$refs.xxx`时，有时候是`VueComponent`，即vue实例，有时候是`element`，即一个`DOM`。  

Vue源码关于注册ref部分：[Vue.js registerRef](https://github.com/vuejs/vue/blob/dev/src/core/vdom/modules/ref.js#L25)  
```js
export function registerRef (vnode: VNodeWithData, isRemoval: ?boolean) {
  const key = vnode.data.ref
  if (!isDef(key)) return

  const vm = vnode.context
  // 优先取组件实例，取不到时拿组件elm属性，对应一个真实DOM节点
  const ref = vnode.componentInstance || vnode.elm
  const refs = vm.$refs
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref)
    } else if (refs[key] === ref) {
      refs[key] = undefined
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref]
      } else if (refs[key].indexOf(ref) < 0) {
        refs[key].push(ref)
      }
    } else {
      refs[key] = ref
    }
  }
}
```

怎么能知道`$refs.xxx`指向的是`DOM`元素还是vue组件实例呢？答案是：  
**如果在普通的DOM元素上使用`ref`属性，则指向的是DOM元素；如果用在子组件上，则指向的是组件实例。**

## 4. fixed从父原则导致z-index无效
问题：需要将某个DOM节点的层级增加以使其出现在页面的最上层，但发现无论设置成多大都无法达到预期，因此有了这节内容。  
原因：由于从父原则导致对子节点单独设置z-index时无法生效
解决：修改父节点z-index  

### 4.1 什么是从父原则？
1. 子元素在与**父辈**元素进行比较时，用该子节点的父辈`z-index`进行比较
2. 与同级元素比较时，使用自己的`z-index`进行比较

### 4.2 什么情况下会出现从父原则  
1. 父元素通过`fixed absolute relative`定位的元素，子元素也是`fixed absolute relative`定位的元素
2. 在父元素上设置了`z-index`
3. 跟父元素同级的元素也是通过`fixed sbsolute relative`定位的元素，且设定了`z-index` 

本节内容参考： [fixed从父原则导致z-index无效](http://obkoro1.com/web_accumulate/codeBlack/fixed%E7%9A%84%E4%BB%8E%E7%88%B6%E5%8E%9F%E5%88%99.html)

## 5. 【踩坑】表单校验之validate为什么不生效？  
问题：项目中使用了组件库`element UI`，在使用表单校验时自定义校验规则，发现无法生效，且控制台无打印`valid`信息  
原因：自定义校验规则未按照指定格式书写，必须将校验结果放到回调`callback()`中返回  
解决：以IP校验规则为例，请关注`valIp`函数的内容变化   
**解决前：**  
```vue
<template>
  // xxx
</template>

<script>
const valIp = (rule, value, callback) => {
  if (isIp(value)) callback();
  return new Error('请输入合法IP地址');
};

export default {
  data() {
    return {
      rules: {
        ip: [
          { required: true, message: '请输入短信平台接口地址', trigger: 'blur' },
          { validator: valIp, message: '请输入合法IP地址', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    test() {
      this.$refs['form'].validate(valid => {
        if(valid) { 
          //xxx
        }
      })
    }
  }
}
</script>
```
**解决后：**  
```vue
<template>
  // xxx
</template>

<script>
const valIp = (rule, value, callback) => {
  if (isIp(value)) callback();
  callback(new Error('请输入合法IP地址'));
};

export default {
  data() {
    return {
      rules: {
        ip: [
          { required: true, message: '请输入短信平台接口地址', trigger: 'blur' },
          { validator: valIp, message: '请输入合法IP地址', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    test() {
      this.$refs['form'].validate(valid => {
        if(valid) { 
          //xxx
        }
      })
    }
  }
}
</script>
```