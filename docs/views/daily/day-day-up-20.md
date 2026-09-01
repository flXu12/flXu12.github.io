---
title: 【day day up系列】2026年08月学习笔记
date: 2026-08-29
categories:
  - 日常
tags:
  - daily
siderbar: auto
---

> 被AI裹挟着前行的日子里，我久违地回来啦。

## 1. 【经验之谈】跨框架或技术栈前端融合方案

### 背景 ###
**前端项目A**：微前端架构，容器+微应用多仓库，项目使用`vue2` + `webpack5` + 适配vue2的UI组件库，沉淀了大量基于此技术栈的业务组件库。 

**前端项目B**：SPA架构，单VUE工程，使用`vue3` + `vite5` + `tailwindcss4`。  

**场景说明**：B为当前正在迭代的项目，某些tab页内容需要嵌套部分A的页面，同时做到融合部署。统一认证：通过登录B系统，可以直接访问嵌套在B系统内的A页面，不需要二次登录。

**为什么不能使用iframe**:  
1. 产品整体部署形态的要求不允许跨域：前端包要整体部署到同一个集群，AB之间的资源访问不能跨域，至少要看起来是“来自同一份制品”。  
2. 通过iframe直接嵌套时，子系统内部的下拉框、tooltip等会出现弹窗popover等被iframe边界裁剪，无法展示到主应用的上层；iframe内外双滚动条问题等。   

### 方案 ### 
**方案核心库**：`@micro-zoe/micro-app` （iframe沙箱模式：JS 在隐藏的同源 iframe 中执行（真实 window 隔离），DOM 仍渲染在主文档。）

**原理**：用`Web Components`自定义元素`<micro-app>`做容器，由**主应用（`B`）fetch拉取子系统（`A`）的HTML/JS/CSS文本**，解析后在沙箱中执行JS，把DOM渲染进主应用document。

**实现**： 
1. microapp的初始化：提供一个空白html，用于创建同源iframe来fetch子系统的资源文件。  
```js
// main.js

import microApp from '@micro-zoe/micro-app'

microApp.start({
  iframeSrc: '/blank.html', // js沙箱iframe的地址，因为必须与主应用同源，故需要主应用提供显示空白页面，来运行js
  fetch(url, options) { 
    return window.fetch(url, options).then((res) => res.text()) // 加载子系统的HTML/JS/CSS
  }
})
```

2. 配置支持自定义元素：原因见上述原理说明，自定义元素`<micro-app>`不能被当作vue组件来编译，可能导致"missing template or render function"错误。  
```js
// vite.config.js
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 告知 Vue 模板编译器将 micro-app* 视为自定义元素
            // SFC 模板在构建时预编译，必须在此配置，运行时 app.config.compilerOptions 对 SFC 无效
            isCustomElement: (tag) => tag.startsWith('micro-app'),
          },
        },
      })
    ]
  }
})
```

```js
// main.js

// 告知 Vue 将 micro-app* 视为自定义元素，避免被当作 Vue 组件解析
// 否则 <micro-app> 会触发 "missing template or render function" 警告，
// 且 @mounted/@error 等原生事件无法冒泡给 Vue
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('micro-app')
```

3. 容器组件封装：通过给容器组件封装自定义组件`<micro-app>`的通用逻辑，便于主应用直接使用，此时主应用只需传子系统的路由路径（`microAppPath`），即可激活对子系统的访问。  
```vue
<!-- a-micro-app -->

<template>
  <micro-app
    name="b-page-name"
    :url="microAppUrl"
    iframe
    router-mode="pure"
  />
</template>
```  
`<micro-app>`组件的配置说明：  
- name：应用唯一标识  
- url: 子系统访问地址  
- iframe: 启用iframe沙箱模式，默认false    
- router-mode: 指定路由同步模式，pure表示完全隔离（即关闭 micro-app 自动把子应用路由同步到主应用 URL 的行为，子应用路由状态只存在于沙箱内，避免主应用和子应用访问路由已知出现问题）    
- keep-alive: 保活模式：元素从文档移除时不卸载子应用，只隐藏（保留 JS 状态与 DOM），重新插入时恢复  

