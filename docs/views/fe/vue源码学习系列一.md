---
title: Vue源码学习系列一
date: 2021-06-09
categories:
 - 前端
 - 框架
tags:
 - JavaScript
 - Vue
sidebar: auto
---

> vue源码系列主要参考了 [Vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)，并在展示源码时进行了部分删减，突出关键代码。

## 1. new Vue(options)  
Vue实际上是一个类，类在JS中使用函数来实现。 
```js
// src/core/instance/index.js
function Vue(options) {
  // ...
  this._init(options)
}
```  
Vue类函数会调用`_init`方法来进行一些初始化，包括：合并配置、初始化生命周期、初始化事件中心、初始化渲染、初始化data,props,computed,watcher等。  
```js
// src/core/instance/init.js
Vue.prototype._init = function(options?: Object) {
  const vm: Component = this;
  // ...
  if(options && options._isComponent) {
    initInternalComponent(vm, options);
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }

  // ...
  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, 'beforeCreate');
  initInjections(vm);
  initState(vm);
  initProvide(vm);
  callHook(vm, 'created');

  // ...
  if(vm.$options.el) { 
    vm.$mount(vm.$options.el);
  }
}
```  
在初始化的最后，如果检测到有el属性，就调用`vm.$mount`方法挂载vm。挂载的目标就是把模板渲染成最终的DOM。  

## 2. vm.$mount  
`$mount`的实现与平台、构建方式有关，因此在不同平台、构建方式下会有不同的$mount定义。首先看下不带编译器版本的`$mount`实现，这里的`$mount`可以被runtime only版本的Vue直接使用：  
```js
// src/platform/web/runtime/index.js
Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
}
```  
el可以是字符串，也可以是DOM对象，如果在浏览器环境下，会调用`query`方法将其转换为DOM对象。`$mount`实际会调用`mountComponent`方法。  
```js
// src/core/instance/lifecycle.js
export function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if(!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    // ...
  }
  callHook(vm, 'beforeMount');

  let updateComponent;
  if(process.env.NODE_ENV !== 'production' && config.performance && mark) {
    // ...
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  new Watcher(vm, updateComponent, noop, {
    before() {
      if(vm._isMounted) {
        callHook(vm, 'deforeUpdate')
      }
    }
  }, true)

  // ...
  if(vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}
``` 
`mountComponent`核心是实例化一个`Watcher`，调用`updateComponent`方法，最终调用`vm._update`更新DOM。  
Watcher的作用是在初始化或vm实例中监测的数据发生变化时执行回调。  
函数最后会判断实例是否已经挂载，若已经挂载（`vm.$vnode`表示vm的父虚拟Node，为null表示当前是根Vue的实例），则调动`mounted`钩子函数。  

以下分析带编译器版本的浏览器环境下`$mount`实现，首先会缓存上面的runtime only版本的`$mount`方法。  
```js
// src/platform/web/entry-runtime-with-compiler.js
const mount = Vue.prototype.$mount; // 缓存原型上的$mount
Vue.prototype.$mount = function(el, hydrating) {
  el = el && query(el);

  // ...
  const options = this.$options;
  if(!options.render) { 
    let template = options.template;
    if(template) {
      if(typeof template === 'string') {
        if(template.chartAt(0) === '#') {
          template = idToTemplate(template);
          // ...
        }
      } else if(template.nodeType) {
        template = template.innerHTML;
      } else {
        // ... 
        return this;
      }
    } else if(el) {
      template = getOuterHTML(el);
    }

    if(template) {
      // ...
      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      options.render = render;
      oprions.staticRenderFns = staticRenderFns;
    }
  }
  // ...
  return mount.call(this, el, hydrating); 
}
```  
runtime only和runtime-with-compiler版本的`$mount`实现，差别就是runtime少了一个将el或template转换成`render`方法的过程。对于runtime-with-compiler版本，如果没有`render`方法，就会调用`compileToFunctions`方法，把el或者template字符串转换成`render`方法，这个过程是Vue的“在线编译”过程。最后调用原型上的`$mount`方法挂载。  

## 3. vm._render
`_render`方法是实例的一个私有方法，用于将实例渲染成一个虚拟Node。  
```js
// src/core/instance/render.js
Vue.prototype._render = function() {
  const vm = this;
  const { render, _parentVnode } = vm.$options;

  // ...
  vm.$vnode = _parentVnode;
  let vnode;
  try {
    vnode = render.call(vm._renderProxy, vm.$createElement);
  } catch(e) {
    // ...
  }

  // ...
  vnode.parent = _parentVnode;
  return vnode;
}
```  
`render`方法的调用是上述代码的关键之处，接收一个`createElement`方法作为参数。`createElement`方法定义在第一节的`initRender`中：  
```js
export function initRender(vm) {
  vm.c = (a, b, c, d) => createElement(vm, a, b, c, d, false); // 用于template编译成的render函数使用
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d); // 用于用户手写render函数使用
}
```  
一般情况下我们使用较多的是template模板，然后在`mounted`中将template编译成`render`方法。  
```html
<!-- 大多数使用场景是我们写template然后编译成render -->
<div id="app">{{ message }}</div>
```  
如果是手写render实现上述同等效果：  
```js
render: function(createElement) {
  return createElement('div', {
    attrs: {
      id: 'app'
    },
  }, this.message)
}
```  
`vm._render`最终返回的是调用`render`函数后返回的vnode，而`render`方法的核心是`createElement`参数。
