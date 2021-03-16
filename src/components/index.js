import Vue from 'vue'
import ComTable from '@/components/ComTable'// ComTable组件
import Search from '@/components/Search'// Search组件
import Dialog from '@/components/Dialog'// Dialog组件
import Detail from '@/components/Detail'// Detail组件

import '@/assets/icons' // icon

// register globally
Vue.component('com-table', ComTable)
Vue.component('com-search', Search)
Vue.component('com-dialog', Dialog)
Vue.component('com-detail', Detail)
