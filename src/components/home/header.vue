<template>
  <div class="">
    <el-row class="row">
      <el-col :span="12" class="left">
        <i :class="'el-icon-s-unfold'"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>

      <el-col :span="12" class="right">
        <el-row type="flex" justify="end">
          <img :src="userInfo.photo" alt="" />

          <el-dropdown @command="out">
            <span class="el-dropdown-link"> {{ userInfo.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="user">个人信息</el-dropdown-item>
              <el-dropdown-item command="git">git </el-dropdown-item>
              <el-dropdown-item command="out">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getInfo()
  },
  mounted () {},
  methods: {
    out (command) {
      if (command === 'user') {
        this.$message('点击了用户信息')
      } else if (command === 'git') {
        this.$message('点击了git')
      } else {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message('您已退出')
      }

      // window.localStorage.removeItem('user')
      // this.$router.push('/login')
    },
    getInfo () {
      const token = window.localStorage.getItem('user')
      this.$axios({
        url: '/user/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.userInfo = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.row {
  height: 50px;
  line-height: 50px;
  .left {
    font-size: 20px;
    i {
      margin-right: 10px;
    }
  }
  .right {
    padding-right: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
      margin-top: 5px;
    }
  }
}
</style>
