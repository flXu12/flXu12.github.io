---
title: 【阿白在coding】设计模式之迭代器模式
date: 2022-06-20
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 注定要去的地方，多晚都有光。  

## 1. 发布-订阅模式
**定义**：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

## 2. 发布-订阅模式的实现
### 2.1 售楼信息发布-订阅
**场景描述**：售楼信息通知。小明作为房子的购买者，属于订阅者角色，他订阅了房子开售的信息。售楼处作为发布者，将在合适的时候遍历花名册上的电话号码，依次给购房者发布消息。

**思路**：  
- 首先制定好谁充当发布者，本案例中是售楼处；  
- 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者，本案例中指售楼处的花名册；  
- 最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数，本案例中指遍历花名册，挨个发短信。  

**实现**：简单的发布-订阅模式    
```js
const salesOffices = {};  // 售楼处

salesOffices.clientList = [];  // 缓存列表，存放订阅者的回调函数 

salesOffices.listen = function(fn) { // 增加订阅者
  this.clientList.push(fn);  // 订阅的消息加进缓存列表
}

salesOffices.trigger = function() { // 发布消息
  for(let i = 0, fn; fn = this.clientList[i++];) {
    fn.apply(this, arguments);
  }
}

// 应用
salesOffices.listen(function(price, squareMeter) {
  console.log(`价格：${price}, 面积： ${squareMeter}`);
})

salesOffices.trigger(20000, 88); // 输出: 价格：20000, 面积： 88
```

**缺点**：假设小明只想买88平的房子，但发布者将110平的房子信息也推送给了他，这时需要让订阅者只订阅自己感兴趣的消息。  

**实现二**：让订阅者只订阅自己感兴趣的消息。  
```js
const salesOffices = {};
salesOffices.clientList = [];
salesOffices.listen = function(key, fn) {
  if(!this.clientList[key]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); // 订阅的消息加入消息缓存列表
}

salesOffices.trigger = function() {
  const key = Array.prototype.shift.call(arguments); // 取出消息类型
  const fns = this.clientList[key]; // 取出消息的回调函数集合

  if(!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
    return false;
  }

  for(let i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments);
  }
}

// 应用
salesOffices.listen('squareMeter88', function(price) {
  console.log(`88平价格：${price}`);
})

salesOffices.listen('squareMeter110', function(price) {
  console.log(`110平价格： ${price}`)
})

salesOffices.trigger('squareMeter88', 200000);  // 88平价格：200000
salesOffices.trigger('squareMeter110', 300000); // 110平价格： 300000
```

**实现三**：发布-订阅的通用实行，并支持取消订阅事件  
假设现在小明突然不想买房了，为了避免后续继续接收到售楼处的短信，需要取消之前订阅的事件。  
```js 
const event = {
  clientList: [],
  listen: function(key, fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);  // 订阅的消息添加进缓存列表
  },
  trigger: function() {
    const key = Array.prototype.shift.call(arguments);
    const fns = this.clientList[key];

    if(!fns || fns.length === 0) { // 如果没有绑定对应的消息
      return false;
    }

    for(let i = 0, fn; fn = fns[i++];) {
      fn.apply(this,arguments);  // arguments 是 trigger 时带上的参数
    }
  },
  remove: function(key, fn) { // 取消订阅事件
    const fns = this.clientList[key];
    
    if(!fns) {  // 如果 key 对应的消息没有被人订阅，则直接返回
      return false;
    }

    if(!fn) {
      fns && (fns.length = 0);  // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
    } else {
      for(let i = fns.length - 1; i >= 0; i--) {  // 反向遍历订阅的回调函数列表
        const _fn = fns[i];
        if(_fn === fn) {
          fns.splice(i, 1);  // 删除订阅者的回调函数
        }
      }
    }
  }
}

// 定义一个installEvent函数，给所有的对象动态绑定发布-订阅功能
const installEvent = function(obj) {
  for(let i in event) {
    obj[i] = event[i];
  }
}

// 应用
const salesOffices = {};
installEvent(salesOffices);

salesOffices.listen( 'squareMeter88', fn1 = function( price ){ // 小明订阅消息
 console.log( 'fn1 价格= ' + price );
}); 

salesOffices.listen( 'squareMeter100', fn2 = function( price ){ // 小红订阅消息
 console.log( 'fn2 价格= ' + price );
}); 

salesOffices.listen( 'squareMeter88', fn3 = function( price ){ // 小明订阅消息
 console.log( 'fn3 价格= ' + price );
}); 

salesOffices.trigger( 'squareMeter88', 2000000 ); // fn1 价格= 2000000  fn3 价格= 2000000
salesOffices.trigger( 'squareMeter100', 3000000 ); // fn2 价格= 3000000

salesOffices.remove('squareMeter88', fn1); 
salesOffices.trigger('squareMeter88', 500000); // fn3 价格= 500000
```  
**缺点**：  
- 给每个发布者对象都添加了listen和trigger方法，和一个缓存列表clientList，是一种资源浪费   
- 小明至少要知道售楼处的名字是salesOffices才能订阅到事件  

