<template>
  <div
    :class="{'has-logo': showLogo && layout === 'Classic', 'sidebar-container--Top': layout === 'Top'}"
    class="sidebar-container"
  >
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="false"
        :mode="mode"
        @select="selectMenu"
      >
        <sidebar-item
          v-for="route in routers"
          :key="route.path"
          :item="route"
          :layout="layout"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { isExternal } from '@/utils/validate'

export default {
  components: { SidebarItem },
  props: {
    layout: {
      type: String,
      default: 'Classic'
    },
    mode: {
      type: String,
      default: 'vertical'
    }
  },
  computed: {
    ...mapGetters([
      'routers',
      'collapsed',
      'showLogo'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    selectMenu(path) {
      if (this.$route.fullPath === path) return
      if (isExternal(path)) {
        window.open(path)
      } else {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  /deep/ .svg-icon {
    margin-right: 16px;
  }
  /deep/ .el-scrollbar {
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      overflow: scroll;
      overflow-x: hidden;
      .el-menu {
        width: 100%;
        border: none;
      }
    }
  }
}
.has-logo {
  height: calc(~"100% - @{topSiderHeight}");
}

.sidebar-container--Top {
  /deep/ .el-scrollbar {
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      overflow: scroll;
      overflow-x: hidden;
      .el-scrollbar__view {
        height: @topSiderHeight;
      }
      .el-menu {
        width: auto;
        height: 100%;
        border: none;
      }
    }
  }
}
</style>
