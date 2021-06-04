/**
 * 登录页面 Created by archer on 2019.03.23
 */
<template>
  <div class="login" @keydown.enter="login">
    <div class="login-con">
      <el-card class="box-card">
        <div slot="header">
          <span class="login--header">登录</span>
        </div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="form.userName"
              placeholder="请输入账号 admin or test"
              class="form--input"
            >
              <template #prefix>
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              v-model="form.passWord"
              minlength="3"
              maxlength="18"
              placeholder="请输入密码 admin or test"
              show-password
              class="form--input"
            >
              <template #prefix>
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login--button"
              @click="login"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      redirect: '',
      form: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [{ required: true, message: '帐号不能为空' }],
        passWord: [{ required: true, message: '密码不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.$notify({
      title: '提示',
      message: '账号 admin 为 前端 控制路由权限，账号 test 为 后端 控制路由权限。密码与账号相同',
      duration: 10000
    })
  },
  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.loading = true
            this.$wsCache.set(this.userInfo, this.form)
            this.$store.dispatch('GenerateRoutes').then(() => {
              // 这个是重点，vuex里面的这个方法，就是用来过滤菜单权限的。
              this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
              this.$store.dispatch('SetIsAddRouters', true)
              this.$router.push({ path: this.redirect || '/' })
            })
          } catch (e) {
            console.log(e)
            // TODO handle the exception
          } finally {
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/img/login-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  .box-card {
    width: 400px;
    .login--header {
      font-size: 24px;
      font-weight: 600;
    }
    .svg-container {
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .form--input {
      width: 100%;
      /deep/ input {
        padding-left: 40px;
      }
    }
    .login--button {
      width: 100%;
    }
  }
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
  }
}
</style>
