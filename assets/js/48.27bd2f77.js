(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{646:function(_,v,t){"use strict";t.r(v);var r=t(3),s=Object(r.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h2",{attrs:{id:"数据结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据结构"}},[_._v("#")]),_._v(" 数据结构")]),_._v(" "),t("p",[_._v("数据结构从逻辑上分为线性结构和非线性结构。一般而言，有前驱和后继的就是线性结构。")]),_._v(" "),t("h2",{attrs:{id:"线性结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#线性结构"}},[_._v("#")]),_._v(" 线性结构")]),_._v(" "),t("p",[_._v("数据结构中线性结构指的是数据元素之间存在着“一对一”的线性关系，线性结构的特征：")]),_._v(" "),t("ul",[t("li",[_._v("集合中必存在唯一的一个“第一个元素”")]),_._v(" "),t("li",[_._v("集合中必存在唯一的一个“最后的元素”")]),_._v(" "),t("li",[_._v("除最后元素之外，其它数据元素均有唯一的“后继”")]),_._v(" "),t("li",[_._v("除第一元素之外，其它数据元素均有唯一的“前驱”")])]),_._v(" "),t("h3",{attrs:{id:"_1-数组-array"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-数组-array"}},[_._v("#")]),_._v(" 1. 数组（Array）")]),_._v(" "),t("ul",[t("li",[_._v("数组在JavaScript中是一种特殊的对象。")]),_._v(" "),t("li",[_._v("数组是一个有序的数据集合，可以通过数组名称和索引访问对应序列上的数据。")]),_._v(" "),t("li",[_._v("数组的长度可变，元素类型也可以不同。")])]),_._v(" "),t("h3",{attrs:{id:"_2-队列-queue"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-队列-queue"}},[_._v("#")]),_._v(" 2. 队列（Queue）")]),_._v(" "),t("ul",[t("li",[_._v("队列遵循FIFO（first-in-first-out，先进先出）原则。")]),_._v(" "),t("li",[_._v("队列只允许在前端（front，队头）进行删除操作，在后端（rear，队尾）进行插入操作。")]),_._v(" "),t("li",[_._v("在队列中插入一个队列元素称为"),t("strong",[_._v("入队")]),_._v("，在队列中删除一个队列元素称为"),t("strong",[_._v("出队")]),_._v("。")])]),_._v(" "),t("h3",{attrs:{id:"_3-链表-linked-list"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-链表-linked-list"}},[_._v("#")]),_._v(" 3. 链表（Linked List）")]),_._v(" "),t("ul",[t("li",[_._v("链表是一种线性表，但链表中的元素并不会按照线性的顺序连续存储，而是通过指针将零散的内存块串联起来。")]),_._v(" "),t("li",[_._v("链表中的每个元素都由一个存储本身的节点和一个指向下一个元素的指针组成。")]),_._v(" "),t("li",[_._v("链表的存储特性决定了其不支持随机访问，只能从头开始遍历直到找到目标元素O(n)。")]),_._v(" "),t("li",[_._v("链表的存储特性同样决定了插入和删除的高效性，只需要修改相邻节点的指针即可O(1)。")])]),_._v(" "),t("h3",{attrs:{id:"_4-栈-stack"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-栈-stack"}},[_._v("#")]),_._v(" 4. 栈（Stack）")]),_._v(" "),t("ul",[t("li",[_._v("栈遵循LIFO（last-in-first-out，后进先出）原则。")]),_._v(" "),t("li",[_._v("栈是一种运算受限的线性表，只能在栈顶进行插入和删除操作。")]),_._v(" "),t("li",[_._v("插入和删除的元素保存在栈的末尾，被称为"),t("strong",[_._v("栈顶")]),_._v("，另一端叫做"),t("strong",[_._v("栈底")]),_._v("。")])]),_._v(" "),t("h2",{attrs:{id:"非线性结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#非线性结构"}},[_._v("#")]),_._v(" 非线性结构")]),_._v(" "),t("p",[_._v("非线性结构的逻辑特征是一个节点元素可能有多个之间前驱和多个直接后继。")]),_._v(" "),t("h3",{attrs:{id:"_1-树-tree"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-树-tree"}},[_._v("#")]),_._v(" 1. 树（tree）")]),_._v(" "),t("p",[_._v("树是由n(n>0)个有限节点（node）组成一个具有层次关系的集合。树有多个节点，用以储存元素；某些节点之间存在一定的关系，用连线表示，连线成为边（edge）；边的上端节点称为父节点（parent），下端称为子节点（children）。具备以下特点：")]),_._v(" "),t("ul",[t("li",[_._v("每个节点都只有有限个子节点或无子节点")]),_._v(" "),t("li",[_._v("没有父节点的节点称为根节点（root）")]),_._v(" "),t("li",[_._v("每一个非根节点有且只有一个父节点")]),_._v(" "),t("li",[_._v("除了根节点外，每个子节点可以分为多个不相交的子树（subtree）")]),_._v(" "),t("li",[_._v("树里面没有环路（cycle）")])]),_._v(" "),t("p",[_._v("一些术语：")]),_._v(" "),t("ol",[t("li",[t("strong",[_._v("节点的度")]),_._v("：一个节点含有的子树的个数")]),_._v(" "),t("li",[t("strong",[_._v("树的度")]),_._v("：一棵树中，最大的节点度")]),_._v(" "),t("li",[t("strong",[_._v("叶节点/终端节点")]),_._v("：度为零的节点")]),_._v(" "),t("li",[t("strong",[_._v("非终端节点/分支节点")]),_._v("：度不为零的节点")]),_._v(" "),t("li",[t("strong",[_._v("父亲节点/父节点")]),_._v("：若一个节点含有子节点，则这个节点称为其子节点的父节点")]),_._v(" "),t("li",[t("strong",[_._v("孩子节点/子节点")]),_._v("：一个节点含有的子树的根节点称为该节点的子节点")]),_._v(" "),t("li",[t("strong",[_._v("兄弟节点")]),_._v("：具有相同父节点的节点")]),_._v(" "),t("li",[t("strong",[_._v("节点的层次")]),_._v("：根为第1层，根的子节点为第2层，以此类推")]),_._v(" "),t("li",[t("strong",[_._v("深度")]),_._v("：对于任意节点n，n的深度为从根到n的唯一路径长（自顶向下）")]),_._v(" "),t("li",[t("strong",[_._v("高度")]),_._v("：对于任意节点n，n的高度从叶子节点到n的唯一路径长（自底向上）")]),_._v(" "),t("li",[t("strong",[_._v("堂兄弟节点")]),_._v("：父节点在同一层的节点互为堂兄弟")]),_._v(" "),t("li",[t("strong",[_._v("节点的祖先")]),_._v("：从根节点到该节点所经分支上的所有节点")]),_._v(" "),t("li",[t("strong",[_._v("子孙")]),_._v("：以某节点为根的子树中任一节点都称为该节点的子孙")]),_._v(" "),t("li",[t("strong",[_._v("森林")]),_._v("：由m(m>=0)棵互不相交的树的集合称为森林")])]),_._v(" "),t("h3",{attrs:{id:"_2-图-graph"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-图-graph"}},[_._v("#")]),_._v(" 2. 图 (graph)")]),_._v(" "),t("p",[_._v("图通常用来表示和存储具有“多对多”关系的数据。在计算机科学中，一个图就是一些顶点（vertex）的集合，这些顶点通过一系列边（edge）连接，顶点用圆圈表示，边就是这些圆圈之间的连线。")]),_._v(" "),t("ul",[t("li",[_._v("图是由顶点的有穷非空集合和顶点之间边的集合组成")]),_._v(" "),t("li",[_._v("在图中，顶点个数不能为零，但可以没有边")])]),_._v(" "),t("p",[_._v("一些术语：")]),_._v(" "),t("ol",[t("li",[t("strong",[_._v("顶点")]),_._v("：图中的数据元素。")]),_._v(" "),t("li",[t("strong",[_._v("边")]),_._v("：顶点之间的逻辑关系用边来表示，边集可以是空的。")]),_._v(" "),t("li",[t("strong",[_._v("有向边/弧（Arc）")]),_._v("：若从顶点v(i)到顶点v(j)有方向，则称这条边为有向边，表示为<v(i), v(j)>。也称为弧，起点是弧尾，终点是弧头。")]),_._v(" "),t("li",[t("strong",[_._v("无向边")]),_._v("：若顶点之间的边没有方向，则称这条边为无向边，表示为(v(i), v(j))。")]),_._v(" "),t("li",[t("strong",[_._v("有向图")]),_._v("：图中任意两个顶点之间的边都是有向边。")]),_._v(" "),t("li",[t("strong",[_._v("无向图")]),_._v("：图中任意两个顶点之间的边都是无向边。")]),_._v(" "),t("li",[t("strong",[_._v("简单图")]),_._v("：在图中，若不存在顶点到其自身的边，且同一条边不同时出现。")]),_._v(" "),t("li",[t("strong",[_._v("完全图")]),_._v("：任意两个点都有一条边相连。")]),_._v(" "),t("li",[t("strong",[_._v("稀疏图")]),_._v("：有很少边或弧的图（e < nlogn），其中n是顶点数")]),_._v(" "),t("li",[t("strong",[_._v("稠密图")]),_._v("：有较多边或弧的图。")]),_._v(" "),t("li",[t("strong",[_._v("网")]),_._v("：边/弧带权的图。")]),_._v(" "),t("li",[t("strong",[_._v("权")]),_._v("：图中边或弧所有的相关数。")])])])}),[],!1,null,null,null);v.default=s.exports}}]);