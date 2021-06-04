import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'
import ParentView from '_c/ParentView'

Vue.use(Router)

/**
* hidden: true                当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
* alwaysShow: true            当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式-                                              -如组件页面
                              只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                              若你想不管路由下面的 children 声明的个数都显示你的根路由
                              你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根                                                路由(默认 false)
* redirect: noredirect        当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'          设置该路由的图标
    noCache: true             如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true               如果设置为true，则会一直固定在tag项中(默认 false)
    noTagsView: true          如果设置为true，则不会在tag项显示中(默认 false)
    activeMenu: '/dashboard'  显示高亮的路由路径
    showMainRoute: true       设置为true即使hidden为true，也依然可以进行路由跳转(默认 false)
    followRoute: '/dashboard' 为路由设置跟随其他路由的权限
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('_c/Redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('_v/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('_v/err-page/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  routes: constantRouterMap
})

const router = createRouter()

// 重新实例化一个新的路由，替换之前的路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export const asyncRouterMap = [
  {
    path: '/level',
    component: Layout,
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    name: 'Level',
    alwaysShow: true,
    meta: {
      title: '多级菜单缓存',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1Demo',
        component: ParentView,
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        alwaysShow: true,
        meta: {
          title: 'Menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11Demo',
            component: ParentView,
            alwaysShow: true,
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'Menu1-1'
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111Demo',
                component: () => import('_v/level/Menu111'),
                meta: {
                  title: 'Menu1-1-1'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12Demo',
            component: () => import('_v/level/Menu12'),
            meta: {
              title: 'Menu1-2'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2Demo',
        component: () => import('_v/level/Menu2'),
        meta: {
          title: 'Menu2'
        }
      }
    ]
  }
]

export default router
