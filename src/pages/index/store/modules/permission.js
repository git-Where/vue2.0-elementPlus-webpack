import { asyncRouterMap, constantRouterMap } from '_@/router'
import { deepClone } from '@/utils'
import path from 'path'
import wsCache from '@/cache'
import store from '_@/store'
import { isExternal } from '@/utils/validate'
/* Layout */
import Layout from '_@/layout'
import ParentView from '_c/ParentView'

const permission = {
  state: {
    routers: [],
    addRouters: [],
    menuTabRouters: [],
    activeTab: '',
    isAddRouters: false
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // 过滤路由，多级变为二级，如不需要动态路由，把下面一行的routers换成asyncRouterMap
      const flatRoutes = getFlatRoutes(deepClone(routers, ['component']))
      // 动态路由，404一定要放到最后面
      state.addRouters = flatRoutes.concat([{
        path: '*',
        redirect: '/404',
        hidden: true
      }])
      // 渲染菜单的所有路由
      state.routers = deepClone(constantRouterMap, ['component']).concat(routers)
    },
    SET_ISADDROUTERS: (state, isAddRouters) => {
      state.isAddRouters = isAddRouters
    },
    SET_MENUTABROUTERS: (state, menuTabRouters) => {
      state.menuTabRouters = menuTabRouters
    },
    SET_ACTIVETAB: (state, activeTab) => {
      state.activeTab = activeTab
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 路由权限控制
        let routerMap = []
        if (wsCache.get(store.getters.userInfo).roleName === 'admin') {
          // 模拟前端控制权限
          routerMap = generateRoutes(deepClone(asyncRouterMap, ['component']))
        } else {
          // 模拟后端控制权限
          routerMap = getFilterRoutes(wsCache.get(store.getters.userInfo).checkedNodes)
        }
        commit('SET_ROUTERS', routerMap)
        resolve()
      })
    },
    SetIsAddRouters({ commit }, isAddRouters) {
      commit('SET_ISADDROUTERS', isAddRouters)
    },
    SetMenuTabRouters({ commit }, menuTabRouters) {
      commit('SET_MENUTABROUTERS', menuTabRouters)
    },
    SetAcitveTab({ commit }, activeTab) {
      commit('SET_ACTIVETAB', activeTab)
    }
  }
}

// 二级以上的菜单降级成二级菜单
function formatRouter(routes, basePath = '/', list = [], parent) {
  routes.map(item => {
    item.path = path.resolve(basePath, item.path)
    const meta = item.meta || {}
    if (!meta.parent && parent) {
      meta.parent = parent.path
      item.meta = meta
    }
    if (item.redirect && item.redirect !== 'noredirect') {
      item.redirect = path.resolve(basePath, item.redirect)
    }
    if (item.children && item.children.length > 0) {
      const arr = formatRouter(item.children, item.path, list, item)
      delete item.children
      list.concat(arr)
    }
    list.push(item)
  })
  return list
}

// 菜单降级
function getFlatRoutes(routes) {
  return routes.map((child) => {
    if (child.children && child.children.length > 0) {
      child.children = formatRouter(child.children, child.path, [], child)
    }
    return child
  })
}

// 路由过滤，主要用于权限控制
function generateRoutes(routes, basePath = '/') {
  const res = []

  for (const route of routes) {
    // skip some route
    if (route.hidden && route.meta.hidden && !route.meta.showMainRoute) {
      continue
    }

    let onlyOneChild = null

    if (route.children && route.children.length === 1 && !route.alwaysShow) {
      onlyOneChild = isExternal(route.children[0].path)
        ? route.children[0].path
        : path.resolve(path.resolve(basePath, route.path), route.children[0].path)
    }

    let data = null

    // 如不需要路由权限，可注释以下逻辑
    // 权限过滤，通过获取登录信息里面的角色权限，动态的渲染菜单。
    const list = wsCache.get(store.getters.userInfo).checkedNodes
    // 开发者可以根据实际情况进行扩展
    for (const item of list) {
      // 通过路径去匹配
      if (isExternal(item.path) && (onlyOneChild === item.path || route.path === item.path)) {
        data = Object.assign({}, route)
      } else {
        const routePath = path.resolve(basePath, onlyOneChild || route.path)
        if (routePath === item.path || (route.meta && route.meta.followRoute === item.path)) {
          data = Object.assign({}, route)
        }
      }
    }
    // 如不需要路由权限，解注释下面一行
    // data = Object.assign({}, route)

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutes(route.children, path.resolve(basePath, data.path))
    }
    if (data) {
      res.push(data)
    }
  }
  return res
}

// 模拟后端过滤路由
function getFilterRoutes(routes) {
  const res = []

  for (const route of routes) {
    const data = {
      path: route.path,
      name: route.name,
      hidden: route.hidden,
      alwaysShow: route.alwaysShow,
      redirect: route.redirect
    }
    data.meta = Object.assign({}, route.meta || {}, { title: route.title })
    if (route.component) {
      // 动态加载路由文件，可根据实际情况进行自定义逻辑
      data.component = route.component === '#'
        ? Layout
        : (route.component === '##'
          ? ParentView
          : resolve => require([`@/${route.component}`], resolve))
    }
    // recursive child routes
    if (route.children) {
      data.children = getFilterRoutes(route.children)
    }
    res.push(data)
  }
  return res
}

export default permission
