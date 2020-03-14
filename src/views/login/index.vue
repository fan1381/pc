<template>
  <div class="login">
    <el-card class="card">
      <!-- 标题图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="" />
      </div>

      <!-- 表单 -->
      <el-form class="form" :model="form" :rules="rules" ref="myForm">
        <el-form-item prop="mobile"
          ><el-input v-model="form.mobile" placeholder="请输入手机号"></el-input
        ></el-form-item>

        <el-form-item prop="code"
          ><el-input
            v-model="form.code"
            style="width:65%"
            placeholder="请输入验证码"
          ></el-input>
          <el-button type="primary" style="float:right" plain
            >发送验证码</el-button
          ></el-form-item
        >

        <el-form-item prop="cheackBox"
          ><el-checkbox v-model="form.cheackBox"
            >您必须勾选协议
          </el-checkbox></el-form-item
        >

        <el-form-item
          ><el-button @click="submit" type="primary" style="width:100%"
            >登录</el-button
          ></el-form-item
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        cheackBox: false
      },
      // 校验规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }
        ],
        cheackBox: [
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback()
              } else {
                callback(new Error('你还没有勾选协议'))
              }
            }
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submit () {
      this.$refs.myForm.validate((yes) => {
        if (yes) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.form
          }).then((res) => {
            window.localStorage.setItem('user', res.data.data.token)
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login {
  background-image: url("../../assets/img/back.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    width: 440px;
    height: 350px;
    background-color: pink;
    .title {
      display: flex;
      justify-content: center;
      img {
        height: 45px;
      }
    }
    .form {
      margin-top: 30px;
    }
  }
}
</style>
