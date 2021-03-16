<template>
  <div>
    <el-row>
      <el-button v-ripples>
        默认按钮
      </el-button>
      <el-button v-ripples size="medium">
        中等按钮
      </el-button>
      <el-button v-ripples size="small">
        小型按钮
      </el-button>
      <el-button v-ripples size="mini">
        超小按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-ripples round>
        默认按钮
      </el-button>
      <el-button v-ripples size="medium" round>
        中等按钮
      </el-button>
      <el-button v-ripples size="small" round>
        小型按钮
      </el-button>
      <el-button v-ripples size="mini" round>
        超小按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-ripples type="primary">
        主要按钮
      </el-button>
      <el-button v-ripples type="success">
        成功按钮
      </el-button>
      <el-button v-ripples type="info">
        信息按钮
      </el-button>
      <el-button v-ripples type="warning">
        警告按钮
      </el-button>
      <el-button v-ripples type="danger">
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-ripples plain>
        朴素按钮
      </el-button>
      <el-button v-ripples type="primary" plain>
        主要按钮
      </el-button>
      <el-button v-ripples type="success" plain>
        成功按钮
      </el-button>
      <el-button v-ripples type="info" plain>
        信息按钮
      </el-button>
      <el-button v-ripples type="warning" plain>
        警告按钮
      </el-button>
      <el-button v-ripples type="danger" plain>
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-ripples round>
        圆角按钮
      </el-button>
      <el-button v-ripples type="primary" round>
        主要按钮
      </el-button>
      <el-button v-ripples type="success" round>
        成功按钮
      </el-button>
      <el-button v-ripples type="info" round>
        信息按钮
      </el-button>
      <el-button v-ripples type="warning" round>
        警告按钮
      </el-button>
      <el-button v-ripples type="danger" round>
        危险按钮
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RipplesDemo'
}
</script>

<style scoped>
/deep/ .el-row {
  margin-top: 20px;
}
</style>
