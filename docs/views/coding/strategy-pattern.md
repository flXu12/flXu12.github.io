---
title: 【阿白在coding】设计模式之策略模式
date: 2022-06-19
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 这几天的晚景还挺好看

## 1. 策略模式
**定义**：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。  
**解决**：在有多种算法相似的情况下，使用if...else所带来的复杂和难以维护。

## 2. 策略模式的实现
### 2.1 使用策略模式计算年终奖
**场景描述**：编写一个名为calculateBonus的函数计算每个人的奖金。其中年终奖是根据员工的工资基数和年底绩效情况来发放的。绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，绩效为B的人年终奖是2倍工资。

**实现一**：if...else  
```js
const calculateBonus = function(level, salary) {
  if(level === 'S') {
    return salary * 4;
  }
  if(level === 'A') {
    return salary * 3;
  }
  if(level === 'B') {
    return salary * 2;
  }
}

// 应用
calculateBonus('B', 20000); // 输出：40000
calculateBonus('S', 6000); // 输出：24000
```  
**缺点**：  
- 包含了多个if...else语句  
- 缺乏扩展性，如果增加一种新的绩效等级，或者修改奖金系数，就需要修改calculateBonus函数内部实现，违反了开放-封闭原则  
- 复用性差

**实现二**：使用组合函数重构代码  
```js
const levelS = function(salary) {
  return salary * 4;
}

const levelA = function(salary) {
  return salary * 3;
}

const levelB = function(salary) {
  return salary * 2;
}

const calculateBonus = function(level, salary) {
  if(level === 'S') {
    return levelS(salary);
  }
  if(level === 'A') {
    return levelA(salary);
  }
  if(level === 'B') {
    return levelB(salary);
  }
}

// 应用
calculateBonus('A', 10000); // 输出： 30000
```  
**缺点**：依然没有解决if分支语句多、扩展性差的问题  

**实现三**：使用策略模式重构代码   
```js
// 策略类
const levelS = function() {};
levelS.prototype.calculate = function(salary) {
  return salary * 4;
}

const levelA = function() {};
levelA.prototype.calculate = function(salary) {
  return salary * 3;
}

const levelB = function() {};
levelB.prototype.calculate = function(salary) {
  return salary * 2;
}

// 奖金类
const Bonus = function() {
  this.salary = null;
  this.strategy = null;
}
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary;
}
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
}
Bonus.prototype.getBonus = function() {
  return this.strategy.calculate(this.salary);
}

// 应用
const bonus = new Bonus();

bonus.setSalary(1000);
bonus.setStrategy(new levelS()); // 设置策略对象
console.log(bonus.getBonus());  // 输出：4000

bonus.setStrategy(new levelA());
console.log(bonus.getBonus()); // 输出： 3000
```

**实现四**：JavaScript版本的策略模式  
```js
const strategies = {
  'S': function(salary) { return salary * 4; },
  'A': function(salary) { return salary * 3; },
  'B': function(salary) { return salary * 2; }
}

const calculateBonus = function(level, salary) {
  return strategies[level](salary);
}

// 应用
console.log(calculateBonus('S', 2000)); // 输出： 8000
console.log(calculateBonus('A', 10000)); // 输出：30000
```

### 2.2 使用策略模式实现表单校验
**场景描述**： 编写一个注册的页面，在点击注册按钮之前，有如下几条校验规则：  
- 用户名不能为空  
- 密码长度不能少于6位  
- 手机号码必须符合格式

**实现一**    
```html
<html>
  <body>
    <form id="registerForm">
      请输入用户名：<input type="text" name="userName" />
      请输入密码：<input type="text" name="password" />
      请输入手机号码：<input type="text" name="phoneNumber" />
      <button>提交</button> 
    </form>
    <script>
      const registerForm = document.getElementById('registerForm');
      registerForm.onsubmit = function() {
        if(registerForm.userName.value === '') {
          alert('用户名不能为空');
          return false;
        }
        if(registerForm.password.value.length < 6) {
          alert('密码长度不能少于6位');
          return false;
        }
        if(!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
          alert('手机号码格式不正确');
          return false;
        }
      }
    </script>
  </body>
</html>
```  
**缺点**：  
- 包含多个if分支语句  
- onsubmit函数缺乏弹性  
- 复用性差

