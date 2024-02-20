(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{573:function(s,a,t){s.exports=t.p+"assets/img/daily-006.b33750db.png"},574:function(s,a,t){s.exports=t.p+"assets/img/daily-007.5a8ca513.png"},734:function(s,a,t){"use strict";t.r(a);var n=t(3),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("blockquote",[n("p",[s._v("热爱生活，往心之所向那里去。")])]),s._v(" "),n("h2",{attrs:{id:"_1-console-dir"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-console-dir"}},[s._v("#")]),s._v(" 1. console.dir()")]),s._v(" "),n("p",[s._v("在控制台显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。\n"),n("img",{attrs:{src:t(573),alt:""}})]),s._v(" "),n("p",[n("img",{attrs:{src:t(574),alt:""}})]),s._v(" "),n("h2",{attrs:{id:"_2-es6中的tdz-暂时性死区"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-es6中的tdz-暂时性死区"}},[s._v("#")]),s._v(" 2. ES6中的TDZ（暂时性死区）")]),s._v(" "),n("ul",[n("li",[n("p",[s._v("TDZ(Temporal Dead Zone, 暂时性死区)是ES6（ES2015）中对作用域新的专用语义。")])]),s._v(" "),n("li",[n("p",[s._v("ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，就会形成封闭作用域。"),n("font",{attrs:{color:"#ff0000"}},[s._v("凡是在声明之前就使用这些变量，就会报错。")])],1)])]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在代码块内，使用let/const命令声明变量之前，该变量都是不可用的。")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// console语句无法获取a的值，因为if语句内是一个块级作用域，从该作用域顶部开始到使用let声明a之前，a都不可用。")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Uncaught ReferenceError: Cannot access 'a' before initialization")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   \n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 此时可以获取a的值，a在上级块作用域中")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1 ")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 使用let声明的a作用域与在if块内使用var声明的a作用域一致。let/const不允许在相同作用域内重复声明同一个变量。")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Uncaught SyntaxError: Identifier 'a' has already been declared")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 使用var声明的a在if作用域内也生效。let/const不允许在相同作用域内重复声明同一个变量。")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Uncaught SyntaxError: Identifier 'a' has already been declared")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br")])]),n("h2",{attrs:{id:"_3-队头阻塞问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-队头阻塞问题"}},[s._v("#")]),s._v(" 3. 队头阻塞问题")]),s._v(" "),n("ol",[n("li",[n("p",[n("strong",[n("font",{attrs:{color:"#0000dd"}},[s._v("什么是队头阻塞（Head-of-Line blocking, HOL blocking）")])],1),n("br"),s._v("\n队头阻塞是一个专有名词，这个问题产生的根本原因是使用了"),n("strong",[s._v("队列")]),s._v("这种数据结构，在计算机网络得到范畴中是一种性能受限的现象。"),n("br"),s._v("\n队列这种数据结构遵循FIFO（first-in-first-out，先进先出）原则，就好比超市排队付款的时候，第一个人手机支付有问题或没带现金，会导致整个队伍阻塞很久。"),n("br"),s._v("\n因此，我们可以这样理解队头阻塞：在队头（Head）发生的问题会阻塞（block）整个队伍（line）。")])]),s._v(" "),n("li",[n("p",[s._v("HTTP中的队头阻塞问题")])])]),s._v(" "),n("ul",[n("li",[s._v("队头阻塞在计算机网络的范畴中表现为一种性能受限的现象。原因是某一列的第一个数据包（or队头）受阻导致整列数据包受阻。")])]),s._v(" "),n("p",[n("strong",[s._v("HTTP/1.1的队头阻塞")]),n("br"),s._v("\n队头阻塞的原因：HTTP/1.1协议的一个基本限制就是一个HTTP链接必须完整的传输完资源块后，才能继续发送新的资源块（本质原因是：资源块之间不使用分隔符）。如果前面的数据量很大或传输缓慢，就会导致新的资源块迟迟无法返回，也就是队头阻塞的情况。"),n("br"),s._v("\n一个缓解的办法：每个页面加载多个并行的TCP连接（通常为6个），每个响应数据分布在各自的连接上，那么除非响应数超过6个，否则不会出现队头阻塞。"),n("br"),s._v("\n弊端：虽然开启多个并行TCP连接能够解决大部分队头阻塞的问题，但是每个TCP连接建立的代价是很昂贵的（服务器状态、内存；TLS加密计算；HTTPS连接时间）。")]),s._v(" "),n("p",[n("strong",[s._v("HTTP/2的队头阻塞")]),s._v("\n基于HTTP/1.1的改进：单个TCP连接，正确复用资源块（HTTP/2可以在资源块前添加帧，用于标志资源块属于哪个资源，在哪里结束，从哪里开始等信息）。")]),s._v(" "),n("p",[s._v("队头阻塞的原因：HTTP/2只解决了HTTP级别的队头阻塞（也称为“应用层”队头阻塞），然而位于传输层的TCP队头阻塞问题依然存在。TCP只负责"),n("font",{attrs:{color:"#0000dd"}},[s._v("按顺序")]),s._v("传输数据包（将数据包从一个计算机传输到另一个计算机），无法分辨上层HTTP。比如当前TCP需要传输package1, package2, package3三个数据包，假设package2在网络中被丢失了，当package1倍正确传输到浏览器后，TCP发现package1与package3之间存在间隙，则会保持等待状态，知道package2重传副本后，再继续按照package2、package3的顺序将剩余的两个数据包传递给浏览器。也就是说："),n("strong",[s._v("被丢失的package2阻塞了package3的传输。即：TCP层的队头阻塞（由于丢失或延迟的数据包）也会导致HTTP队头阻塞。")])],1),s._v(" "),n("p",[n("strong",[s._v("HTTP/3（QUIC）的队头阻塞")]),s._v("\n基于HTTP/2的改进：HTTP/2的队头阻塞原因是传输层TCP无法分辨不同的流，那么HTTP/3则是实现一个新的传输层QUIC，让传输层能够分辨不同的流。"),n("br"),s._v("\n队头阻塞的原因：QUIC在单个资源流中依然保留排序。即：如果单个流中有一个字节间隙，那么流的后面部分依然会被阻塞，直到这个间隙被填满。"),n("br"),s._v("\n消除队头阻塞？ 事实上，对于HTTP/3(QUIC)来说，消除队头阻塞实际上对web性能并没有太大帮助。")]),s._v(" "),n("blockquote",[n("p",[s._v("本段内容参考了这篇文章："),n("a",{attrs:{href:"https://github.com/rmarx/holblocking-blogpost/blob/master/README_CN.md",target:"_blank",rel:"noopener noreferrer"}},[s._v("QUIC 和 HTTP/3 队头阻塞的细节"),n("OutboundLink")],1)])]),s._v(" "),n("h2",{attrs:{id:"_4-void-0-vs-undefined"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-void-0-vs-undefined"}},[s._v("#")]),s._v(" 4. void 0 VS undefined")]),s._v(" "),n("p",[s._v("最近在学习工具库的代码，发现了一些对我来说不太常规的码，形如：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 初始化某个变量取值为undefined")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" someVariable "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 判断val是否为undefined")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("isUndefined")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("val")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" val "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在函数传参时，可以使用void 0避免JavaScript引擎将undefined解释成一个变量")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("p",[n("strong",[n("font",{attrs:{color:"#0000dd"}},[s._v("void运算符：对给定的表达式进行求值，然后返回undefined。")])],1),s._v(", 也就是说，void后边不管跟上啥表达式，只要表达式合法，返回的都是undefined。")]),s._v(" "),n("p",[s._v("既然void 0 本身就返回的是undefined，为嘛不直接用undefined，而是中间绕这么一圈？"),n("br"),s._v("\n原因是undefined并不是保留词（不能用作变量名或函数名），而是JavaScript内置的一个属性（全局作用域的一个变量，且初始值是原始数据类型undefined），在旧版本的IE中能够被重写，如：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("undefined")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'just for try'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("undefined")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// chrome及大部分浏览器返回：undefined")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// IE 8 返回：just for try")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("p",[s._v("自ECMAscript5标准以来，undefined是一个不能被配置和重写的属性（参考"),n("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",target:"_blank",rel:"noopener noreferrer"}},[s._v("Object.defineProperty中的属性描述符"),n("OutboundLink")],1),s._v("），即：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  writable"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 不能被赋值运算符改变")]),s._v("\n  enumerable"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 不会出现在对象的枚举属性中")]),s._v("\n  configurable"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// undefined属性描述符不能被改变，且不能从对象上删除undefined属性")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("因为undefined有被重写的风险，所以使用了不会被重写的void 0."),n("br"),s._v("\n为嘛用void 0，而不是void 'abc',void []呢？"),n("br"),s._v("\n因为void 0写起来更简便，能节省字节大小。在许多JavaScript压缩工具中，还会用void 0去代替代码中的undefined。")]),s._v(" "),n("blockquote",[n("p",[s._v("当函数返回值不会被使用的时候，应该使用void运算符，确保返回undefined。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);