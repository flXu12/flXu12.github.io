---
title: 【Nodejs系列】fs模块
date: 2022-05-23
categories:
 - nodejs
tags:
 - nodejs
siderbar: auto
---

> 跳出舒适圈吧，圈养的鸟是飞不远的。

## 1. Node.js简介
Node.js是运行在服务端的JavaScript。  
2009年5月由Ryan Dahl首次发布Node.js。这位仁兄的日常工作就是使用C/C++来编写**高性能Web服务**，其基本原则是使用异步IO，事件驱动。  
然而，C/C++来写这种Web服务太痛苦了，他调研后瞄向了JavaScript，原因是JavaScript是单线程，只能进行异步IO，而且当时有基于V8这样的开源JavaScript引擎。  
就这样，语言和运行时引擎的问题都解决了，Node.js的诞生就有了先机。  
Node.js第一次将JavaScript带入到后端服务器开发，作为一个开源的、跨平台的JavaScript运行时环境，在Node.js上运行的JavaScript对比其他服务端语言最大的优势在于：  
- 借助JavaScript天生的事件驱动机制 + V8高性能引擎，使得编写高性能Web服务轻而易举。   
- 无需考虑浏览器兼容性问题。   

Node.js vs 浏览器：  
- Node.js和浏览器都使用JavaScript作为编程语言  
- 对于使用JavaScript的前端开发人员来说，Node.js能够使他们用一种语言编写前后端代码   
- 在浏览器中，大部分的操作都是与DOM或其他平台API（document、window）进行交互；而Node.js中不存在这些东西   
- Node.js提供了很多友好的API，比如文件系统模块fs   
- Node.js中你可以控制环境（应该在哪个版本的Node.js上运行程序），而浏览器环境下，无法强制用户使用指定浏览器  
- 将代码发布到浏览器之前，需要使用Babel将其转为ES5以满足浏览器兼容性，但在Node.js中无需转换    
- Node.js使用CommonJS模块系统，浏览器目前正在使用ES Module标准。也就意味着在Node.js中使用`require()`，而浏览器中使用`import`    

**V8引擎**  
V8是驱动Google Chrome的JavaScript引擎的名称，在我们使用Chrome浏览器时，V8能够获取我们的JavaScript并执行它。  
V8提供了JavaScript执行的运行时环境。DOM和其它Web平台API由浏览器提供。  
JavaScript引擎独立于浏览器，这也是为什么Node.js可以借助V8来运行的原因。  
V8是用C++编写的，具备可移植特性，且一直在不断改进，以加速Web和Node.js生态系统，追求更高的性能。   
JavaScript通常认为是一种解释型语言，但现代的JavaScript引擎不再只是解释JavaScript，而是会编译它。V8会使用即时编译来加快JavaScript的执行速度。  

**扩展：其它JavaScript引擎**  
其它浏览器也有自己的JavaScript引擎：  
- Firefox具有SpiderMonkey  
- Safari具有JavaScriptCore（也称Nitro）  
- Edge最初基于Chakra，最近使用Chromium和V8引擎重建。  

## 2. fs模块
Node.js内置fs模块，fs模块即文件系统模块，负责读写文件。  
fs模块异步提供了异步和同步的方法：  
异步：因为JavaScript是单线程，执行IO操作时，JavaScript代码无需等待，而是传入回调函数后，继续执行后续的JavaScript代码。  
同步：优点是代码简单，但需要等待IO操作，在等待期间无法响应其它事件。  

### 2.1 fs模块常用方法：
- **fs.existsSync(path)**：同步检测路径是否存在    
- **fs.exists(path, callback)**：异步检测路径是否存在      
- **fs.statSync**：同步获取指定文件路径的信息    
- **fs.stat**：异步获取指定文件路径的信息
- **fs.readdirSync(path[, options])**：同步获取指定目录下的所有文件名称   
- **fs.readdir(path[, options], callback)**：异步获取指定目录下的所有文件名称  
- **fs.readFileSync(path[, options])**: 同步文件读取     
- **fs.readFile(path[, options], callback)**： 异步文件读取    
- **fs.writeFileSync(file, data[, options])**：同步文件写入    
- **fs.writeFile(file, data[, options], callback)**：异步文件写入    
- **fs.appendFileSync(path, data[, options])**：同步文件追加写入    
- **fs.appendFile(path, data[, options], callback)**：异步文件追加写入    
- **fs.copyFileSync(src, dest[, flags])**: 同步文件拷贝    
- **fs.copyFile(src, dest[, flags], callback)**：异步文件拷贝    
- **fs.mkdirSync(path[, options])**：同步创建目录    
- **fs.mkdir(path[, options], callback)**：异步创建目录     
- **fs.unlinkSync(path)**：同步删除文件    
- **fs.unlink(path, callback)**: 异步删除文件  
- **fs.rmdirSync(path[, options])**: 同步删除目录    
- **fs.rmdir(path[, options], callback)**：异步删除目录

