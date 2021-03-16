import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '_@/store'
import wsCache from '@/cache'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (wsCache.get(store.getters.userInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.isAddRouters) {
        next()
        return
      }
      store.dispatch('GenerateRoutes').then(() => {
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      })
      const redirectPath = (from.query.redirect || to.path)
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      store.dispatch('SetIsAddRouters', true)
      next(nextData)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to, from) => {
  document.title = getPageTitle(to.meta.title, store.getters.title)
  NProgress.done() // 结束Progress
})
