---
title: 【day day up系列】2023年02月学习笔记
date: 2023-02-20
categories:
 - 日常
tags:
 - daily
siderbar: auto
---


## 1. 实现函数缓存(记忆函数) lodash---memoize 
在日常开发中我们经常会碰到这种场景：页面初始化时，需要请求接口获取一个数据用于页面展示；当切换路由去另一个页面时，同样需要该数据进行其他操作。  
已知接口返回的数据变动比较少（比如：系统账号信息等），为了节约资源以及页面等待时间，我们通常会将该接口的获取做缓存，在第一次请求以后，之后的数据获取将不再触发接口请求，而是取缓存数据。  
lodash的memoize方法就做了这件事，简单版实现：  
```js
/**
 * @param {Function} func 需要缓存化的函数.
 * @param {Function} [resolver] 这个函数的返回值作为缓存的 key.
 * @returns {Function} 返回缓存化后的函数.
 */
function memoize(func, resolver) {
   // 异常过滤
  if (typeof func !== "function" || (resolver != null && typeof resolver !== "function")) {
    throw new TypeError("Expected a function")
  }

  const memoized = function(...args) {
    const key = resolver ? resolver.apply(this, args) : args[0];

    const cache = memoized.cache;
    if(cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  }

  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}

memoize.Cache = Map;

export default memoize;
```   
实现原理： 将参数和对应的结果数据存到一个对象中，调用memoize函数时，判断参数对应的数据是否存在，如果存在则返回对象的数据。  

使用：  
```js
async function fetchData() {
  const { data } = await apiService.userListGet();
  return data;
}

const memoizeFetchData = memoize(fetchData);

await memoizeFetchData(); // ['user1', 'user2']  
await memoizeFetchData(); // ['user1', 'user2']  不再触发接口请求，直接从缓存中取出数据  
```

## 2. Vue组件中的data属性为什么是一个函数，而不是一个对象？  
主要包含2个原因：  
- **确保每个组件实例的数据是独立的**：在js中，对象是引用类型，如果`data`是一个对象，那么所有组件实例将会共享这个`data`对象，这也就意味着<font color="red">任何一个实例修改了data对象的属性，都会影响其他实例。</font> 而将`data`设计为一个函数，则组件实例化时都会调用该函数创建一个新的data对象，确保了每个组件的实例拥有独立的数据。  
- **vue响应式设计的要求**： 在vue2.x中，`data`函数的返回对象可以使用`Vue.set`方法来更新属性并确保其响应式；在vue3.x中，通过`composition api`, `data`函数实际上是创建了一个新的响应式对象，进而支持响应式数据和计算属性的定义。