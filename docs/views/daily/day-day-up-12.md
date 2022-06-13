---
title: 【day day up系列】2022年6月学习笔记
date: 2022-06-06
categories:
 - 日常
tags:
 - css
 - daily
siderbar: auto
---

## 1. CSS3有哪些新增特性？
### 1.1 边框
- border-radius 圆角  
- box-shadow 盒阴影  
- border-image 边框图像  
### 1.2 背景
- background-size 背景图片的尺寸    
- background_origin 背景图片的定位区域   
- background-clip 背景图片的绘制区域  
### 1.3 渐变 
- linear-gradient 线性渐变  
- radial-gradient 径向渐变
### 1.4 文本效果
- word-break  
- word-wrap  
- text-overflow  
- text-shadow  
- text-wrap  
- text-outline   
- text-justify  
### 1.5 转换
**2D转换属性**:    
- transform  
- transform-origin  
**2D转换方法**:  
- translate(x,y)  
- translateX(n)  
- translateY(n)  
- rotate(angle)  
- scale(n)  
- scaleX(n)  
- scaleY(n)  
- rotate(angle)  
- matrix(n,n,n,n,n,n)  
### 1.6 3D转换
**3D转换属性**：  
- transform  
- transform-origin  
- transform-style  
**3D转换方法**:  
- translate3d(x,y,z)  
- translateX(x)  
- translateY(y)  
- translateZ(z)   
- scale3d(x,y,z)  
- scaleX(x)  
- scaleY(y)  
- scaleZ(z)  
- rotate3d(x,y,z,angle)  
- rotateX(x)  
- rotateY(y)  
- rotateZ(z)  
- perspective(n)  
### 1.7 过渡
- transition
### 1.8 动画
- @Keyframes规则  
- animation  
### 1.9 弹性盒子:flexbox
### 1.10 多媒体查询：@media

## 2. 写一个方法去掉字符串中的空格
**正则匹配**：   
```js
/**
 * @param {string} str
 * @return {string}
**/ 
var trim = function(str) {
  const reg = /\s+/g;
  return str.replace(reg, '');
}
```  
**split -> join**:  
```js
/**
 * @param {string} str
 * @return {string}
**/ 
var trim = function(str) {
  return str.split(' ').join('');
}
```

## 3. HTML全局属性（global attribute）有哪些？  
突然发现这里有几个有趣的属性哦～  
| 属性 | 描述 | 说明 | 
| ----- | ------ | ---- |    
| class | 规定元素的类名 | - |   
| id | 规定元素的唯一id | - |  
| style | 规定元素的行内样式 | - |   
| title | 规定元素的额外信息（可在工具提示中显示） | - |    
| lang | 设置元素中内容的语言代码 | - |   
| accesskey | 为访问当前元素设置快捷键 | <font color="orange">浏览器兼容性不好，不推荐使用</font> |   
| contenteditable | 是否可编辑元素的内容 | 该属性值必须是以下值之一： `true`或`''`，表示可编辑；`false`，表示不可编辑 |  
| contextmenu | 指定一个元素的上下文菜单。当用户右击该元素，出现上下文菜单 | <font color="red">已废弃</font> |   
| draggable | 指定元素是否可以拖动 | 该属性值： `true`,表示可被拖动；`false`， 表示不可被拖动 |   
| data-* | 用于存储页面的自定义数据 | 通过js和html之间进行数据交换，可以通过所属元素的`HTMLElement.dataset`接口访问 |  
| dir | 指定元素中文本方向 | 该属性值：`ltr`，从左到右；`rtl`，从右到左；`auto`，由用户代理决定方向 |  
| autocapitalize | 控制用户的文本输入是否/如何自动大写 | 该属性值：`off`或`none`，所有字母默认小写；`on`或`sentences`，每个句子的第一个字母默认大写，其它字母默认小写；`words`，每个单词的第一个字母默认大写；`characters`,所有字母默认大写 |  

## 4. 在页面上隐藏元素的方法？
| 方法 | 描述 | 说明 |  
| ---- | ---- | ---- |  
| `display: none;` | - | 不占位，该元素及其子元素都不可见。 |  
| `opacity: 0;` | 设置元素不透明度为0，即完全透明 | 占位 |  
| `visibility: hidden;` | 隐藏元素，但其它元素布局不变，相当于此元素变成透明 | 若将其子元素设置`visibility: visible`，则其子元素依然可见 |  
| `z-index: -999999999` | 将元素放到最底层, 可以让其它元素将其遮住 | - |  
| `position: absolute;transform: scale(0)` | 让元素脱标，设置元素缩放值为0，即元素大小为0 | - |  
| `margin-left: -100%;` | 让元素的位置在当前视口之外 | - |  
| `position: relative; left: -100%;` | 让元素的位置在当前视口之外 | - |  
| `width: 0; height: 0; overflow: hidden;` | - | 不占位 |   
| `text-indent: -9999px;` | 设置块元素首行文本内容之前的缩进量为负数，使其超出当前视口 | 仅针对块内文本元素 |   
| `font-size: 0;` | - | 仅针对块内文本元素 |  

## 5. 去除字符串中最后一个指定的字符
### 5.1 正则  
```js
/**
 * @param {string} str
 * @param {string} char
 * @return {string}
**/ 
var deleteSpecificLastCharacter = function(str, char) {
  const reg = new RegExp(`${char}(?=([^${char}]*)$)`);
  return str.replace(reg, '');
}
```  
**说明**：  
- (?=p): 匹配`p`前面的位置。其中`p`是一个子模式  
- ^：匹配开头  
- $：匹配结尾  
- *：匹配表达0次或多次  
### 5.2 lastIndexOf
```js
/**
 * @param {string} str
 * @param {string} char
 * @return {string}
**/ 
var deleteSpecificLastCharacter = function(str, char) {
  const index = str.lastIndexOf(char);
  return str.substring(0, index) + str.substring(index + 1, str.length);
}
```  
### 5.3 旋转字符串  
```js
/**
 * @param {string} str
 * @param {string} char
 * @return {string}
**/ 
var deleteSpecificLastCharacter = function(str, char) {
  return str.split('').reverse().join('').replace(char, '').split('').reverse().join('')
}
```  
## 6. 变量命名：下划线转大驼峰
```js
/**
 * @param {string} str
 * @return {string}
**/ 
var toCamel = function(str) {
  return str.replace(/_(\w)/g, (match, $1) => {
    return $1 ? $1.toUpperCase() : match;
  })
}
```

## 7. 超链接`target`属性的取值
| 值 | 描述 |  
| ---- | ---- |  
| `_blank` | 在新窗口中打开被链接文档 |  
| `_self` | 默认值。在当前窗口或者框架中加载目标文档 |  
| `_parent` | 在父框架集中打开被链接文档。当 a 标签本身在顶层时，则与 _self 相同 |  
| `_top` | 在整个窗口中打开被链接文档 |  
| framename | 在指定的框架中打开被链接文档 |  
| 任意字符 | 如果当前浏览器还没有打开这个链接，则会弹出新窗口打开此链接；如果已经打开了这个链接，则不会再重复弹出第二个窗口，而是刷新已打开的窗口链接 | 

## 8. 切换字符串大小写  
```js
/**
 * @param {string} str
 * @return {string}
**/  
var caseConvert = function(str) {
  return str.replace(/([a-z]*)([A-Z]*)/g, (match, $1, $2) => {
    return `${$1.toUpperCase()}${$2.toLowerCase()}`
  });
}
```
