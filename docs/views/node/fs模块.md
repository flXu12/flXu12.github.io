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
2009年5月由Ryan Dahl首次发布Node.js。这位仁兄的日常工作就是使用C/C++来编写**高性能Web服务**，其基本原则是使用异步IO，时间驱动。然而，C/C++来写这种Web服务太痛苦了，他调研后瞄向了JavaScript，原因是JavaScript是单线程，只能进行异步IO，而且当时有基于V8这样的开源JavaScript引擎。就这样，语言和运行时引擎的问题都解决了，Node.js的诞生就有了先机。  

[WIP]

## 2. fs模块
Node.js内置fs模块，fs模块即文件系统模块，负责读写文件。
fs模块常用方法[WIP]

## 3. fs模块使用
场景：将多个模块打包后的制品收集到一个统一的地址，以便统一换包操作。  
目录如下所示：   
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