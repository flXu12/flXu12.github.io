(window.webpackJsonp=window.webpackJsonp||[]).push([[115],{737:function(t,s,a){"use strict";a.r(s);var n=a(3),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("blockquote",[a("p",[t._v("新年快乐。")])]),t._v(" "),a("h2",{attrs:{id:"_1-parseint-1-0-19-输出了啥"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-parseint-1-0-19-输出了啥"}},[t._v("#")]),t._v(" 1. parseInt(1/0, 19)输出了啥")]),t._v(" "),a("blockquote",[a("p",[t._v("来源于《你不知道的JavaScript（中）》——强制类型转换")])]),t._v(" "),a("p",[t._v("答案是18。"),a("br"),t._v("\n来看看parseInt的定义："),a("br"),t._v(" "),a("code",[t._v("parseInt(string, radix)")]),t._v("解析一个字符串并返回指定基数的十进制整数，radix是2-36之间的证书，表示被解析字符串的基数。"),a("br"),t._v("\n分析步骤：")]),t._v(" "),a("ol",[a("li",[t._v("parseInt接受的第一个参数是string类型，所以需要把"),a("code",[t._v("1/0")]),t._v("转换成字符串："),a("code",[t._v("1/0 ==> Infinity ==> 'Infinity'")]),t._v("，所以实际执行的是"),a("code",[t._v("parseInt('Infinity', 19)")]),t._v(";")]),t._v(" "),a("li",[t._v("parseInt接受的第二个参数是基数19，对应的有效数字范围是0-9和a-i;")]),t._v(" "),a("li",[t._v("'Infinity'第一个字符'I'以19为基数时值为18，第二个字符'n'不是一个有效的数字字符，因此解析到此为止。")])]),t._v(" "),a("h2",{attrs:{id:"_2-vs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-vs"}},[t._v("#")]),t._v(" 2. "),a("code",[t._v("[] + {}")]),t._v(" VS "),a("code",[t._v("{} + []")])]),t._v(" "),a("p",[t._v("在控制台分别输入:")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("上述表达式分别输出了"),a("code",[t._v('"[object Object]"')]),t._v(" 和 "),a("code",[t._v("0")]),t._v("。涉及强制类型转换哦。"),a("br"),t._v("\n首先看第一行表达式，"),a("code",[t._v("+ {}")]),t._v("会被当做一个值来处理，强制类型转换为"),a("code",[t._v('"[object Object]"')]),t._v("，同样的"),a("code",[t._v("[]")]),t._v("会被强制类型转换为"),a("code",[t._v('""')]),t._v("，因此第一行表达式会输出"),a("code",[t._v('"[object Object]"')]),t._v("；"),a("br"),t._v("\n在第二行表达式中，"),a("code",[t._v("+ []")]),t._v("会被当做一个值来处理，强制类型转换为数字0，然而与第一行不同的是，"),a("code",[t._v("{}")]),t._v("会被当做一个代码块执行，由于代码块为空，因此不会执行任何操作，故第二行表达式会输出"),a("code",[t._v("0")]),t._v("。")])])}),[],!1,null,null,null);s.default=e.exports}}]);