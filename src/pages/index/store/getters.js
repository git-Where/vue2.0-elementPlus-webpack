const getters = {
  // app
  collapsed: state => state.app.collapsed,
  showLogo: state => state.app.showLogo,
  showTags: state => state.app.showTags,
  showNavbar: state => state.app.showNavbar,
  fixedHeader: state => state.app.fixedHeader,
  layout: state => state.app.layout,
  showBreadcrumb: state => state.app.showBreadcrumb,
  showHamburger: state => state.app.showHamburger,
  showScreenfull: state => state.app.showScreenfull,
  showUserInfo: state => state.app.showUserInfo,
  title: state => state.app.title,
  logoTitle: state => state.app.logoTitle,
  userInfo: state => state.app.userInfo,
  greyMode: state => state.app.greyMode,
  showBackTop: state => state.app.showBackTop,

  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  // permission
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  isAddRouters: state => state.permission.isAddRouters
}
export default getters
