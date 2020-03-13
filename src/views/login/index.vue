<template>
  <div class="login">
    <el-card class="card">
      <!-- 标题图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form class="form">
        <el-form-item
          ><el-input placeholder="请输入手机号"></el-input
        ></el-form-item>

        <el-form-item
          ><el-input style="width:65%" placeholder="请输入验证码"></el-input>
          <el-button type="primary" style="float:right" plain
            >发送验证码</el-button
          ></el-form-item
        >

        <el-form-item><el-checkbox>您必须勾选协议 </el-checkbox></el-form-item>

        <el-form-item
          ><el-button type="primary" style="width:100%"
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
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
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
