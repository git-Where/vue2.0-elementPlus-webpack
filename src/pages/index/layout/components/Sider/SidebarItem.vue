<template>
  <div v-if="!item.hidden" :style="{display: !isNest && layout === 'Top' ? 'inline-block' : 'block'}" :class="{'menu__top': layout === 'Top' && !isNest}">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <el-menu-item :index="resolvePath(onlyOneChild.path, showMenuTab ? `${activeTab === '/dashboard' ? '' : activeTab}/${basePath}` : '')" :class="{'submenu-title-noDropdown':!isNest}">
        <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" />
        <template #title>
          <span class="anticon-item">{{ onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-submenu
      v-else
      :popper-class="layout !== 'Top'
        ? 'nest-popper-menu'
        : 'top-popper-menu'"
      :index="resolvePath(item.path, showMenuTab ? `${activeTab === '/dashboard' ? '' : activeTab}/${basePath}` : '')"
    >
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :layout="layout"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 'Classic'
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {
    ...mapGetters([
      'showMenuTab',
      'activeTab'
    ])
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath, otherPath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(otherPath || this.basePath, routePath)
    }
  }
}
</script>

<style lang="less" scoped>
.menu__top {
  /deep/ .el-submenu__title {
    &>.el-submenu__icon-arrow {
      right: 0;
      margin-top: -5px;
    }
  }
}
</style>
