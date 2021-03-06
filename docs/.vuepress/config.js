const themeConfig = require('./config/theme/index.js');

module.exports = {
  base: '/',
  title: 'Day Day Up',
  description: '最好的时候，就是当下。',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  dest: 'docs/.vuepress/dist',
  theme: 'reco',
  themeConfig,
  codeTheme: 'coy',
  markdown: {
    lineNumbers: true
  },
  plugins: [
    'flowchart',
    '@vuepress-reco/vuepress-plugin-loading-page',
    // 点击图片放大
    [
      '@vuepress/plugin-medium-zoom', {
        selector: '.page img', // 页面元素选择器。页面的class为page，所有图片资源标签为img
        delay: 1000,
        options: {
          margin: 24,
          background: 'rgba(25, 18, 25, 0.9)',
          scrollOffset: 40
        }
      }
    ],
    // 看板娘
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ["haruto"],
        clean: true,
        modelStyle: {
          position: "fixed",
          right: "0px",
          bottom: "0px",
          opacity: "0.9",
          zIndex: 99999
        }
      }
    ],
    // 鼠标点击特效
    [
      "cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: ['circle'],  // shape of the particle, default: 'star'， 可选'circle'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    // 动态标题
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)哈喽～",
        hideIcon: "/failure.ico",
        hideText: "(●—●)快快回来！",
        recoverTime: 2000
      }
    ],
  ]
}