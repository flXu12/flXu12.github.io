---
title: 【阿白在coding】设计模式之组合模式
date: 2022-06-21
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 既然决定了，就悄悄努力。  

## 1. 组合模式
**定义**：将对象组合成树形结构，以表示“部分-整体”的层次结构。通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性。

## 2. 组合模式的实现
### 2.1 组合模式扫描文件夹
如，当我们用杀毒软件扫描某个文件夹时，往往不会关心里面有多少文件和子文件夹，组合模式非常适用于这种场景，使我们只需要操作最外层的文件夹进行扫描。  
```js
// 文件夹类Folder定义
const Folder = function(name) {
  this.name = name;
  this.files = [];
}

Folder.prototype.add = function(file) {
  this.files.push(file);
}

Folder.prototype.scan = function() {
  console.log(`开始扫描文件夹： ${this.name}`);
  for(let i = 0; i < this.files.length; i++) {
    this.files[i].scan();
  }
}

// 文件类File定义
const File = function(name) {
  this.name = name;
}

File.prototype.add = function() {
  throw new Error('文件下面不能再添加文件'); // 禁止向叶子节点添加子节点
}

File.prototype.scan = function() {
  console.log(`开始扫描文件：${this.name}`);
}

// 应用：创建一些文件夹和文件对象，并将其组合成一棵树,构成我们的文件目录结构
const folder1 = new Folder('folder-1');
const folder2 = new Folder('folder-2');
const folder3 = new Folder('folder-3');

const file1 = new File('file-1');
const file2 = new File('file-2');
const file3 = new File('file-3');

folder2.add(file2);
folder3.add(file3);

folder1.add(folder2);
folder1.add(folder3);
folder1.add(file1);

folder1.scan();

// 输出
// 开始扫描文件夹： folder-1
// 开始扫描文件夹： folder-2
// 开始扫描文件：file-2
// 开始扫描文件夹： folder-3
// 开始扫描文件：file-3
// 开始扫描文件：file-1
```

### 2.2 在子节点上保持对父节点的引用
还是上述扫描文件夹的场景，但我们需要在扫描整个文件夹之前，先在某文件所在文件夹中移除某一个具体的文件。  
```js
// Foler类
const Folder = function(name) {
  this.name = name;
  this.paren = null;
  this.files = [];
}

Folder.prototype.add = function(file) {
  file.parent = this;
  this.files.push(file);
}

Folder.prototype.scan = function() {
  console.log(`开始扫描文件夹：${this.name}`);
  for(let i = 0; i< this.files.length; i++) {
    this.files[i].scan();
  }
}

Folder.prototype.remove = function() {
  if(!this.parent) { // 根节点或树外的游离节点
    return;
  }
  for(let i = this.parent.files.length - 1; i >= 0; i--) {
    const file = this.parent.files[i];
    if(file === this) {
      this.parent.files.splice(i, 1);
    }
  }
}

// File类
const File = function(name) {
  this.name = name;
  this.parent = null;
}

File.prototype.add = function() {
  throw new Error('文件下面不能再添加文件'); 
}

File.prototype.scan = function() {
  console.log(`开始扫描文件：${this.name}`);
}

File.prototype.remove = function() {
  if(!this.parent) {
    return;
  }
  for(let i = this.parent.files.length - 1; i >= 0; i--) {
    const file = this.parent.files[i];
    if(file === this) {
      this.parent.files.splice(i, 1);
    }
  }
}

// 应用
const folder1 = new Folder('folder-1');
const folder2 = new Folder('folder-2');
const folder3 = new Folder('folder-3');

const file1 = new File('file-1');
const file2 = new File('file-2');
const file3 = new File('file-3');

folder2.add(file2);
folder3.add(file3);

folder1.add(folder2);
folder1.add(folder3);
folder1.add(file1);

folder2.remove();
folder1.scan();

// 输出：
// 开始扫描文件夹：folder-1
// 开始扫描文件夹：folder-3
// 开始扫描文件：file-3
// 开始扫描文件：file-1
```