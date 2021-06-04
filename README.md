# 介绍

```
main基于多页开发模板
single-page基于单页开发模板
devTemplate基于开发基础模板
```

[vue-element-admin 2.0](http://192.168.169.57:9000/scm/git/hzt-webdocs.git)是一个基于[vue2.x](https://github.com/vuejs/vue)、[vue-cli4.x](https://github.com/vuejs/vue-cli)、[element-ui](https://github.com/ElemeFE/element)的后台解决方案，借鉴了[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)和[iview-admin](https://github.com/iview/iview-admin)的写法和优点。内置了动态路由，权限验证，典型的业务模型，丰富的功能组件，并且提供了多页配置，开箱即用，可以用来作为项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。

::: tip 建议
本项目的定位是后台集成方案，不太适合当基础模板来进行二次开发。因为本项目集成了很多你可能用不到的功能，会造成不少的代码冗余。如果你的项目不关注这方面的问题，也可以直接基于它进行二次开发。目前还没有精简版推出，所以在实际开发中，可根据实际情况进行代码删减，以便保证代码的简洁性。后续也会找个时间推出精简版，便于二次开发。
:::

## 功能

``` sh
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置

- 多环境

- 多页配置

- 全局功能
  - 三种不同风格 layout 布局
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 功能组件
  - 图表
  - 图片预览
  - 消息提示
  - 查询
  - 富文本编辑器
  - markdown编辑器
  - 弹窗
  - 显示更多
  - 详情组件
  - 下拉树形
  - 图片裁剪
  - 二维码组件
  - 头像组
  - 文字高亮

- 表格
  - 基础表格
  - 分页表格
  - 带斑马纹表格
  - 带边框表格
  - 带状态表格
  - 固定表头
  - 固定列
  - 固定列和表头
  - 流体高度
  - 多级表头
  - 单选
  - 多选
  - 排序
  - 筛选
  - 展开行
  - 树形数据与懒加载
  - 自定义表头
  - 表尾合计行
  - 合并行或列
  - 自定义索引

- UI组件
  - 水波纹
  - 涟漪
  - 流光

- 多级菜单缓存

- 综合实例
  - 列表综合实例-弹窗
  - 列表综合实例-页面

- 权限管理
  - 用户管理
  - 角色管理

- 其他
  - 按需引入JS
```

## 前序准备

你需要在本地安装[node](https://nodejs.org/en/)和[git](https://git-scm.com/)。本项目技术栈基于[ES2015+](https://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh/guide/)、[vue-router](https://router.vuejs.org/zh/)、[vue-cli](https://github.com/vuejs/vue-cli)、[axios](https://github.com/axios/axios)和[element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

::: warning 注意
本项目不支持低版本浏览器(如 ie)，有需求请自行添加polyfill
:::

## 目录结构

``` sh
.
├── mock # 模拟数据
├── public # 静态资源
├── src # 项目代码
│   ├── assets # 静态资源
│   ├── cache # web-storage-cache配置
│   ├── components # 组件
│   ├── directive # 指令
│   ├── libs  # 按需引入element-ui
│   ├── mixins # 混入选项
│   ├── pages # 多页
│   │   └── index # index多页
│   │   │   ├── api # 全局api
│   │   │   ├── axios-config # axios配置
│   │   │   ├── layout # layout布局
│   │   │   ├── router # 路由配置
│   │   │   ├── store # 状态管理
│   │   │   ├── views # index多页 views 所有页面
│   │   │   ├── App.vue # 入口页面
│   │   │   ├── main.js # 入口文件 加载组件 初始化等
│   │   │   └── permission.js # 权限管理
│   ├── styles # 样式
│   └── utils # 工具类
├── tests # 测试
├── .env.xxx # 环境变量配置
├── .eslintrc.js # eslint 配置项
├── babel.config # babel配置文件
├── pages.config # 多页配置文件
├── postcss.config.js # postcss配置文件
├── package.json # package.json
├── vue.config # vue-cli 配置
└── yarn.lock
```

## 浏览器支持

现代浏览器和Internet Explorer 10+。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |