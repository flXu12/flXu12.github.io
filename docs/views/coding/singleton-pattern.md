---
title: 【阿白在coding】设计模式之单例模式
date: 2022-06-18
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 努力在学习中酝酿快乐，当甜过苦时，就能持续输出快乐啦～  

## 1. 单例模式
**单例模式的定义**： 保证一个类只有一个实例，并提供一个访问它的全局访问点。  
**场景**：  
- 全局缓存对象  
- 浏览器的window对象  
- 点击按钮弹出弹窗时，无论点击多少次，弹窗只会被创建一次  

## 2. 单例模式的实现
### 2.1
最简单的单例模式实现，就是需要用一个变量来标识当前是否已经为某个类创建过对象。如果是，则下一次获取该类的实例时，直接返回之前创建的对象。 

**实现一**：  
```js
const Singleton = function(name) {
  this.name = name;
  this.instance = null;
}

Singleton.prototype.getName = function(){
  return this.name;
}

Singleton.getInstance = function(name) {
  if(!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

// 应用
const a = Singleton.getInstance('aaa');
const b = Singleton.getInstance('bbb'); 
console.log(a === b);  // true
```

**实现二**：  
```js
const Singleton = function(name) {
  this.name = name;
}

Singleton.prototype.getName = function(){
  return this.name;
}

Singleton.getInstance = (function() {
  let instance = null;
  return function(name) {
    if(!instance) {
      instance = new Singleton(name);
    } 
    return instance;
  }
})()
```

**缺点**：使用者并不知道Singleton是一个单例类，需要使用`Singleton.getInstance`而不是`new XXX`的方式来获取。

### 2.2 透明的单例模式
实现一个“透明的单例类”，用户从这个类中创建对象的时候，可以像使用其它任何普通类一样。  

如：创建单例类CreateDiv，其作用是负责在页面中创建唯一的div节点。  

**实现**:
```js
const CreateDiv = (function() {
  let instance;

  // CreateDiv构造函数：创建对象和执行初始化函数；确保只有一个对象。
  const CreateDiv = function(html) {
    if(instance) {
      return instance
    }
    this.html = html;
    this.init();
    return instance = this;
  }

  CreateDiv.prototype.init = function() {
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }

  return CreateDiv;
})();

// 应用
const a = new CreateDiv('aaa');  
const b = new CreateDiv('bbb');
console.log(a === b); // true;
```

**缺点**：使用立即执行函数和匿名函数来返回真正的Singleton构造方法，增加了复杂度的同时，也增加了代码阅读的难度。

### 2.3 用代理实现单例模式
在CreateDiv构造函数中，把负责管理单例的代码移出，使其成为一个普通的创建div的类。    
```js
const CreateDiv = function(html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function() {
  const div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
}

// 引入代理类
const ProxySingletonCreateDiv = (function() {
  let instance;
  return function(html) {
    if(!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();

// 应用
const a = new ProxySingletonCreateDiv('aaa');
const b = new ProxySingletonCreateDiv('bbb');
console.log(a === b); // true
```  
这样一来，CreateDiv就变成了一个普通的类，代理类ProxySingletonCreateDiv负责管理单例的逻辑，二者组合实现了单例模式的效果。

## 3. 惰性单例   
仅在需要的时候才创建对象实例。如2.1节代码实现，仅当我们调用`Singleton.getInstance`时才会创建实例，而不是在代码加载的时候就创建好：    
```js
Singleton.getInstance = (function(){
  let instance = null;
  return function(name) {
    if(!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})();
```

结合具体开发场景： 页面上有一个按钮，点击按钮时会弹出一个浮窗，很明显，这个浮窗在页面里总是唯一的，不能出现同时存在多个浮窗的情况。  
**实现一**：在页面加载完成的时候就创建好这个浮窗，但隐藏该浮窗，只有在用户点击按钮时才显示。  
```html
<html>
  <body>
    <button id="btn">按钮</button>
  </body>

  <script>
    const dialog = (function() {
      const div = document.createElement('div');
      div.innerHTML = 'I am dialog';
      div.style.display = 'none'; // 隐藏弹窗
      document.body.appendChild(div);
      return div;
    })();

    document.getElementById('btn').onclick = function() {
      dialog.style.display = 'block';
    }
  </script>
</html>
```  
**缺点**：我们可能并不会点击该按钮，仅仅是干点别的事，但由于代码加载时就已经创建了dialog节点，就浪费了一点DOM节点。  

**实现二**：点击按钮时才创建弹窗    
```html
<html>
  <body>
    <button id="btn">按钮</button>
  </body>

  <script>
    const createDialog = function() {
      const div = document.createElement('div');
      div.innerHTML = 'I am dialog';
      div.style.display = 'none'; // 隐藏弹窗
      document.body.appendChild(div);
      return div;
    }

    document.getElementById('btn').onclick = function() {
      const dialog = createDialog();
      dialog.style.display = 'block';
    }
  </script>
</html>
```  
**缺点**：虽然实现了惰性的目的，但跟单例没有什么关系了。并且每次点击按钮时，都会创建一个新的弹窗，就导致每次关闭弹窗时就得删除之，如果频繁操作按钮，就会不断创建和删除节点，显然是不必要也不合理的。

**实现三**：使用一个标识符来判断是否已经创建过浮窗，也是2.1节的实现。  
```html
<html>
  <body>
    <button id="btn">按钮</button>
  </body>

  <script>
    const createDialog = (function() {
      let div;
      return function() {
        if(!div) {
          div = document.createElement('div');
          div.innerHTML = 'I am dialog';
          div.style.display = 'none'; // 隐藏弹窗
          document.body.appendChild(div);
        }
        return div;
    })()

    document.getElementById('btn').onclick = function() {
      const dialog = createDialog();
      dialog.style.display = 'block';
    }
  </script>
</html>
```  
**缺点**：  
- 创建对象和管理单例的逻辑都在createDialog内部  
- 如果下次我们需要在页面创建唯一的iframe或其他标签元素，那么就需要重写一次createDialog函数，修改对象创建的逻辑。  
```js
const creatIframe = (function() {
  let iframe;
  return function() {
    if(!iframe) {
      document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    return iframe;
  }
})()
```   
**优化**：将不变的部分和变化的部分隔出来。  
```js
// 将管理单例的逻辑放到getSingle中
const getSingle = function(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};

// 创建dialog对象
const createDialog = function() {
  const div = document.createElement('div');
  div.innerHTML = 'I am dialog';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

const createSingletonDialog = getSingle(createDialog);

document.getElementById('btn').onclick = function() {
  const dialog = createDialog();
  dialog.style.display = 'block';
}

// 创建iframe对象
const createSingleIframe = getSingle( function(){
  const iframe = document.createElement ( 'iframe' );
  document.body.appendChild( iframe );
  return iframe;
});

document.getElementById( 'btn' ).onclick = function(){
 const iframe = createSingleIframe();
 iframe.src = 'http://baidu.com';
}; 
```