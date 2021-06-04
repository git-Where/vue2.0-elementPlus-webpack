<template>
  <div :class="classObj" class="app__wrap">
    <!-- Classic -->
    <div
      id="sidebar__wrap"
      class="sidebar__wrap"
      :class="{'sidebar__wrap--collapsed': collapsed}"
    >
      <logo
        v-if="showLogo && layout === 'Classic'"
        :collapsed="collapsed"
      />
      <sider :layout="layout" mode="vertical" />
    </div>
    <!-- Classic -->

    <!-- Top -->
    <div v-if="layout !== 'Classic'" class="sidebar__wrap--Top">
      <div>
        <logo
          v-if="showLogo"
          :collapsed="collapsed"
        />
      </div>
      <div v-if="layout === 'Top'" class="sidebar__item--Top">
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
            v-if="showNavbar && layout !== 'Top'"
            class="navbar__wrap"
          >
            <hamburger
              v-if="showHamburger"
              id="hamburger-container"
              :collapsed="collapsed"
              class="hover-container"
              @toggleClick="SetCollapsed"
            />
            <breadcrumb v-if="showBreadcrumb" id="breadcrumb-container" />
            <!-- <div v-if="showScreenfull || showUserInfo" class="navbar__wrap--right">
              <screenfull v-if="showScreenfull" class="hover-container screenfull-container" />
              <user-info v-if="showUserInfo" class="hover-container user-container" />
            </div> -->
          </div>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppMain from '../components/AppMain'
import TagsView from '_c/TagsView'
import Logo from '_c/Logo'
import Sider from '_c/Sider'
import Hamburger from '_c/Hamburger'
import Breadcrumb from '_c/Breadcrumb'
import Screenfull from '_c/Screenfull'
import UserInfo from '_c/UserInfo'
export default {
  name: 'LeftTop',
  components: {
    Sider,
    Hamburger,
    Breadcrumb,
    Screenfull,
    UserInfo,
    AppMain,
    TagsView,
    Logo
  },
  computed: {
    ...mapGetters([
      'layout',
      'collapsed',
      'showLogo',
      'showTags',
      'showBreadcrumb',
      'showHamburger',
      'showScreenfull',
      'showUserInfo',
      'showNavbar',
      'fixedHeader'
    ]),
    classObj() {
      const obj = {}
      obj[`app__wrap--${this.layout}`] = true
      return obj
    }
  },
  methods: {
    ...mapActions(['SetCollapsed'])
  }
}
</script>

<style lang="less" scoped>
@import  './style.less';
</style>
