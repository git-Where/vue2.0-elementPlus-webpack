<template>
  <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="changeTab">
    <el-tab-pane
      v-for="(item, $index) in tabRouters"
      :key="$index"
      :name="item.path === '/' ? '/dashboard' : item.path"
    >
      <template #label>
        <div class="label-item">
          <svg-icon :icon-class="filterTab(item, 'icon')" />
          <div class="title-item">{{ filterTab(item, 'title') }}</div>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { findIndex } from '@/utils'
import { isExternal } from '@/utils/validate'
export default {
  name: 'MenuTabs',
  data() {
    return {
      activeName: ''
    }
  },
  computed: {
    ...mapGetters(['addRouters', 'routers', 'layout']),
    tabPosition() {
      return this.layout === 'Classic' ? 'left' : 'top'
    },
    tabRouters() {
      return this.routers.filter(v => !v.hidden)
    }
  },
  watch: {
    activeName(val) {
      this.SetAcitveTab(val)
    },
    $route() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const currentPath = this.$route.fullPath.split('/')
      const index = findIndex(this.tabRouters, v => {
        if (v.path === '/') {
          return `/${currentPath[1]}` === '/dashboard'
        } else {
          return v.path === `/${currentPath[1]}`
        }
      })
      if (index > -1) {
        this.activeName = `/${currentPath[1]}`
        this.setActive(index)
        this.SetAcitveTab(this.activeName)
      }
    },
    ...mapActions(['SetMenuTabRouters', 'SetAcitveTab']),
    filterTab(item, key) {
      return item.meta ? item.meta[key] : item.children[0].meta[key]
    },
    setActive(index) {
      this.SetMenuTabRouters(this.tabRouters[index].children)
    },
    changeTab(item) {
      this.SetMenuTabRouters(this.tabRouters[item.index].children)
      if (isExternal(this.tabRouters[item.index].children[0].path)) {
        window.open(this.tabRouters[item.index].children[0].path)
      } else {
        this.$router.push(`${this.activeName === '/dashboard' ? '' : this.activeName}/${this.tabRouters[item.index].children[0].path}`)
        this.SetAcitveTab(this.activeName)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label-item {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  &>div {
    width: 100%;
  }
  .title-item {
    position: relative;
    top: -5px;
  }
}
</style>
