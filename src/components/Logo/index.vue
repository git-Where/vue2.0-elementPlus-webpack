<template>
  <router-link class="app-logo" to="/" :class="{'app-logo--Top': layout !== 'Classic'}">
    <img :src="require('@/assets/img/logo.png')">
    <div v-if="show" class="sidebar-title">{{ logoTitle }}</div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters(['logoTitle', 'layout'])
  },
  watch: {
    collapsed(collapsed) {
      if (this.layout !== 'Classic') {
        this.show = true
      } else {
        if (!collapsed) {
          setTimeout(() => {
            this.show = !collapsed
          }, 400)
        } else {
          this.show = !collapsed
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: @topSiderHeight;
  width: 100%;
  background-color: @menuBg;
  img {
    width: 37px;
    height: 37px;
    margin-left: 14px;
  }
  .sidebar-title {
    font-size: 14px;
    font-weight: 700;
    transition: .5s;
    margin-left: 12px;
  }
  .sidebar-title {
    color: @menuActiveText;
  }
}
.app-logo--Top {
  width: auto;
  background-color: @topMenuBg;
  transition: background 0.2s;
  padding: 0 5px;
  &:hover {
    background: #f6f6f6;
  }
  img {
    margin-left: 0;
  }
  .sidebar-title {
    color: @topMenuText;
  }
}
</style>
