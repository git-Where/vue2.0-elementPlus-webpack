<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="封装 Element 的 Form 组件，实现查询、重置等功能，并提供了三种布局风格。"
      type="info"
      style="margin-bottom: 20px;"
    />
    <el-alert
      effect="dark"
      :closable="false"
      title="经典风格。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <div class="searh">
      <com-search
        :data="data"
        @search-submit="searchSubmit1"
        @reset-submit="resetSubmit1"
      />
      <div>
        查询/重置后的数据：{{ formData1 }}
      </div>
    </div>

    <el-alert
      effect="dark"
      :closable="false"
      title="底部操作按钮风格。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <div class="searh">
      <com-search
        layout="bottom"
        :data="data"
        @search-submit="searchSubmit2"
        @reset-submit="resetSubmit2"
      />
      <div>
        查询/重置后的数据：{{ formData2 }}
      </div>
    </div>

    <el-alert
      effect="dark"
      :closable="false"
      title="右侧操作按钮风格。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <div class="searh">
      <com-search
        layout="right"
        :data="data"
        @search-submit="searchSubmit3"
        @reset-submit="resetSubmit3"
      />
      <div>
        查询/重置后的数据：{{ formData3 }}
      </div>
    </div>
  </div>
</template>

<script>
import { data } from './data'
export default {
  name: 'SearchDemo',
  data() {
    return {
      data,
      formData1: null,
      formData2: null,
      formData3: null
    }
  },
  methods: {
    searchSubmit1(data) {
      this.formData1 = data
    },
    searchSubmit2(data) {
      this.formData2 = data
    },
    searchSubmit3(data) {
      this.formData3 = data
    },
    resetSubmit1(data) {
      this.formData1 = data
    },
    resetSubmit2(data) {
      this.formData2 = data
    },
    resetSubmit3(data) {
      this.formData3 = data
    }
  }
}
</script>

<style lang="less" scoped>
.searh {
  background: #fff;
  padding: 20px;
}
</style>
