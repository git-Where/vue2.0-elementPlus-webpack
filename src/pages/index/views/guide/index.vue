<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title=" 引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。引导页基于 intro.js"
      type="info"
      style="margin-bottom: 20px;"
    />
    <el-button type="primary" @click.prevent.stop="guide">
      开始引导
    </el-button>
  </div>
</template>

<script>
import IntroJs from 'intro.js'
import 'intro.js/introjs.css'
import steps from './steps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new IntroJs()
    this.driver.addSteps(steps).setOptions({
      prevLabel: '上一步',
      nextLabel: '下一步',
      skipLabel: '跳过',
      doneLabel: '结束'
    })
  },
  methods: {
    guide() {
      this.driver.start()
    }
  }
}
</script>
