<template>
  <div>
    <el-row>
      <el-button v-waves>
        默认按钮
      </el-button>
      <el-button v-waves size="medium">
        中等按钮
      </el-button>
      <el-button v-waves size="small">
        小型按钮
      </el-button>
      <el-button v-waves size="mini">
        超小按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-waves round>
        默认按钮
      </el-button>
      <el-button v-waves size="medium" round>
        中等按钮
      </el-button>
      <el-button v-waves size="small" round>
        小型按钮
      </el-button>
      <el-button v-waves size="mini" round>
        超小按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-waves type="primary">
        主要按钮
      </el-button>
      <el-button v-waves type="success">
        成功按钮
      </el-button>
      <el-button v-waves type="info">
        信息按钮
      </el-button>
      <el-button v-waves type="warning">
        警告按钮
      </el-button>
      <el-button v-waves type="danger">
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-waves plain>
        朴素按钮
      </el-button>
      <el-button v-waves type="primary" plain>
        主要按钮
      </el-button>
      <el-button v-waves type="success" plain>
        成功按钮
      </el-button>
      <el-button v-waves type="info" plain>
        信息按钮
      </el-button>
      <el-button v-waves type="warning" plain>
        警告按钮
      </el-button>
      <el-button v-waves type="danger" plain>
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button v-waves round>
        圆角按钮
      </el-button>
      <el-button v-waves type="primary" round>
        主要按钮
      </el-button>
      <el-button v-waves type="success" round>
        成功按钮
      </el-button>
      <el-button v-waves type="info" round>
        信息按钮
      </el-button>
      <el-button v-waves type="warning" round>
        警告按钮
      </el-button>
      <el-button v-waves type="danger" round>
        危险按钮
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WavesDemo'
}
</script>

<style scoped>
/deep/ .el-row {
  margin-top: 20px;
}
</style>
