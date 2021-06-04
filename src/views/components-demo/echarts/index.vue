<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="统一封装 Echart 组件，自适应宽度，只需传入 options 与 height 属性即可展示对应的图表。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <el-row :gutter="20">
      <el-col :span="10">
        <div class="chart-wrap">
          <echart :options="pieOptions" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="chart-wrap">
          <echart :options="barOptions" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="chart-wrap">
          <echart :options="lineOptions" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="chart-wrap">
          <echart :options="pieOptions2" :height="'300px'" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echart from '_c/Echart'
import { lineOptions, pieOptions, barOptions, pieOptions2 } from './echart-data'
export default {
  name: 'EchartsDemo',
  components: {
    Echart
  },
  data() {
    return {
      lineOptions,
      pieOptions,
      barOptions,
      pieOptions2
    }
  }
}
</script>

<style lang="less" scoped>
  .chart-wrap {
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
  }
</style>
