---
title: 【day day up系列】2022年2月学习笔记
date: 2022-02-08
categories:
 - 日常
tags:
 - daily
siderbar: auto
---

> 虎年快乐，开工大吉。

## 1. vuex mutations中不支持return
今天在优化项目代码的时候发现一个同步方法写到了vuex actions里，就顺手改到mutations中了，然后发现项目运行数据异常，排查发现是代码中有这样一条赋值操作：  
```js
// aaa.js
const value = this.$store.commit('my-commit', payload);
console.log(value);
```  
在`mutations-->my-commit`中，return了一个确定不可能是`undefined`的值:  
```js
// mutations.js
['my-commit'](state, payload) {
  // xxx
  return 123;
}
```  
然后我们在控制台看到`aaa.js`打印输出的是`undefined`，竟然不是123。在vuex的issues中找到了同样有疑问的小伙伴：[Return values from mutation commits](https://github.com/vuejs/vuex/issues/1437)    
> Reply: So I think we can close this issue. Sorry for making it open for so long, but as I described, this is technically really hard to do with Vuex 3. We should consider this and take in to the design of next Vuex iteration for sure.  

根据issue的回复情况，官方答复是说在mutations中实现return在vuex3（匹配vue2）是一个技术难点，并考虑在vuex4中支持return。  
However, 经过测试，我发现在vuex@4.0.2中也并没有支持commit中return，也许之后能支持也说不定。
