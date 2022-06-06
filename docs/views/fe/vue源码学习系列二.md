---
title: Vue源码学习系列二———组件化
date: 2022-06-06
categories:
 - 前端
 - 框架
tags:
 - JavaScript
 - Vue
sidebar: auto
---

> vue源码系列主要参考了 [Vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)，并在展示源码时进行了部分删减，突出关键代码。  

## 组件化  
Vue.js的另一个核心思想就是**组件化**。   
组件化，就是把页面拆分成多个组件（component），每个组件依赖的CSS、JavaScript、模板、图片等资源放在一起开发和维护。  
组件化的优势：资源独立，可复用。    
```js
import Vue from 'vue'
import App from './App.vue'

var app = new Vue({
  el: '#app',
  // 这里的 h 是 createElement 方法
  render: h => h(App)
})
```

## 1. createComponent  
`createElement`方法最终都需要调用`_createElement`，其中有一段逻辑是对参数`tag`的判断，如果是一个普通的`html`标签，则会实例化一个普通`VNode`节点，否则通过`createComponent`方法创建一个组件`VNode`。  

```js
// src/core/vdom/create-element.js
// 创建vnode实例
  let vnode, ns
  if(typeof tag === 'string') {
    // 如果是string类型，则继续判断是否为内置的节点，若是，则直接创建一个普通的vnode
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if(config.isReservedTag(tag)) {
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if(isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // 如果是已经注册的组件名，则通过createComponent创建一个组件类型的vnode
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // 否则创建一个未知的标签的vnode
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // 直接传入一个App对象，本质是一个`Component`类型
    vnode = createComponent(tag, data, context, children)
  }
```  
对于本文开头给`h`传入一个组件App,最终就是走到了上述代码的`else`中。`createComponent`方法的实现：    
```js
// src/core/vdom/create-component.js
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | void {

  const baseCtor = context.$options._base

  // 如果是一个对象，则将其构造成一个Vue的子类
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }

  // 合并钩子函数
  mergeHooks(data)

  // return a placeholder vnode
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )
  return vnode
}
```

关键步骤：  
### 1.1 构造子类构造函数  
```js
const baseCtor = context.$options._base

if (isObject(Ctor)) {
  Ctor = baseCtor.extend(Ctor)
}
```  

我们在编写组件时，通常都是导出一个对象：  
```js
import HelloWorld from './component/hello-world.vue'

export default {
  name: 'App',
  component: { HelloWorld }
}
```  
上述代码中通过`export`导出了一个对象，此时`createComponent`的代码会执行到`Ctor = baseCtor.extend(Ctor)`。  
这里的`baseCtor`实际上就是`Vue`，其定义在初始化Vue阶段：  
```js
// src/core/global-api/index.js

// this is used to identify the "base" constructor to extend all plain-object
// components with in Weex's multi-instance scenarios.
Vue.options._base = Vue
```    
在Vue原型的`_init`函数中，将`options`扩展到`$options`上（即，把Vue构造函数的options和用户传入的options做一层合并，最终赋值给$options）,因此我们能通过`vm.$options.base`拿到Vue：  
```js
// src/core/instance/init.js

vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
```  
现在，我们知道了`baseCtor.extend(Ctor)`实际指的是`Vue.extend(Ctor)`，再来看看`Vue.extend`的定义：  
```js
// src/core/global-api/extend.js

Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // 对props和computed进行初始化
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // 对Sub构造器进行缓存，避免多次执行Vue.extend时对同一个子组件重复构造
    cachedCtors[SuperId] = Sub
    return Sub
  }
```  
`Vue.extend`的作用是：  
- 构造一个`Vue`的子类，使用原型继承的方式将一个纯对象转换成一个继承Vue的构造器Sub并返回  
- 对Sub这个对象进行一些属性的扩展  
- 对props和computed进行初始化  
- 对Sub构造器进行缓存，避免多次执行Vue.extend时对同一个子组件重复构造  

当实例化`Sub`时，最终都会走到Vue实例的初始化逻辑：    
```js
const Sub = function VueComponent (options) {
  this._init(options)
}
```