**为什么没有跨域问题**：主应用创建一个隐藏的同源空iframe运行子系统的JS，以此获取真实的window，而不是通过iframe直接访问子系统地址，因此不存在跨域问题。

**跨应用认证问题如何解决**：首先`A`和`B`的用户系统是共享的，即二者共享一个认证状态。`A`的认证信息会体现在请求头cookie以及localStorage中，要实现登录`B`后即可免密访问`A`的关键在于从`B`登录成功后，会将认证信息按照`A`的方式写入请求头cookie和localStorage，即可实现登录`B`无缝访问`A`。

### 扩展场景 ###
1. A、B应用之间存在通信，使用`postMessage`作为桥梁。  
**主->子**：通过访问子应用链接`microAppPath`的param/query参数注入；另一种场景是子系统需要响应主应用的某个动作进行响应改变，此时主应用会通过`postMessage`协议向子应用推送消息，相应地自应用在需要支持此场景时要初始化监听器。   
**子->主**：`postMessage`协议，在子系统通过此协议向主应用发送消息，同时主应用在初始化时会初始化一个监听器，用于获取子系统推送的消息。

### 补充说明 ###
尽管`@micro-zoe/micro-app`可以做到跨框架或技术栈的前端复用，但也仅仅只是做到了不同系统的集成问题得到基本解决。  
众所周知，提到前端，刻板印象要讲究好看、协调，而在本案例中，刻意忽略了两个系统间主题风格的差异问题，这个问题无法简单通过一个库或者某一方非侵入式修改得到解决。  
而上述的案例能适用的场景也比较局限，首先主应用和子系统之间需要尽可能保持风格一致，布局也是绕不开的问题；其次用户系统最好尽可能共享，否则只能通过特定手段获取子系统的认证。当上述问题都不是主要矛盾时，如果项目交付时间紧张，此方案才可能成为当下的最优解哦。

## 2. AI学习笔记
国内AI时代真正意义上的到来，是2025年1月deepseek突然在春节前后的爆火，当然这是我个人感受。   

### 基础概念  
市场上AI工具太多了，他们的API文档上也充斥着一些专有术语，现整理如下：  

**基础大类**
| 术语 | 含义 | 补充说明 |    
| ---- | ---- | ---- |    
| AI（Artificial Intelligence，人工智能） | 让机器模拟人类感知、思考、决策的技术总称| **机器学习是AI的子集，深度学习是机器学习的子集，大模型是深度学习的产物** |     
| ML（Machine Learning, 机器学习）| 让机器从数据中学习规律，输出预测 | 此处的机器不是硬件电脑本身，而是运行在电脑上的算法模型（神经网络/算法模型）；学习的本质是拿大量数据不断调整权重，让模型输出越来越接近真实结果|      
| DL（Deep Learning，深度学习） | 用多层神经网络做学习，层数越多越深 | |     
| LLM(Large Language Model，大语言模型)| 基于Transformer架构，以文本数据训练出来的大模型，擅长语言、逻辑、代码| 如：GPT、DeepSeek、Qwen、Claude |        
| 多模态模型| 不止文本，可以同时处理文字、图片、音频、视频 | 如：GPT-4o、DeepSeek-VL、Qwen-VL ｜      

**模型核心术语**  
| 术语 | 含义 | 补充说明 |   
| ---- | ---- | ---- |  
| Transformer | 几乎所有大模型的基础架构，核心是**注意力机制** | 注意力机制：模型阅读文本时，重点关注上下文相关词语，理解上下文关系 |  
| Token（令牌）| 大模型的“文字最小单位”，不是汉字/单词 | 一个汉字 ≈ 2 token，一个英文单词 ≈ 1-3 token。**上下文窗口、计费、速率全部按token计算** |  
| Context Window(上下文窗口) | 模型一次最多能处理的token总量，包含输入+输出 | 如：128K上下文，代表最多处理约9-10万汉字。**窗口越大，能读越长文档** |  
| Parameters（参数）| 模型中神经网络权重数量，单位B（十亿）| 7B = 70亿参数。参数并不等同于能力全部，还取决于数据和训练质量 |  
| MoE(Mixture-of-Experts，混合专家模型) | 稀疏模型，每次推理只激活部分专家模块，算力开销低。 | DeepSeek大量食用MoE，**优点：推理成本低；缺点：调度复杂** |   

