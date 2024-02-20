---
title: 【阿白在coding】vue自定义指令
date: 2023-03-01
categories:
 - 前端
tags:
 - JavaScript  
 - Vue
siderbar: auto
---

> 我自向光而行。  

## 1. 什么是指令？
在vue中提供了一套为数据驱动视图更为方便的操作，这些操作被称为指令系统。  
我们看到的v-开头的行内属性，都是指令，不同的指令可以完成或实现不同的功能。  
除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

## 2. 自定义指令实现

### 2.1 一键copy（v-copy）

```js
const copy = {
  bind(el, { value }, vnode) {
    el.$value = value;
    el.handler = function() {
      if(!el.$value) return; // 空值
      // 创建不可见的文本节点插入到body
      const textareaNode = document.createElement('textarea');
      // fix: 防止因存在textarea自动唤醒输入法
      textareaNode.readOnly = 'readonly';
      textareaNode.style.position = 'absolute';
      textareaNode.style.left = '-9999px';
      textareaNode.value = el.$value;
      document.body.appendChild(textareaNode);
      textareaNode.select(); // 选中值  
      const result = document.execCommand('Copy'); // 【warning】 此API不标准且标记了废弃
      if(result) {
        alert('复制成功!')
      }
      document.body.removeChild(textareaNode);
    }
    el.addEventListener('click', el.handler);
  },
  // 当选中值变化时
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  unbind(el) {
    el.removeEventListener('click', el.handler);
  }
}

export default copy;
```

### 2.2 权限控制（v-permission）
无权限时，添加提示，并禁用标签组件（`button`, `switch`, `input`等）, 并在点击时提示无权限。

```js
function handler(event) {
  alert('不存在该权限');
  event.stopPropagation();
  return false;
}

function setDisable(el) {
  el.classList.add('is-disabled');
  el.setAttribute('disabled', 'disabled');
  el.querySelectAll('el-input', 'el-switch', 'el-button').forEach(item => {
    item.classList.add('is-disabled');
    item.setAttribute('disabled', 'disabled');
  });
}

function createDivWrapper(el, handler) {
  setTimeout(function () {
    el.addEventListener('click', handler, true);
  }, 100);
  return el;
}

const permission = {
  async bind(el, { value, arg }, vnode) {
    // 验证是否有权限，通常会异步获取权限key的集合，根据传入值判断是否有读/写权限
    const permissionList = await getPermissionList();  // 异步获取权限集合，结构类似： { key1: {read: true, wirte: true }, key2: {read: false, write: false }}
    const permissionKey = value;
    const action = arg ? arg : 'read'; // 取值：read（默认）/write
    const hasPermission = permissionList[permissionKey][action];
    if(hasPermission) return; // 有权限，直接返回
    el.$permission = { handler, target: createDivWrapper(el, handler) };
    setDisabled(el.$permission.target);
  },
  unbind(el) {
    el.$permission.target.removeEventListener('click', el.$permission.handler);
  }
}

export default permission;
```

## 3. 指令的使用

首先在入口文件（通常是src/main.js）注册指令：  

```js
import copy from '@/directives/copy.js';
import permission from '@/directives/permission.js';

export default {
  install(Vue) {
    Vue.directive('copy', copy);
    Vue.directive('permission', permission);
  }
}
```

组件中使用:  

```vue
<template>
  <div class="demo">
    <el-button v-copy="value">一键复制</el-button>
    <!--有alarm的读权限时-->
    <div v-permission="'alarm'">
      <el-input />
      <el-button>提交</el-button>
    </div>
    <!--有asset的写权限时-->
    <div v-permission:write="'asset'">
      <el-switch />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '嘿嘿哈哈吼吼'
    }
  }
}
</script>
```

## 3. 封装axios
axios是一个轻量的HTTP客户端。基于`XMLHttpRequest`服务来执行HTTP请求，支持丰富的配置，支持Promise，支持浏览器端和Node.js端。  
axios的API很友好,但随着项目规模增大，如果每发起一次HTTP请求，就要把设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作都重写一遍，这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。  
因此，我们在日常开发的项目中都会对axios进行二次封装。  

