<template>
  <div>
    <div class="setting__wrap" @click="toggleClick">
      <i class="el-icon-setting" />
    </div>
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      size="20%"
      :modal="false"
    >
      <template #title>
        <div class="setting__title">项目配置</div>
      </template>
      <div class="setting__content">
        <div class="setting__title">导航栏布局</div>
        <div class="icon__wrap">
          <span :class="{'icon--active': layout==='Classic'}" @click="setLayout('Classic')">
            <el-tooltip effect="dark" content="经典布局" placement="bottom">
              <svg-icon icon-class="layout-classic" class="setting-svg-icon" />
            </el-tooltip>
          </span>
          <span :class="{'icon--active': layout==='LeftTop'}" @click="setLayout('LeftTop')">
            <el-tooltip effect="dark" content="左侧顶部布局" placement="bottom">
              <svg-icon icon-class="layout-topLeft" class="setting-svg-icon" />
            </el-tooltip>
          </span>
          <span :class="{'icon--active': layout==='Top'}" @click="setLayout('Top')">
            <el-tooltip effect="dark" content="顶部布局" placement="bottom">
              <svg-icon icon-class="layout-top" class="setting-svg-icon" />
            </el-tooltip>
          </span>
        </div>

        <!--      <div class="setting__title">侧边菜单主题</div>

        <div class="setting__title">顶部菜单主题</div> -->

        <!-- <div class="setting__title">界面功能</div> -->

        <div class="setting__title">界面显示</div>
        <div v-if="layout !== 'Top'" class="setting__item">
          <span>固定一级菜单</span>
          <el-switch :value="showMenuTab" @change="SetShowMenuTab" />
        </div>

        <div class="setting__item">
          <span>固定Header</span>
          <el-switch :value="fixedHeader" @change="SetFixedHeader" />
        </div>

        <div v-if="layout !== 'Top'" class="setting__item">
          <span>顶部操作栏</span>
          <el-switch :value="showNavbar" @change="SetShowNavbar" />
        </div>

        <div v-if="layout !== 'Top'" class="setting__item">
          <span>侧边栏缩收</span>
          <el-switch :value="showHamburger" @change="SetHamburger" />
        </div>

        <div v-if="layout !== 'Top'" class="setting__item">
          <span>面包屑</span>
          <el-switch :value="showBreadcrumb" @change="SetBreadcrumb" />
        </div>

        <div class="setting__item">
          <span>全屏按钮</span>
          <el-switch :value="showScreenfull" @change="SetScreenfull" />
        </div>

        <div class="setting__item">
          <span>用户头像</span>
          <el-switch :value="showUserInfo" @change="SetUserInfo" />
        </div>

        <div class="setting__item">
          <span>标签页</span>
          <el-switch :value="showTags" @change="SetShowTags" />
        </div>

        <div class="setting__item">
          <span>LOGO</span>
          <el-switch :value="showLogo" @change="SetShowLogo" />
        </div>

        <div class="setting__item">
          <span>灰色模式</span>
          <el-switch :value="greyMode" @change="SetGreyMode" />
        </div>

        <div class="setting__item">
          <span>回到顶部</span>
          <el-switch :value="showBackTop" @change="SetShowBackTop" />
        </div>

        <div class="setting__item">
          <span>页面标题</span>
          <el-input v-model="title" size="mini" @change="SetTitle" />
        </div>

        <div class="setting__item">
          <span>LOGO标题</span>
          <el-input v-model="logoTitle" size="mini" @change="SetLogoTitle" />
        </div>

      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      drawer: false,
      logoTitle: this.$store.state.app.logoTitle,
      title: this.$store.state.app.title
    }
  },
  computed: {
    ...mapGetters([
      'layout',
      'fixedHeader',
      'showNavbar',
      'showHamburger',
      'showBreadcrumb',
      'showScreenfull',
      'showUserInfo',
      'showTags',
      'showLogo',
      'greyMode',
      'showBackTop',
      'showMenuTab'
    ])
  },
  methods: {
    ...mapActions([
      'SetLayout',
      'SetCollapsed',
      'SetFixedHeader',
      'SetShowNavbar',
      'SetHamburger',
      'SetBreadcrumb',
      'SetScreenfull',
      'SetUserInfo',
      'SetShowTags',
      'SetShowLogo',
      'SetTitle',
      'SetLogoTitle',
      'SetGreyMode',
      'SetShowBackTop',
      'SetShowMenuTab'
    ]),
    setLayout(mode) {
      if (mode === this.layout) return
      this.SetLayout(mode)
      this.SetCollapsed(false)
      mode === 'Top' && this.SetShowMenuTab(false)
    },
    toggleClick() {
      this.drawer = true
    }
  }
}
</script>

<style lang="less" scoped>
// 项目配置
.setting__wrap {
  position: fixed;
  top: 45%;
  right: 0;
  z-index: 10;
  display: flex;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  background: #018ffb;
  border-radius: 6px 0 0 6px;
  justify-content: center;
  align-items: center;
}
.setting__title {
  font-weight: bold;
  color: black;
}
// 项目配置
.setting__content {
  background: @appBg;
  padding: 0 20px 20px 20px;
  .setting__title {
    text-align: center;
    padding-top: 20px;
  }
  .icon__wrap {
    text-align: center;
    margin-top: 15px;
    &>span {
      display: inline-block;
      padding: 5px 10px;
      border: 2px solid @appBg;
      .setting-svg-icon {
        font-size: 60px;
        cursor: pointer;
      }
      .setting-svg-icon:nth-of-type(2) {
        margin: 0 10px;
      }
    }
    .icon--active {
      border: 2px solid #018ffb;
      border-radius: 4px;
    }
  }
  .setting__item {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    align-items: center;
    &>span {
      min-width: 100px;
    }
  }
}
</style>