**提示词类**  
| 术语 | 含义 | 补充说明 |  
| ---- | ---- | ---- |  
| Prompt(提示词) | 发给大模型的输入文本 |  |  
| CoT(Chain-of-Thought, 思维链) | 让模型一步步思考，先分析再给出答案 | |  
| RAG(Retrieval-Augmented Generation, 检索增强生成) | 提问时先检索文档知识库，把检索到的内容拼入prompt给模型 | 优点：不用微调，解决幻觉；缺点：依赖检索质量。是做私有知识库问答的主流方案 |  

**模型输出**  
| 术语 | 含义 | 补充说明 |  
| ---- | ---- | ---- |   
| Hallucination(幻觉) | 模型一本正经编造不存在事实、数据、引用 | 大模型通病 |  
| Alignment(对齐) | 让模型输出符合人类价值观、指令、安全要求 ｜ 基座没有对齐，会乱说话 |  
| Truncation(截断) | 输入太长超出上下文窗口，前面内容被截断丢弃 | |  
| Temperature(温度) | 生成参数 `0‑2`。**越高输出越随机、创造性强；越低回答越确定、重复** | 代码数学一般设 0.1‑0.7；创意写作 1.0 以上 |  

**上层应用/产品**
| 术语 | 含义 | 补充说明 |   
| ---- | ---- | ---- |  
| API | 程序调用模型接口，传入json获取回答，开发软件接入AI |  |  
| AIGC(AI-Generated Content, AI生成内容) | **人工智能自动生成各类内容的统称**，文本、代码、图片、音频、视频、工作方案都属于 AIGC | **层级关系：Transformer底层架构 → LLM大模型底座（DS、Claude） → AIGC能力（生成文本/代码） → Agent智能体（调用工具、自主执行） → 各类用户工具（CC、Coze、WorkBuddy）**|  
| Agent(智能体) | 能多步规划、调用工具、根据环境反馈持续迭代完成目标的系统 ｜ Agent 闭环公式：**规划 → 调用工具行动 → 获取结果反馈 → 再次思考，循环直到任务结束**｜  
| Harness(智能体运行脚手架 / 缰绳) ｜ 除了大模型本身之外，整套调度、执行、安全、上下文管理的工程运行层，全部属于 Harness | **很多时候 Agent 效果瓶颈不在模型，而在 Harness 设计**，换更强模型提升有限，优化 Harness 收益更大 |  
| Agent Loop(智能体循环) ｜Harness 最核心机制：思考→行动→观察反馈，一轮一轮迭代 | |  
| Sub‑Agent(子智能体) |大任务拆分成多个小 Agent 分工协作 | |   
| Context Compression(上下文压缩) | 上下文窗口快要塞满时，自动精简历史日志、合并摘要，避免截断丢失关键信息| |   
| Ollama | 本地一键跑开源大模型工具 | |  
| effort(推理投入档位) | 是模型原生参数：控制模型允许分配多少「思考 token 预算」，决定它思考多深、尝试多少方案、主动读多少文件、自检多少次。本质是**算力 / 思考时长开关**，不是改变模型权重，只是放开思考上限 | low：少想、少读文件、少验证，快、省钱；high：给比较充足的思考 token，多分支推演、跨文件阅读、自我检查；max/xhigh：预算拉到最大，适合大型架构重构、疑难 bug，但更慢、token 消耗暴涨 ｜   
| Routing(路由) |把请求分发到不同模型、工具、子 Agent、知识库的选择逻辑, 路由 = 根据输入特征，自动选择走哪一条处理分支 | 两种路由：LLM路由（智能路由）：由大模型做判断；Harness 硬路由（规则路由）：代码写死 if‑else，不用 LLM 思考。例如关键词匹配，检测到 “最新版本” 就强制走网页搜索|  


`Transformer架构→LLM基座(DeepSeek/Claude)→对齐→推理模型（effort）`  
↓  
`Harness（沙箱+ToolCall+AgentLoop+轨迹日志+护栏）`  
↓  
`Agent（Claude Code/WorkBuddy/Coze搭建的Bot）`  
↓  
产生 AIGC 内容 + 执行真实操作，不再只是单纯文字生成  

