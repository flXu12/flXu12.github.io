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

## 4. virtual DOM
虚拟DOM出现的原因是浏览器的标准把DOM设计得非常复杂，在浏览器中渲染一次DOM的代价是很昂贵的，当我们频繁地进行DOM更新，就会产生一定的性能问题。  
在Vue中，virtual DOM是通过VNode这个类来描述的，用原生js对象描述一个DOM节点的代价会比直接创建DOM元素小得多。  
```js
// src/core/vdom/vnode.js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void; 
  // ...
  constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.elm = elm;
    this.ns = undefined;
    // ...
  }

  get child() {
    return this.componentInstance;
  }
}
```  
VNode类中包含了很多属性，比较关键的属性如标签名、数据、子节点、键值等，都只适用于映射到真实DOM的渲染，不会包含DOM操作的方法，因此是轻量且简单的。属性的定义借鉴了开源库[snabbdom](https://github.com/snabbdom/snabbdom)的实现。  
virtual DOM到真实DOM的映射，除了定义数据结构，还需要对VNode进行create、diff、patch等操作。  

## 5. createElement
VNode的创建是通`过createElement`方法实现的。  
```js
// src/core/vdpm/create-element.js
export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  // ...
  return _createElement(context, tag, data, children, normalizationType)
}
```  
`createElement`实际调用的是`_createElement`方法，在调用之前会对参数进行处理，然后传给真正创建VNode的`_createElement`函数。  
```js
export function _createElement(context, tag, data, children, normalizationType) {
  // ...
  // 以下是children的标准化
  if(Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if(normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if(normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  // 以下是创建VNode
  let vnode, ns;
  if(typeof tag === 'string') {
    let Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag); 
    if(config.isReservedTag(tag)) {
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if(isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      vnode = new VNode(tag, data, children, undefined, undefined, context)
    }
  } else {
    vnode = createComponent(tag, data, context, children);
  }

  if(Array.isArray(vnode)) {
    return vnode;
  } else if(isDef(vnode)) {
    if(isDef(ns)) applyNS(vnode, ns);
    if(isDef(data)) registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
```  
`_createElement`函数接收5个参数，context表示VNode的上下文，tag表示标签，data表示VNode的数据，children表示当前vnode的子节点，normalizationType表示子节点规范的类型（用户手写的render还是贬义生成的render）。  
`_createElement`的两个比较关键流程是：children的规范化、vnode创建。  
virtual DOM实际上是一个树状结构，每个vnode可能有多个子节点，子节点也应该是vnode类型。但由于`_createElement`接收的children参数类型未被约束，需要进行规范化处理。根据normalizationType的取值，分别调用`normalizeChildren`和`simpleNormalizeChildren`方法对children进行处理。  
```js
// src/core/vdom/helpers/normalize-children.js
export function simpleNormalizeChildren(children:any) {
  for(let i = 0; i < children.length; i++) {
    if(Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}
```  
`simpleNormalizeChildren`使用场景是由模板编译成的`render`函数，此时children理论上来说都是vnode类型，但有一种特殊情况，functional component函数式组件返回的是数组而不是节点，所以需要调用Array原型方法concat将数组进行扁平化处理。  
```js
// src/core/vdom/helpers/normalize-children.js
export function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : (Array.isArray(children) ? normalizeArrayChildren(children) : undefined);
}
```  
`normalizeChildren`使用场景有两种：  
- 用户手写的`render`函数，当children只有一个节点时，允许用户创建单个简单的文本节点，调用`createTextVNode`创建文本节点的VNode；
- 当编译slot、v-for时会产生嵌套数组的情况，这时会调用`normalizeArrayChildren`方法。  
```js
function normalizeArrayChildren(children) {
  const res = [];
  let i, c, lastIndex, last;
  for(i = 0; i < children.length ; i++) {
    c = children[i];
    if(isUndef(c) || typeof c = 'boolean') continue;
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if(Array.isArray(c)) {
      if(c.length > 0) {
        c = normalizeArrayChildren(c, `${nestedIndex || ''}_${i}`);
        if(isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0].text));
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if(isPrimitive(c)) {
      if(istextNode(last)) {
        res[lastIndex] = createTextVnode(last.text + c);
      } else if(c !== '') {
        res.push(createTextVNode(c));
      }
    } else {
      if(istextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        if(isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = `__vlist${nestedIndex}_${i}__`;
        }
        res.push(c);
      }
    }
  }
  return res;
}
```  
`normalizeArrayChildren`函数接收两个参数，children表示需要规范的子节点，nestedIndex表示嵌套的索引。经过规范化以后，children就变成了一个类型为VNode的Array。  
`normalizeArrayChildren`做了：  
1. 遍历children，获取单个节点c，然后判断c的类型；
2. 如果c是数组类型，则递归调用`normalizeArrayChildren`；
3. 如果c是基础类型，则调用`createTextVNode`将其转换成VNode类型；
4. 否则就已经是VNode类型，这种情况下还存在一种可能就是children是一个列表并且列表还存在嵌套，就需要更新key。
5. 以上的遍历过程中，如果存在连续的text节点，就会将其合并成一个text节点。  

在规范化children以后，`_createElement`会进行VNode的创建，主要是创建VNode实例:  
1. 判断tag是否为string类型；
2. 如果tag不是string，则调用`createComponent`方法创建一个组件类型的VNode节点，本质还是返回一个VNode；
3. 如果tag是string类型，则进一步判断是否为内置的的节点，如果内置，则创建一个普通VNode；
4. 如果tag是一个已经注册的组件名，则调用`createComponent`创建组件类型的VNode节点；
5. 若tag既不是内置节点，也不是已注册的组件名，则创建一个未知的标签的VNode节点。  

通过`createElement`创建VNode节点，VNode的children也是VNode，形成了一个VNode树，能够很形象地映射到真实的DOM树。  

## 6. vm._update  
通过`vm._render`创建VNode以后，还需要将这个VNode渲染成一个真实的DOM，这个过程是交由`vm._update`来完成的。  
**vm._update是vm的私有方法，在首次渲染和数据更新的时候被调用。**其作用是将VNode渲染成真实的DOM。这里分析的是首次渲染过程中`vm._update`的调用。  
```js
Vue.prototype._update = function(vnode, hydrating) {
  
}
```
