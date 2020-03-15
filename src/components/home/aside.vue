<template>
  <div class="layout-aside">
    <div class="title">
      <img :src="bigImg " alt="" />
    </div>
    <el-menu
      background-color="#353b4e"
      text-color="pink"
      active-text-color="pink"
    >
      <el-menu-item index="">首页</el-menu-item>

      <el-submenu index='2'>
        <span slot="title">内容</span>
        <el-menu-item index="">发布文章</el-menu-item>
        <el-menu-item index="">文章列表</el-menu-item>
        <el-menu-item index="">评论管理</el-menu-item>
        <el-menu-item index="">素材管理</el-menu-item>
      </el-submenu>

      <el-submenu index='1'>
        <span slot="title">粉丝</span>
        <el-menu-item index=""> 图文数据</el-menu-item>
        <el-menu-item index="">粉丝概况</el-menu-item>
        <el-menu-item index="">粉丝画像</el-menu-item>
        <el-menu-item index="">粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-aside {
   width: 230px;
  .el-menu {
    border-right: none;
  }
  .title {
    background-color: #2e2f32;
    text-align: center;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
