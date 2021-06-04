import { asyncRouterMap, constantRouterMap } from '@/router'
import { deepClone } from '@/utils'
import path from 'path'
// import wsCache from '@/cache'
// import store from '@/store'
// import { isExternal } from '@/utils/validate'
/* Layout */
// import Layout from '@/layout'
// import ParentView from '_c/ParentView'

const permission = {
  state: {
    routers: [],
    addRouters: [],
    isAddRouters: false
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // 过滤路由，多级变为二级，如不需要动态路由，把下面一行的routers换成asyncRouterMap
      const flatRoutes = getFlatRoutes(deepClone(asyncRouterMap, ['component']))
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
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 路由权限控制
        const routerMap = generateRoutes(deepClone(asyncRouterMap, ['component']))
        commit('SET_ROUTERS', routerMap)
        resolve()
      })
    },
    SetIsAddRouters({ commit }, isAddRouters) {
      commit('SET_ISADDROUTERS', isAddRouters)
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

    // let onlyOneChild = null

    // if (route.children && route.children.length === 1 && !route.alwaysShow) {
    //   onlyOneChild = isExternal(route.children[0].path)
    //     ? route.children[0].path
    //     : path.resolve(path.resolve(basePath, route.path), route.children[0].path)
    // }

    let data = null

    // 如不需要路由权限，解注释下面一行
    data = Object.assign({}, route)

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

export default permission