### 1.2 合并组件钩子函数  
```js
// src/core/vdom/create-component.js

 // merge component management hooks onto the placeholder node
  mergeHooks(data)
```  
Vue.js在初始化一个Component类型的VNode时，实现了几个钩子函数：  
```js
// src/core/vdom/create-component.js

// hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  init (
    vnode: VNodeWithData,
    hydrating: boolean,
    parentElm: ?Node,
    refElm: ?Node
  ): ?boolean {
    // xxx
  },

  prepatch (oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
    // xxx
  },

  insert (vnode: MountedComponentVNode) {
    // xxx
  },

  destroy (vnode: MountedComponentVNode) {
    // xxx
  }
}

const hooksToMerge = Object.keys(componentVNodeHooks)
```  
`mergeHooks`的作用就是将`componentVNodeHooks`中的钩子函数合并到`data.hook`中：  
```js
// src/core/vdom/create-component.js

function mergeHooks (data: VNodeData) {
  if (!data.hook) {
    data.hook = {}
  }
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i]
    const fromParent = data.hook[key]
    const ours = componentVNodeHooks[key]
    data.hook[key] = fromParent ? mergeHook(ours, fromParent) : ours
  }
}

function mergeHook (one: Function, two: Function): Function {
  return function (a, b, c, d) {
    one(a, b, c, d)
    two(a, b, c, d)
  }
}
```  
在合并过程中，如果某个时机的钩子已经存在`data.hook`中，那么通过执行`mergeHook`函数做合并，确保在最终执行的时候，依次执行这两个钩子函数即可。  
实例化 VNodeVNode执行patch的过程中执行相关的钩子函数。

### 1.3 实例化VNode  
`createComponent`最后一步是通过new VNode实例化一个vnode并返回。  
可以看到与普通元素节点不同的是，组件的vnode是没有children的。  
```js
// src/core/vdom/create-component.js

  // 实例化VNode
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )
  return vnode
```

**总结**：  
`createComponent`的关键逻辑：构造子类构造函数、合并组件钩子函数、实例化vnode。  
`createComponent`最终返回的是组件vnode。会走到`vm._update`、`patch`。

## 2. patch
通过`createComponent`创建了组件`VNode`，接下来会走到`vm._update`，执行`vm.__patch__`去把`VNode`转换成真正的`DOM`节点。  
patch的过程会调用createElm方法来创建元素节点：  
```js
// src/core/vdom/patch.js

/**
 * 通过虚拟节点创建真实的DOM并插入到父节点中
 */
let inPre = 0
function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
  vnode.isRootInsert = !nested // for transition enter check
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }

  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    if (process.env.NODE_ENV !== 'production') {
      if (data && data.pre) {
        inPre++
      }
      if (
        !inPre &&
        !vnode.ns &&
        !(
          config.ignoredElements.length &&
          config.ignoredElements.some(ignore => {
            return isRegExp(ignore)
              ? ignore.test(tag)
              : ignore === tag
          })
        ) &&
        config.isUnknownElement(tag)
      ) {
        warn(
          'Unknown custom element: <' + tag + '> - did you ' +
          'register the component correctly? For recursive components, ' +
          'make sure to provide the "name" option.',
          vnode.context
        )
      }
    }
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)
    setScope(vnode)

    /* istanbul ignore if */
    if (__WEEX__) {
      // in Weex, the default insertion order is parent-first.
      // List items can be optimized to use children-first insertion
      // with append="tree".
      const appendAsTree = isDef(data) && isTrue(data.appendAsTree)
      if (!appendAsTree) {
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        insert(parentElm, vnode.elm, refElm)
      }
      createChildren(vnode, children, insertedVnodeQueue)
      if (appendAsTree) {
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        insert(parentElm, vnode.elm, refElm)
      }
    } else {
      createChildren(vnode, children, insertedVnodeQueue)
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue)
      }
      insert(parentElm, vnode.elm, refElm)
    }

    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      inPre--
    }
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}
```  