**Agent vs Harness**  

- **Agent = 完整的能自主完成任务的智能系统（成品）**
- **Harness = Agent 里面的运行脚手架、执行框架（骨架 / 基础设施）**

> 公式：**Agent = LLM 大脑 + Harness + 任务目标**

### 场景问题
1. 大模型的训练数据过时，怎么获取最新的信息?  
大模型所有内置知识都是静态固化的，有截止日期，本身没有自动联网和自主获取最新信息的能力。  
如果要具备上述能力，需要借助工具调用（Tool Call）实现。

```text
用户提问 → LLM判断是否需要检索
    ├─需要实时公网信息 →调用网页搜索工具
    ├─需要内部文档 →RAG向量库检索
    └─不需要，直接交给DS模型回答
返回结果给用户
```

2. 谁来判断是否需要获取最新信息？怎么判断是否需要调用工具？调用哪个工具？  
整个 “要不要调用、调用哪个” 的逻辑**写在 LLM 的 Prompt / 系统提示词里**，LLM出决策，Harness执行。  

Harness 在每一轮请求都会塞入一段固定**系统 Prompt（工具定义）**，内容一般包含：
1. 所有可用工具清单：名称、功能描述、入参 JSON Schema。示例：  
 - web_search：互联网实时检索，用于获取最新资料
 - read_file：读取本地代码文件
 - run_shell：执行终端命令
 - rag_query：查询内部知识库

2. 强制规则。示例：  
- 如果模型**知识过时、缺少信息**，不要编造，调用工具；
- 不要调用无关工具；
- 有足够信息时停止调用，直接生成最终答案；
- 输出格式严格为 JSON ToolCall，不能自由闲聊。

**工具选择本质是 LLM 根据系统提示词 + 当前上下文做的分类决策**

3. 怎么做到会话隔离？  
**会话隔离是状态隔离、数据隔离，属于 Harness 基础设施功能**  
- 每个用户 / 每一次对话是独立 Session，拥有独立上下文、独立轨迹 (trajectory)、独立缓存、独立临时变量。
- A 用户的对话历史、检索记录、临时文件，不能泄漏到 B 用户会话。
- Harness 负责维护会话隔离：为每个会话分配独立沙箱、独立上下文窗口、独立日志。

```mermind
flowchart LR
    User1["用户1会话（独立上下文/沙箱）"] --> Router["路由决策层"]
    User2["用户2会话（独立上下文/沙箱）"] --> Router
    
    Router -->|复杂推理| LLM_R1["DS‑R1大模型"]
    Router -->|内部资料|RAG["私有知识库"]
    Router -->|实时资讯|Search["网页搜索"]
    Router -->|简单问答|SmallModel["轻量模型"]

    LLM_R1 & RAG & Search & SmallModel --> Harness["Harness<br/>维护会话隔离、独立Trajectory、沙箱"]　
```

## 3. UI权限控制组件
**背景**：常规`v-permission`指令只能控制DOM显隐，无法阻止组件初始化（组件mounted中的接口调用会直接403）。   
**实现思路**：通过控制VNode渲染时机，在异步权限校验完成之前，被包裹的内容一律不渲染。  

### 实现源码
**组件逻辑**：  