**实现二**：用策略模式重构表单校验  
```js
// 策略对象
const strategies = {
  isNotEmpty: function(value, errorMsg) { // 不为空
    if(value === '') {
      return errorMsg;
    }
  },
  minLength: function(value, length, errorMsg) { // 限制最小长度
    if(value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function(value, errorMsg) { // 手机号码格式
    if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
}

// validator类实现
const Validator = function() {
  this.cache = []; // 保存校验规则
};

Validator.prototype.add = function(dom, rule, errorMsg) {
  let arr = rule.split(':');
  this.cache.push(function(){
    const strategy = arr.shift();
    arr.unshift(dom.value);
    arr.push(errorMsg);
    return strategies[strategy].apply(dom, arr);
  })
}

Validator.prototype.start = function() {
  for(let i = 0, validateFunc; validateFunc = this.cache[i++];) {
    const msg = validateFunc();
    if(msg) {
      return msg;
    }
  }
}

// 用户调用
const validateFunc = function() {
  const validator = new Validator(); // 创建一个validator对象

  // 添加校验规则
  validator.add(registerForm.userName, 'isNotEmpty', '用户名不能为空');
  validator.add(registerForm.password, 'minLength', '密码长度不能少于6位');
  validator.add(registerFOrm.phoneNumber, 'isMobile', '手机号码格式不正确');

  const errorMsg = validator.start(); // 获取校验结果
  return errorMsg;
}

const registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function() {
  const errorMsg = validateFunc();
  if(errorMsg) {
    alert(errorMsg);
    return false; // 阻止表单提交
  }
}
```

**实现三**：一个表单项有多个校验规则   
```html
<html>
  <body>
    <form action="http:// xxx.com/register" id="registerForm" method="post">
      请输入用户名：<input type="text" name="userName"/ >
      请输入密码：<input type="text" name="password"/ >
      请输入手机号码：<input type="text" name="phoneNumber"/ >
      <button>提交</button>
    </form>
    <script>
      // 策略对象
      const strategies = {
        isNotEmpty: function(value, errorMsg) {
          if(value === '') {
            return errorMsg;
          }
        },
        minLength: function(value, length, errorMsg) {
          if(value.length < length) {
            return errorMsg;
          }
        },
        isMobile: function(value, errorMsg) {
          if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
          }
        }
      }

      // Validator类
      const Validator = function() {
        this.cache = [];
      }
      Validator.prototype.add = function(dom, rules) {
        const self = this;
        for(let i = 0, rule; rule = rules[i++]) {
          (function(rule) {
            const strategyArr = rule.strategy.split(':');
            const errorMsg = rule.errorMsg;

            self.cache.push(function() {
              const stragety = strategyArr.shift();
              strategyArr.unshift(dom.value);
              strategyArr.push(errorMsg);
              return strategies[strategy].apply(dom, strategyArr);
            })
          })(rule)
        }
      }
      Validator.prototype.start = function() {
        for(let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
          const errorMsg = validatorFunc();
          if(errorMsg) {
            return errorMsg;
          }
        }
      }

      // 用户调用代码
      const registerForm = document.getElementById( 'registerForm' ); 
      const validatorFunc = function() {
        const validator = new Validator();
        validator.add(registerForm.userName,  [{
          strategy: 'isNonEmpty',
          errorMsg: '用户名不能为空'
          }, {
          strategy: 'minLength:6',
          errorMsg: '用户名长度不能小于 10 位'
          }]);
        validator.add( registerForm.password, [{
          strategy: 'minLength:6',
          errorMsg: '密码长度不能小于 6 位'
          }]);
        validator.add( registerForm.phoneNumber, [{
          strategy: 'isMobile',
          errorMsg: '手机号码格式不正确'
          }]);
          
        const errorMsg = validator.start();
        return errorMsg; 
      }

      registerForm.onsubmit = function() {
        const errorMsg = validataFunc();
        if ( errorMsg ) {
          alert ( errorMsg );
          return false;
        } 
      }
    </script>
  </body>
 </html>
```