### 2.1 createComponent  
在`createElm`的第一步就是判断`createComponent(vnode, insertedVnodeQueue, parentElm, refElm)`返回值，如果返回truthy则直接结束。来看看`createComponent`的定义：  
```js
// src/core/vdom/patch.js

  // 尝试创建子组件
  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm)
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue)
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
        }
        return true
      }
    }
  }
```  
仅当vnode是一个组件VNode，并且`i`就是`init`钩子函数时，上述函数返回true。  
再来看看init钩子函数的定义：  
```js
// src/core/vdom/create-component.js

// hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  init (
    vnode: VNodeWithData,
    hydrating: boolean,
    parentElm: ?Node,
    refElm: ?Node
  ): ?boolean {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    } else if (vnode.data.keepAlive) {
      // xxx
  },

  // 其他钩子函数
}
```  
`init`钩子函数做的事情是，调用`createComponentInstanceForVnode`创建一个Vue实例，然后调用`$mount`来挂载子组件。  
```js
// src/core/vdom/create-component.js

export function createComponentInstanceForVnode (
  vnode: any, // we know it's MountedComponentVNode but flow doesn't
  parent: any, // activeInstance in lifecycle state
  parentElm?: ?Node,
  refElm?: ?Node
): Component {
  const vnodeComponentOptions = vnode.componentOptions
  const options: InternalComponentOptions = {
    _isComponent: true,
    parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  }
  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  return new vnodeComponentOptions.Ctor(options)
}
```  
这里的`vnode.componentOptions.Ctor`对应的就是子组件的构造函数，它实际上是继承于`Vue`的一个构造器`Sub`，相当于`new Sub(options)`这里有几个关键参数:  
- `_isComponent`为 true 表示它是一个组件
- `parent`表示当前激活的组件实例

所以，子组件的实例化其实就是在这个时机执行的，并且还会执行实例的`_init`方法,但会有一点不同：  
```js
// src/core/instance/init.js

Vue.prototype._init = function (options?: Object) {
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }

  // 如果检测到有el属性，就调用vm.$mout方法挂载vm。挂载的目标是把模板渲染成最终的DOM。
  // $mount方法的实现和平台、构建方式相关，因此在不同的版本下都会有$mount方法的定义。
  //（src/platform/web/entry-runtime-with-compiler.js、src/platform/web/runtime/index.js、src/platform/weex/runtime/index.js等）
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```  
这里的`_init`函数首先合并了options,由于`_isComponent`是true，因此会调用`initInternalComponent`： 
```js
// src/core/instance/init.js 
function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent
  opts.propsData = options.propsData
  opts._parentVnode = options._parentVnode
  opts._parentListeners = options._parentListeners
  opts._renderChildren = options._renderChildren
  opts._componentTag = options._componentTag
  opts._parentElm = options._parentElm
  opts._refElm = options._refElm
  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
```  
`initInternalComponent`将原本通过`createComponentInstanceForVnode`函数传入的参数兵兵到内部的`$options`中。  
在`_init`的最后，还会执行`child.$mount`方法用于挂载子组件。其中参数`hydrating`为true通常是服务端渲染，我们只考虑客户端渲染的情况下，这个的`$mount`就相当于执行了`child.$mount(undefined, false)`，最终会调用`mountComponent`方法，进而执行`vm._render`方法：  
```js
// src/core/instance/render.js

// Vue实例的私有方法，用来将实例渲染成一个虚拟Node。
// 关键方法： render()
Vue.prototype._render = function (): VNode {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options

  // set parent vnode. this allows render functions to have access
  // to the data on the placeholder node.
  vm.$vnode = _parentVnode
  // render self
  let vnode
  try {
    // render函数中的参数createElement方法就是vm.$createElement方法。
    vnode = render.call(vm._renderProxy, vm.$createElement)
  } catch (e) {
    // xxx
  }
  
  // set parent
  vnode.parent = _parentVnode
  return vnode
}
```  
这里的`_parentNode`就是当前组件的父组件VNode。

