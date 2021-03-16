const app = {
  state: {
    collapsed: false, // 菜单栏是否栏缩收
    showLogo: true, // 是否显示logo
    showTags: true, // 是否显示标签栏
    showNavbar: true, // 是否显示navbar
    fixedHeader: true, // 是否固定header
    layout: 'Top', // layout布局
    showBreadcrumb: true, // 是否显示面包屑
    showHamburger: true, // 是否显示侧边栏缩收按钮
    showScreenfull: true, // 是否全屏按钮
    showUserInfo: true, // 是否显示用户头像
    title: 'vue-element-admin', // 标题
    logoTitle: 'vue-ele-admin', // logo标题
    userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
    greyMode: false, // 是否开始灰色模式，用于特殊悼念日
    showBackTop: true // 是否显示回到顶部
  },
  mutations: {
    SET_COLLAPSED: (state, collapsed) => {
      state.collapsed = collapsed
    },
    SET_SHOWLOGO: (state, showLogo) => {
      state.showLogo = showLogo
    },
    SET_SHOWTAGS: (state, showTags) => {
      state.showTags = showTags
    },
    SET_NAVBAR: (state, showNavbar) => {
      state.showNavbar = showNavbar
    },
    SET_FIXEDHEADER: (state, fixedHeader) => {
      state.fixedHeader = fixedHeader
    },
    SET_LAYOUT: (state, layout) => {
      state.layout = layout
    },
    SET_BREADCRUMB: (state, showBreadcrumb) => {
      state.showBreadcrumb = showBreadcrumb
    },
    SET_HAMBURGER: (state, showHamburger) => {
      state.showHamburger = showHamburger
    },
    SET_SCREENFULL: (state, showScreenfull) => {
      state.showScreenfull = showScreenfull
    },
    SET_USERINFO: (state, showUserInfo) => {
      state.showUserInfo = showUserInfo
    },
    SET_TITLE: (state, title) => {
      state.title = title
    },
    SET_LOGOTITLE: (state, logoTitle) => {
      state.logoTitle = logoTitle
    },
    SET_GREYMODE: (state, greyMode) => {
      state.greyMode = greyMode
    },
    SET_SHOWBACKTOP: (state, showBackTop) => {
      state.showBackTop = showBackTop
    }
  },
  actions: {
    SetCollapsed({ commit }, collapsed) {
      commit('SET_COLLAPSED', collapsed)
    },
    SetShowLogo({ commit }, showLogo) {
      commit('SET_SHOWLOGO', showLogo)
    },
    SetShowTags({ commit }, showTags) {
      commit('SET_SHOWTAGS', showTags)
    },
    SetShowNavbar({ commit }, showNavbar) {
      commit('SET_NAVBAR', showNavbar)
    },
    SetFixedHeader({ commit }, fixedHeader) {
      commit('SET_FIXEDHEADER', fixedHeader)
    },
    SetLayout({ commit }, layout) {
      commit('SET_LAYOUT', layout)
    },
    SetBreadcrumb({ commit }, showBreadcrumb) {
      commit('SET_BREADCRUMB', showBreadcrumb)
    },
    SetHamburger({ commit }, showHamburger) {
      commit('SET_HAMBURGER', showHamburger)
    },
    SetScreenfull({ commit }, showScreenfull) {
      commit('SET_SCREENFULL', showScreenfull)
    },
    SetUserInfo({ commit }, showUserInfo) {
      commit('SET_USERINFO', showUserInfo)
    },
    SetTitle({ commit }, title) {
      commit('SET_TITLE', title)
    },
    SetLogoTitle({ commit }, logoTitle) {
      commit('SET_LOGOTITLE', logoTitle)
    },
    SetGreyMode({ commit }, greyMode) {
      commit('SET_GREYMODE', greyMode)
    },
    SetShowBackTop({ commit }, showBackTop) {
      commit('SET_SHOWBACKTOP', showBackTop)
    }
  }
}

export default app
