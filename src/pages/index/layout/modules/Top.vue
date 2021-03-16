<template>
  <div :class="classObj" class="app__wrap">
    <!-- Top -->
    <div class="sidebar__wrap--Top">
      <div>
        <logo
          v-if="showLogo"
          :collapsed="collapsed"
        />
      </div>
      <div
        id="sidebar__wrap"
        class="sidebar__item--Top"
        :style="{
          marginRight: marginRight + 'px'
        }"
      >
        <sider :layout="layout" mode="horizontal" />
      </div>
      <div>
        <div v-if="showScreenfull || showUserInfo" class="navbar__wrap--right">
          <screenfull v-if="showScreenfull" id="screenfull-container" class="hover-container screenfull-container" />
          <user-info v-if="showUserInfo" id="user-container" class="hover-container user-container" />
        </div>
      </div>
    </div>
    <!-- Top -->

    <div
      class="main__wrap"
      :class="{
        'main__wrap--collapsed': collapsed
      }"
    >
      <el-scrollbar
        class="main__wrap--content"
        :class="{
          'main__wrap--fixed--all': fixedHeader && showNavbar && showTags,
          'main__wrap--fixed--nav': fixedHeader && showNavbar && !showTags,
          'main__wrap--fixed--tags': fixedHeader && !showNavbar && showTags
        }"
      >
        <div
          class="header__wrap"
          :class="{
            'header__wrap--fixed': fixedHeader,
            'header__wrap--collapsed': fixedHeader && collapsed
          }"
        >
          <div
            v-if="showTags"
            id="tag-container"
            class="tags__wrap"
          >
            <tags-view />
          </div>
        </div>
        <app-main />
      </el-scrollbar>
    </div>

    <!-- setting -->
    <setting />
    <!-- setting -->

    <backtop v-if="showBackTop" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppMain from '../components/AppMain'
import TagsView from '_c/TagsView'
import Logo from '_c/Logo'
import Sider from '_c/Sider'
import Screenfull from '_c/Screenfull'
import UserInfo from '_c/UserInfo'

import Setting from '_c/Setting'
import Backtop from '_c/Backtop'
export default {
  name: 'Top',
  components: {
    Sider,
    Screenfull,
    UserInfo,
    AppMain,
    TagsView,
    Logo,
    Setting,
    Backtop
  },
  data() {
    return {
      marginRight: 0
    }
  },
  computed: {
    ...mapGetters([
      'layout',
      'collapsed',
      'showLogo',
      'showTags',
      'showScreenfull',
      'showUserInfo',
      'showNavbar',
      'fixedHeader',
      'showBackTop'
    ]),
    classObj() {
      const obj = {}
      obj[`app__wrap--${this.layout}`] = true
      return obj
    }
  },
  mounted() {
    this.setSidebarStyle()
  },
  methods: {
    setSidebarStyle() {
      const sidebar = document.getElementsByClassName('navbar__wrap--right')[0]
      this.marginRight = sidebar.clientWidth
    }
  }
}
</script>

<style lang="less" scoped>
@import  './style.less';
</style>