**实现四**：全局的发布-订阅对象  
订阅者不需要了解消息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者，Event作为类似‘中介’的角色，将订阅者和发布者联系起来。  
```js
const Event = (function() {
  let clientList = {}, listen, trigger, remove;

  listen = function(key, fn) {
    if(!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function() {
    const key = Array.prototype.shift.call(arguments);
    const fns = clientList[key];
    if(!fns || fns.length === 0) {
      return false;
    }
    for(let i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments);
    }
  };

  remove = function(key, fn) {
    const fns = clientList[key];
    if(!fns) {
      return false;
    }
    if(!fn) {
      fns && (fns.length = 0);
    } else {
      for(let i = fns.length - 1; i >= 0; i--) {
        const _fn = fns[i];
        if(_fn === fn) {
          fns.splice(i, 1);
        }
      }
    }
  }

  return {
    listen,
    trigger,
    remove
  }
})()

// 应用
Event.listen('squareMeter88', function(price) {
  console.log(`88 价格：${price}`);
})
Event.trigger('squareMeter88', 60000);  // 88 价格：60000
```

### 2.2 先发布后订阅，提供创建命名空间的功能
**先发布后订阅**：联想QQ离线消息的场景，离线消息被保存在服务器中，当用户登录上线后，可以重新接收到这个消息。  
**创建命名空间**：全局发布-订阅对象中只有一个clientList来存放消息名称和回调函数，难免会有事件名冲突的情况，可以给Event对象提供创建命名空间的能力。  
```js
// 应用1:先发布后订阅
Event.trigger('click', 1);
Event.listen('click', function(a) {
  console.log(`先发布后订阅：${a}`);
});

// 应用2:使用命名空间
Event.create('namespace1').listen('click', function(a) {
  console.log(`namespace1 ${a}`);
});
Event.create('namespace1').trigger('click', 2);

Event.create('namespace2').listen('click', function(a) {
  console.log(`namespace2 ${a}`);
});
Event.create('namespace2').trigger('click', 3);

// 实现
const Event = (function() {
  let global = this, Event, _default = 'default';

  Event = function() {
    let namespaceCache = {}, _create, find;

    const each = function(arr, fn) {
      let ret;
      for(let i = 0; i < arr.length; i++) {
        const item = arr[i];
        ret = fn.call(item, i, item);
      }
      return ret;
    };

    const _listen = function(key, fn, cache) {
      if(!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    }

    const _remove = function(key, cache, fn) {
      if(cache[key]) {
        if(fn) {
          for(let i = cache[key].length - 1; i >= 0; i--) {
            if(cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };

    const _trigger = function() {
      const cache = Array.prototype.shift.call(arguments);
      const key = Array.prototype.shift.call(arguments);
      const _self = this;
      const stack = cache[key];

      if(!stack || !stack.length) {
        return;
      }
      return each(stack, function() {
        return this.apply(_self, arguments);
      })
    };

    const _create = function(namespace) {
      const namespace = namespace || _default;
      const cache = {};
      const offlineStack = []; //离线事件
      const ret = {
        listen: function(key, fn, last) {
          _listen(key, fn, cache);
          if(offlineStack === null) {
            return;
          }
          if(last === 'last') {
            offlineStack.length && offlineStack.pop();
          } else {
            each(offlineStack, function() {
              this();
            })
          }
          offlineStack = null;
        },
        
        one: function(key, fn, last) {
          _remove(key, cache, last);
          this.listen(key, fn, last);
        },

        remove: function( key, fn ){
          _remove( key, cache ,fn);
        },

        trigger: function(){
          let fn, args, _self = this;

          Array.prototype.shift.call( arguments, cache );
          args = arguments;
          fn = function() {
            return _trigger.apply( _self, args );
          };

          if (offlineStack){
            return offlineStack.push( fn );
          }
          return fn();
        }
      };

      return namespace ?
      ( namespaceCache[ namespace ] ? namespaceCache[ namespace ] :
      namespaceCache[ namespace ] = ret )
      : ret;
      };

  return {
    create: _create,
    one: function( key,fn, last ){
      var event = this.create( );
      event.one( key,fn,last );
    },
    remove: function( key,fn ){
      var event = this.create( );
      event.remove( key,fn );
    },
    listen: function( key, fn, last ){
      var event = this.create( );
      event.listen( key, fn, last );
    }, 
    trigger: function() {
      var event = this.create( );
      event.trigger.apply( this, arguments );
    }
  } 
  }
  return Event;
})()
```