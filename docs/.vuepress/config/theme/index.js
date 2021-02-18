const nav = require('../nav/index.js');
const sidebar = require('../sidebar/index.js');
const themeReco = require('./themeReco.js');

module.exports = Object.assign({}, themeReco, {
  nav,
  sidebar,
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
  // 不显示404公益广告
  noFoundPageByTencent: false
})