```vue
<!-- permission.vue -->

<script>
import { isArray, isUndefined } from 'lodash';

export default {
  props: {
    /**
     * 需要验证的权限信息。单个权限可传 string/Object；多个权限传 Array。
     */
    value: {
      type: [String, Object, Array],
      default: undefined,
    },
    /**
     * 改变无权限默认不渲染的策略，将权限校验结果通过 scoped-slot 传递给内部组件，内部组件根据校验结果自定义展示策略。
     */
    passThrough: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      ready: false,
      result: null
    };
  },
  watch: {
    value: {
      immediate: true,
      async handler() {
        const result = await this.getPermissionInfo();
        this.result = result;
        this.ready = true;
        /**
         * 权限校验完成事件
         * @event settled
         * @param {unknown} result 权限校验结果
         */
        this.$emit('settled', result);
        this.$forceUpdate();
      }
    }
  },
  methods: {
    async getPermissionInfo() {
      let result = {};

      if (isArray(this.value)) { // 多个权限
        await Promise.all(this.value.map(async (item)=>{
          result[item.key] = await this.checkPermission(item.value);
        }));
      } else { // 单个权限
        result = await this.checkPermission(this.value);
      }

      return result;
    },

    checkPermission(permission) {
      return this._checkPermission ? this._checkPermission(permission) : this.$root._checkPermission(permission);
    }
  },
  render() {
    /**
     * @slot 权限组件的插槽（注意不能有多个 VNode）
     * @prop {Object} allowed 权限校验结果
     */
    const defaultSlot = this.$scopedSlots.default;

    if (!defaultSlot) {
      console.warn('<permission> 权限控制组件内必须存在 VNode!');
      return null;
    }

    if (!this.ready) {
      return null;
    }

    let children = null;

    if (isArray(this.value)) {
      children = defaultSlot(this.result);
    } else {
      children = defaultSlot({
        allowed: this.result
      });
    }
    if (isUndefined(children)) {
      console.warn('<permission> 权限控制组件内必须存在 VNode!');
      return null;
    } else if (children.length > 1) {
      console.error('<permission> 权限控制组件内不支持放置多个 VNode!');
      return null;
    } else if (this.passThrough) {
      return children;
    } else {
      return this.result ? children : null;
    }
  }
}
</script>
```

**插件注册**：  

```js
// index.js

import Permission from './permission.vue';

export {
  Permission
};

const plugin = {
  install(Vue, options = {}) {
    const { checkPermission } = options;
    if (!checkPermission || typeof checkPermission !== 'function') {
      throw new Error('[permission] 当前 plugin 依赖 checkPermission 方法，请在 Vue.use() 方法的第二个参数中传入。');
    }
    Vue.mixin({
      methods: {
        _checkPermission: checkPermission
      }
    });
    Vue.component('Permission', Permission);
  }
};

export default plugin;
```

### 业务侧使用
首先需要注册插件，提供`checkPermission`的实现。   
```js
import Vue from 'vue';
import Permission from '@xxx/permission';

Vue.use(Permission, {
  checkPermission(value) {
    // 权限检查逻辑（支持异步）
    return true;
  }
});
```

1. 单权限: 仅控制显隐  
```vue
<permission value="moduleA.write">
  <button>hello world</button>
</permission>
<span>ssss</span>
```

如果moduleA.write返回权限true，则页面渲染dom：
```html
<button>hello world</button>
<span>ssss</span>
```

如果moduleA.write返回权限true，则页面渲染dom：
```html
<span>ssss</span>
```

2. 多权限：仅控制显隐  
```vue
<template>
  <permission v-slot="{ canRead, canWrite }" :value="permissions">
    <div>
      <span :disabled="!canRead">Read</span>
      <span :disabled="!canWrite">Write</span>
      <span v-if="canRead && canWrite">高级操作</span>
    </div>
  </permission>
</template>
<script>
export default {
  data() {
    return {
      // 数组元素格式：key 是结果的取值键，value 是传给 checkPermission 的参数
      permissions: [
        { key: 'canRead',  value: 'moduleA.read' },
        { key: 'canWrite', value: 'moduleA.write' }
      ]
    };
  }
};
</script>
```

3. passThrough单权限  
```vue
<permission v-slot="{ allowed }" value="moduleA.read">
  <el-button :disabled="!allowed">ddd</el-button>
</permission>
```

4. passThrough多权限
```vue
<template>
  <permission v-slot="{ canRead, canWrite, canDelete }" :value="permissions">
    <div>
      <span :disabled="!canRead">Read</span>
      <span :disabled="!canWrite">Write</span>
      <span v-if="canDelete">高级操作</span>
    </div>
  </permission>
</template>

<script>
export default {
  data() {
    return {
      // 数组元素格式：key 是结果的取值键，value 是传给 checkPermission 的参数
      permissions: [
        { key: 'canRead',  value: 'moduleA.read' },
        { key: 'canWrite', value: 'moduleA.write' },
        { key: 'canDelete', value: 'moduleA.delete' }
      ]
    };
  }
};
</script>
```

