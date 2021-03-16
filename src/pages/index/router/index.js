import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '_@/layout'
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
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('_v/dashboard'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('_v/guide'),
        name: 'Guide',
        meta: { title: '引导页', icon: 'guide' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://192.168.169.57/ue/2019/doc/vue-standard/dist/',
        meta: { title: '文档', icon: 'documentation' }
      }
    ]
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
    path: '/components-demo',
    component: Layout,
    redirect: 'noredirect',
    name: 'ComponentsDemo',
    alwaysShow: true,
    meta: {
      title: '功能组件',
      icon: 'component'
    },
    children: [
      {
        path: 'echarts',
        component: () => import('_v/components-demo/echarts'),
        name: 'EchartsDemo',
        meta: {
          title: '图表'
        }
      },
      {
        path: 'preview',
        component: () => import('_v/components-demo/preview'),
        name: 'PreviewDemo',
        meta: {
          title: '图片预览'
        }
      },
      {
        path: 'message',
        component: () => import('_v/components-demo/message'),
        name: 'MessageDemo',
        meta: {
          title: '消息提示'
        }
      },
      {
        path: 'search',
        component: () => import('_v/components-demo/search'),
        name: 'SearchDemo',
        meta: {
          title: '查询'
        }
      },
      {
        path: 'editor',
        component: () => import('_v/components-demo/editor'),
        name: 'EditorDemo',
        meta: {
          title: '富文本编辑器'
        }
      },
      {
        path: 'markdown',
        component: () => import('_v/components-demo/markdown'),
        name: 'MarkdownDemo',
        meta: {
          title: 'markdown编辑器'
        }
      },
      {
        path: 'dialog',
        component: () => import('_v/components-demo/dialog'),
        name: 'DialogDemo',
        meta: {
          title: '弹窗'
        }
      },
      {
        path: 'more',
        component: () => import('_v/components-demo/more'),
        name: 'MoreDemo',
        meta: {
          title: '显示更多'
        }
      },
      {
        path: 'detail',
        component: () => import('_v/components-demo/detail'),
        name: 'DetailDemo',
        meta: {
          title: '详情组件'
        }
      },
      {
        path: 'select-tree',
        component: () => import('_v/components-demo/select-tree'),
        name: 'SelectTreeDemo',
        meta: {
          title: '下拉树型'
        }
      },
      {
        path: 'cropper',
        component: () => import('_v/components-demo/cropper'),
        name: 'CropperDemo',
        meta: {
          title: '图片裁剪'
        }
      },
      {
        path: 'qrcode',
        component: () => import('_v/components-demo/qrcode'),
        name: 'QrcodeDemo',
        meta: {
          title: '二维码组件'
        }
      },
      {
        path: 'avatars',
        component: () => import('_v/components-demo/avatars'),
        name: 'AvatarsDemo',
        meta: {
          title: '头像组'
        }
      },
      {
        path: 'highlight',
        component: () => import('_v/components-demo/highlight'),
        name: 'HighlightDemo',
        meta: {
          title: '文字高亮'
        }
      }
    ]
  },
  {
    path: '/table-demo',
    component: Layout,
    redirect: '/table-demo/basic-usage',
    name: 'TableDemo',
    alwaysShow: true,
    meta: {
      title: '表格',
      icon: 'table'
    },
    children: [
      {
        path: 'basic-table',
        component: () => import('_v/table-demo/basic-table'),
        name: 'BasicTable',
        meta: {
          title: '基础表格'
        }
      },
      {
        path: 'page-table',
        component: () => import('_v/table-demo/page-table'),
        name: 'PageTable',
        meta: {
          title: '分页表格'
        }
      },
      {
        path: 'stripe-table',
        component: () => import('_v/table-demo/stripe-table'),
        name: 'StripeTable',
        meta: {
          title: '带斑马纹表格'
        }
      },
      {
        path: 'border-table',
        component: () => import('_v/table-demo/border-table'),
        name: 'BorderTable',
        meta: {
          title: '带边框表格'
        }
      },
      {
        path: 'state-table',
        component: () => import('_v/table-demo/state-table'),
        name: 'StateTable',
        meta: {
          title: '带状态表格'
        }
      },
      {
        path: 'fixed-header',
        component: () => import('_v/table-demo/fixed-header'),
        name: 'FixedHeader',
        meta: {
          title: '固定表头'
        }
      },
      {
        path: 'fixed-column',
        component: () => import('_v/table-demo/fixed-column'),
        name: 'FixedColumn',
        meta: {
          title: '固定列'
        }
      },
      {
        path: 'fixed-column-header',
        component: () => import('_v/table-demo/fixed-column-header'),
        name: 'FixedColumnHeader',
        meta: {
          title: '固定列和表头'
        }
      },
      {
        path: 'fluid-height',
        component: () => import('_v/table-demo/fluid-height'),
        name: 'FluidHeight',
        meta: {
          title: '流体高度'
        }
      },
      {
        path: 'multi-header',
        component: () => import('_v/table-demo/multi-header'),
        name: 'MultiHeader',
        meta: {
          title: '多级表头'
        }
      },
      {
        path: 'single-choice',
        component: () => import('_v/table-demo/single-choice'),
        name: 'SingleChoice',
        meta: {
          title: '单选'
        }
      },
      {
        path: 'multiple-choice',
        component: () => import('_v/table-demo/multiple-choice'),
        name: 'MultipleChoice',
        meta: {
          title: '多选'
        }
      },
      {
        path: 'sort-table',
        component: () => import('_v/table-demo/sort-table'),
        name: 'SortTable',
        meta: {
          title: '排序'
        }
      },
      {
        path: 'screen-table',
        component: () => import('_v/table-demo/screen-table'),
        name: 'ScreenTable',
        meta: {
          title: '筛选'
        }
      },
      {
        path: 'expand-row',
        component: () => import('_v/table-demo/expand-row'),
        name: 'ExpandRow',
        meta: {
          title: '展开行'
        }
      },
      {
        path: 'tree-and-load',
        component: () => import('_v/table-demo/tree-and-load'),
        name: 'TreeAndLoad',
        meta: {
          title: '树形数据与懒加载'
        }
      },
      {
        path: 'custom-header',
        component: () => import('_v/table-demo/custom-header'),
        name: 'CustomHeader',
        meta: {
          title: '自定义表头'
        }
      },
      {
        path: 'total-table',
        component: () => import('_v/table-demo/total-table'),
        name: 'TotalTable',
        meta: {
          title: '表尾合计行'
        }
      },
      {
        path: 'merge-table',
        component: () => import('_v/table-demo/merge-table'),
        name: 'MergeTable',
        meta: {
          title: '合并行或列'
        }
      },
      {
        path: 'custom-index',
        component: () => import('_v/table-demo/custom-index'),
        name: 'CustomIndex',
        meta: {
          title: '自定义索引'
        }
      }
    ]
  },
  {
    path: '/components-ui',
    component: Layout,
    redirect: 'noredirect',
    name: 'ComponentsUi',
    alwaysShow: true,
    meta: {
      title: 'UI组件',
      icon: 'UI'
    },
    children: [
      {
        path: 'waves',
        component: () => import('_v/components-ui/waves'),
        name: 'WavesDemo',
        meta: {
          title: '水波纹'
        }
      },
      {
        path: 'ripples',
        component: () => import('_v/components-ui/ripples'),
        name: 'RipplesDemo',
        meta: {
          title: '涟漪'
        }
      },
      {
        path: 'streamer',
        component: () => import('_v/components-ui/streamer'),
        name: 'StreamerDemo',
        meta: {
          title: '流光'
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('_v/icons'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon' }
      }
    ]
  },
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
  },
  {
    path: '/example-demo',
    component: Layout,
    name: 'ExampleDemo',
    alwaysShow: true,
    meta: {
      icon: 'example',
      title: '综合实例'
    },
    children: [
      {
        path: 'example-dialog',
        component: () => import('_v/example-demo/example-dialog'),
        name: 'ExampleDialog',
        meta: {
          title: '列表综合实例-弹窗'
        }
      },
      {
        path: 'example-page',
        component: () => import('_v/example-demo/example-page'),
        name: 'ExamplePage',
        meta: {
          title: '列表综合实例-页面'
        }
      },
      {
        path: 'example-add',
        component: () => import('_v/example-demo/example-page/example-add'),
        name: 'ExampleAdd',
        hidden: true,
        meta: {
          title: '列表综合实例-新增',
          noTagsView: true,
          noCache: true,
          showMainRoute: true,
          activeMenu: '/example-demo/example-page',
          followRoute: '/example-demo/example-page'
        }
      },
      {
        path: 'example-edit',
        component: () => import('_v/example-demo/example-page/example-edit'),
        name: 'ExampleEdit',
        hidden: true,
        meta: {
          title: '列表综合实例-编辑',
          noTagsView: true,
          noCache: true,
          showMainRoute: true,
          activeMenu: '/example-demo/example-page',
          followRoute: '/example-demo/example-page'
        }
      },
      {
        path: 'example-detail',
        component: () => import('_v/example-demo/example-page/example-detail'),
        name: 'ExampleDetail',
        hidden: true,
        meta: {
          title: '列表综合实例-详情',
          noTagsView: true,
          noCache: true,
          showMainRoute: true,
          activeMenu: '/example-demo/example-page',
          followRoute: '/example-demo/example-page'
        }
      }
    ]
  },
  {
    path: '/role-demo',
    component: Layout,
    name: 'RoleDemo',
    alwaysShow: true,
    meta: {
      icon: 'user',
      title: '权限管理'
    },
    children: [
      {
        path: 'user',
        component: () => import('_v/role-demo/user'),
        name: 'User',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        component: () => import('_v/role-demo/role'),
        name: 'Role',
        meta: {
          title: '角色管理'
        }
      }
    ]
  },
  {
    path: '/other',
    component: Layout,
    redirect: 'noredirect',
    name: 'Other',
    alwaysShow: true,
    meta: {
      title: '其他',
      icon: 'international'
    },
    children: [
      {
        path: 'external-link',
        component: () => import('_v/other/external-link'),
        name: 'ExternalLink',
        meta: {
          title: '按需引入JS'
        }
      }
    ]
  }
]

export default router
