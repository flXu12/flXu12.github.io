---
title: 【阿白在coding】设计模式之职责链模式
date: 2022-06-23
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

## 1. 职责链模式
**定义**：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，知道有一个对象处理它为止。  

## 2. 职责链模式的实现
### 2.1 618大促
**场景描述**：618大促期间有如下优惠策略：在正式购买时，若之前已经支付过500定金的用户，可以返100元优惠券；若之前支付过200定金的用户，可以返50优惠券；若之前没有支付过定金，则只能自行抢购，并且在库存有限的情况下不一定保证能买到。

**实现一**：普通实现    
```js
/**
 * @param {number} orderType 订单类型。1:支付过500定金的用户；2:支付过200定金的用户；3:普通购买用户
 * @param {boolean} pay 是否已经支付定金，若用户下的订单类型是500定金，但迟迟没有支付500元，就只能降级为普通用户
 * @param {number} stock 商品库存
 */
const order = function(orderType, pay, stock) {
  if(orderType === 1) {
    if(pay === true) {
      console.log('已经支付500定金，得到100优惠券')
    } else {
      if(stock > 0) {
        console.log('普通购买，无优惠券')
      } else {
        console.log('商品库存不足')
      }
    }
  } else if(orderType === 2) {
    if(pay === true) {
      console.log('已经支付200定金，得到50优惠券')
    } else {
      if(stock > 0) {
        console.log('普通购买，无优惠券')
      } else {
        console.log('商品库存不足')
      }
    }
  } else if(orderType === 3) {
    if(stock > 0) {
      console.log('普通购买，无优惠券')
    } else {
      console.log('商品库存不足')
    }
  }
}

// 应用
order(1, true, 500);  // 已经支付500定金，得到100优惠券
```

**缺点**：难以阅读，维护困难。

**实现二**：职责链模式重构代码  
```js
// 500定金
const order500 = function(orderType, pay, stock) {
  if(orderType === 1 && pay === true) {
    console.log('已经支付500定金，得到100优惠券')
  } else {
    order200(orderType, pay, stock);
  }
}

// 200定金
const order200 = function(orderType, pay, stock) {
  if(orderType === 2 && pay === true) {
    console.log('已经支付200定金，得到50优惠券')
  } else {
    orderNormal(orderType, pay, stock);
  }
}

//普通购买
const orderNormal = function(orderType, pay, stock) {
  if(stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('商品库存不足')
  }
}

// 应用
order(1, true, 500); // 已经支付500定金，得到100优惠券
order(1, false, 500); // 普通购买，无优惠券
order(2, true, 500); // 已经支付200定金，得到50优惠券
order(2, false, 500); // 普通购买，无优惠券
order(3, false, 0); // 商品库存不足
```

**缺点**：传递请求的代码被耦合到了业务函数中。如果后续要增加300元定金，或去掉200元定金活动，就必须修改整个职责链中的节点。

**实现三**：优化职责链模式  
```js
// 500定金
const order500 = function(orderType, pay, stock) {
  if(orderType === 1 && pay === true) {
    console.log('已经支付500定金，得到100优惠券')
  } else {
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
}

// 200定金
const order200 = function(orderType, pay, stock) {
  if(orderType === 2 && pay === true) {
    console.log('已经支付200定金，得到50优惠券')
  } else {
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
}

//普通购买
const orderNormal = function(orderType, pay, stock) {
  if(stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('商品库存不足')
  }
}

// 职责链
const Chain = function(fn) {
  this.fn = fn;
  this.successor = null; // 职责链中的下一个节点
};

Chain.prototype.setNextSuccessor = function(successor) { // 指定链中的下一个节点
  return this.successor = successor;
};

Chain.prototype.passRequest = function() { // 传递请求给某个节点
  const ret = this.fn.apply(this, arguments);
  if(ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
  return ret;
}

// 包装职责链
const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);

// 指定链的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

// 传递请求
chainOrder500.passRequest(1, true, 500);  // 已经支付500定金，得到100优惠券

// 更新职责链节点
const order300 = function() { 
  // ...
}
chainOrder300 = new Chain(order300);
chainOrder500.setNextSuccessor(chainOrder300);
chainOrder300.setNextSuccessor(chainOrder200);
```

### 2.2 异步的职责链
**场景描述**：在618大促的场景中，节点返回特定的值“nextSuccessor”用于将请求传递给职责链中的下一个节点。但实际应用时，会遇到一些异步的问题，比如要在节点函数中进行一个异步操作后，根据异步的结果决定是否继续在职责链中传递请求。  
```js
// 职责链
const Chain = function(fn) {
  this.fn = fn;
  this.successor = null; // 职责链中的下一个节点
};

Chain.prototype.setNextSuccessor = function(successor) { // 指定链中的下一个节点
  return this.successor = successor;
};

Chain.prototype.passRequest = function() { // 传递请求给某个节点
  const ret = this.fn.apply(this, arguments);
  if(ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
  return ret;
}

// 增加next方法，用于手动传递请求给下一个节点
Chain.prototype.next = function() {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments);
}

// 异步应用
const fn1 = new Chain(function() {
  console.log('fn1');
  return 'nextSuccessor';
});

const fn2 = new Chain(function() {
  console.log('fn2');
  const self = this;
  setTimeout(function() {
    self.next();
  }, 1000);
});

const fn3 = new Chain(function() {
  console.log('fn3');
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
// 输出
// fn1
// fn2
// (1秒后) fn3
```