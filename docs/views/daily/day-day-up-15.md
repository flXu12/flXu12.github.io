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
TODO