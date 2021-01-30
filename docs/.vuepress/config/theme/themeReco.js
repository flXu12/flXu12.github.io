module.exports = {
  type: 'blog',
  fullscreen: true,
  mode: 'light',
  authorAvatar: '/logo.png',  // 头像
  logo: '/logo.png',  // 导航栏左侧logo
  // 博客设置
  blogConfig: {
    category: {
      location: 2,     // 在导航栏菜单中所占的位置，默认2
      text: '分类' // 默认文案 “分类”
    },
    tag: {
      location: 3,     // 在导航栏菜单中所占的位置，默认3
      text: '标签'      // 默认文案 “标签”
    }
  },
  markdown: {
    lineNumbers: true,  // 代码显示行号
  },
  lastUpdated: 'Last Updated',  // 最后更新时间
  author: 'flXu',
  // record: 'xxxx',  // 备案号
  startYear: '2021',  // 项目开始时间
  search: true,
  searchMaxSuggestions: 10
}