## 3. fs模块使用
场景：将多个模块打包后的制品收集到一个统一的地址，以便统一换包操作。  
目录如下所示：  
```bash 
|----project-config  
|----container  
|    |----container  
|    |    |----dist  
|    |    |    |----container-dist  
|----microapps
|    |----microapp-A
|    |    |----dist
|    |    |    |----microapp-A-dist
|    |----microapp-B
|    |    |----dist
|    |    |    |----microapp-B-dist
|    |----microapp-C
|    |    |----dist
|    |    |    |----microapp-C-dist
|----project-dist  
|    |----project-config
|    |----container-A-dist
|    |----microapps
|    |    |----microapp-A-dist
|    |    |----microapp-B-dist
|    |    |----microapp-C-dist
```  

上述目录结构简述：  
- `project-config`: 项目相关配置都在这个文件夹，需要复制到`project-dist`目录下    
- `container-dist`：在`container/container-xxx/dist`目录下，全局API以及组件构建的制品，需要复制到`project-dist`目录下    
- `microapp-A-dist`、`microapp-B-dist`、`microapp-C-dist`：在`/microapps/microapp-xxx/dist`中的制品，需要复制到`project-dist/microapps`目录下。   

**思路**  
1. 创建空文件夹`project-dist` 
2. 复制`project-config` 
3. 复制`container`下的制品
4. 复制`microapps`下的制品

**实现**  
```js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DIST_NAME = 'project-dist';

// 创建空目录，若该目录已存在，则删除；制品复制
function createDistDir() {
  if(fs.existsSync(distPath)) {
    deleteDir(distPath)
  }
  fs.mkdirSync(distPath);
  getProjectConfig();
  getContainerDist();
  getMicroappsDist();
}

// 根据文件路径，删除文件夹及内容
function deleteDir(path) {
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const curPath = path + '/' + file;
    if(fs.statSync(curPath).isDirectory()) {
      deleteDir(curPath); 
    } else {
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(path);
}

// 复制文件夹：根据文件夹所在路径srcDir将其复制到路径targetPath下
function copyDir(srcDir, targetPath) {
  const status = fs.statSync(srcDir);
  const fileName = srcDir.split('/').pop();
  if(status.isFile()) {
    fs.writeFileSync(`${targetPath}/${fileName}`, fs.readFileSync(srcDir))
  } else if (status.isDirectory()) {
    fs.mkdirSync(`${targetPath}/${fileName}`);
    fs.readdirSync(srcDir).forEach(item => {
      copyDir(`${srcDir}/${item}`, `${targetPath}/${fileName}`);
    })
  }
}

// 获取project-config文件路径，复制
function getProjectConfig() {
  const projectConfigPath = path.join(projectPath, 'project-config');
  if(!fs.existsSync(projectConfigPath)) {
    console.error('.project/ is not exist!');
    return;
  }
  copyDir(projectConfigPath, distPath);
}

// 获取container制品路径，复制
function getContainerDist() {
  const containerPath = path.join(projectPath, 'container');
  if(!fs.existsSync(containerPath)) {
    console.error('container/ is not exist!');
    return;
  }
  const containerName = fs.readdirSync(containerPath);
  copyDir(path.join(containerPath,`${containerName}/dist/container-dist`), distPath);
}

// 批量获取microapps下的所有制品，复制
function getMicroappsDist() {
  const microappsPath = path.join(projectPath, 'microapps');
  if(!fs.existsSync(microappsPath)) {
    console.error('microapps/ is not exist!');
    return;
  }
  fs.mkdirSync(`${distPath}/microapps`);
  fs.readdirSync(microappsPath).forEach(item => {
    copyDir(path.join(microappsPath, `${item}/dist/${item}`), `${distPath}/microapps`);
  })
}

// 执行入口
const argv = process.argv.slice(2)
const projectPath = argv[0] || process.cwd();
const distPath = path.join(projectPath, DIST_NAME);
creatDir();
```