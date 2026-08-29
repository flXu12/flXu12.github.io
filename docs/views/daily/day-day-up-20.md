---
title: 【day day up系列】2026年08月学习笔记
date: 2026-08-29
categories:
  - 日常
tags:
  - daily
siderbar: auto
---

> 被AI裹挟着前行的日子里，我久违地回来啦。

## 1. 【经验之谈】跨框架或技术栈前端融合方案

### 背景 ###
**前端项目A**：微前端架构，容器+微应用多仓库，项目使用`vue2` + `webpack5` + 适配vue2的UI组件库，沉淀了大量基于此技术栈的业务组件库。 

**前端项目B**：SPA架构，单VUE工程，使用`vue3` + `vite5` + `tailwindcss4`。  

**场景说明**：B为当前正在迭代的项目，某些tab页内容需要嵌套部分A的页面，同时做到融合部署。统一认证：通过登录B系统，可以直接访问嵌套在B系统内的A页面，不需要二次登录。

**为什么不能使用iframe**:  
1. 产品整体部署形态的要求不允许跨域：前端包要整体部署到同一个集群，AB之间的资源访问不能跨域，至少要看起来是“来自同一份制品”。  
2. 通过iframe直接嵌套时，子系统内部的下拉框、tooltip等会出现弹窗popover等被iframe边界裁剪，无法展示到主应用的上层；iframe内外双滚动条问题等。   

### 方案 ### 
**方案核心库**：`@micro-zoe/micro-app` （iframe沙箱模式：JS 在隐藏的同源 iframe 中执行（真实 window 隔离），DOM 仍渲染在主文档。）

**原理**：用`Web Components`自定义元素`<micro-app>`做容器，由**主应用（`B`）fetch拉取子系统（`A`）的HTML/JS/CSS文本**，解析后在沙箱中执行JS，把DOM渲染进主应用document。

**实现**： 
1. microapp的初始化：提供一个空白html，用于创建同源iframe来fetch子系统的资源文件。  
```js
// main.js

import microApp from '@micro-zoe/micro-app'

microApp.start({
  iframeSrc: '/blank.html', // js沙箱iframe的地址，因为必须与主应用同源，故需要主应用提供显示空白页面，来运行js
  fetch(url, options) { 
    return window.fetch(url, options).then((res) => res.text()) // 加载子系统的HTML/JS/CSS
  }
})
```

2. 配置支持自定义元素：原因见上述原理说明，自定义元素`<micro-app>`不能被当作vue组件来编译，可能导致"missing template or render function"错误。  
```js
// vite.config.js
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 告知 Vue 模板编译器将 micro-app* 视为自定义元素
            // SFC 模板在构建时预编译，必须在此配置，运行时 app.config.compilerOptions 对 SFC 无效
            isCustomElement: (tag) => tag.startsWith('micro-app'),
          },
        },
      })
    ]
  }
})
```

```js
// main.js

// 告知 Vue 将 micro-app* 视为自定义元素，避免被当作 Vue 组件解析
// 否则 <micro-app> 会触发 "missing template or render function" 警告，
// 且 @mounted/@error 等原生事件无法冒泡给 Vue
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('micro-app')
```

3. 容器组件封装：通过给容器组件封装自定义组件`<micro-app>`的通用逻辑，便于主应用直接使用，此时主应用只需传子系统的路由路径（`microAppPath`），即可激活对子系统的访问。  
```vue
<!-- a-micro-app -->

<template>
  <micro-app
    name="b-page-name"
    :url="microAppUrl"
    iframe
    router-mode="pure"
  />
</template>
```  
`<micro-app>`组件的配置说明：  
- name：应用唯一标识  
- url: 子系统访问地址  
- iframe: 启用iframe沙箱模式，默认false    
- router-mode: 指定路由同步模式，pure表示完全隔离（即关闭 micro-app 自动把子应用路由同步到主应用 URL 的行为，子应用路由状态只存在于沙箱内，避免主应用和子应用访问路由已知出现问题）    
- keep-alive: 保活模式：元素从文档移除时不卸载子应用，只隐藏（保留 JS 状态与 DOM），重新插入时恢复  

**为什么没有跨域问题**：主应用创建一个隐藏的同源空iframe运行子系统的JS，以此获取真实的window，而不是通过iframe直接访问子系统地址，因此不存在跨域问题。

**跨应用认证问题如何解决**：首先`A`和`B`的用户系统是共享的，即二者共享一个认证状态。`A`的认证信息会体现在请求头cookie以及localStorage中，要实现登录`B`后即可免密访问`A`的关键在于从`B`登录成功后，会将认证信息按照`A`的方式写入请求头cookie和localStorage，即可实现登录`B`无缝访问`A`。

### 扩展场景 ###
1. A、B应用之间存在通信，使用`postMessage`作为桥梁。  
**主->子**：通过访问子应用链接`microAppPath`的param/query参数注入；另一种场景是子系统需要响应主应用的某个动作进行响应改变，此时主应用会通过`postMessage`协议向子应用推送消息，相应地自应用在需要支持此场景时要初始化监听器。   
**子->主**：`postMessage`协议，在子系统通过此协议向主应用发送消息，同时主应用在初始化时会初始化一个监听器，用于获取子系统推送的消息。

### 补充说明 ###
尽管`@micro-zoe/micro-app`可以做到跨框架或技术栈的前端复用，但也仅仅只是做到了不同系统的集成问题得到基本解决。  
众所周知，提到前端，刻板印象要讲究好看、协调，而在本案例中，刻意忽略了两个系统间主题风格的差异问题，这个问题无法简单通过一个库或者某一方非侵入式修改得到解决。  
而上述的案例能适用的场景也比较局限，首先主应用和子系统之间需要尽可能保持风格一致，布局也是绕不开的问题；其次用户系统最好尽可能共享，否则只能通过特定手段获取子系统的认证。当上述问题都不是主要矛盾时，如果项目交付时间紧张，此方案才可能成为当下的最优解哦。

