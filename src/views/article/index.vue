<template>
  <div class="">
    <el-card>
      <!-- 面包 -->
      <crumb slot="header">
        <div slot="title">文章列表</div>
      </crumb>

      <!-- 搜索 -->
      <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
          <el-radio-group v-model="radio">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道列表：">
          <el-select>
            <el-option>sdsd</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间选择：">
          <div class="block">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>

      <el-row class="text">共找到{{ this.list.length }}条符合条件的内容</el-row>

      <!-- 列表 -->
      <div class="box" v-for="item in list" :key="item.id.toString()">
        <div class="left">
          <div>
            <img
              class="imgs"
              :src="item.cover.images.length ? item.cover.images : img"
              alt=""
            />
          </div>
          <div class="title">
            <span>{{ item.title }}</span>
            <el-button disabled>{{ item.status | status }}</el-button>
            <span>{{ item.pubdate }}</span>
          </div>
        </div>

        <div class="right">
          <span> <i class="el-icon-edit"></i>修改</span>
          <span><i class="el-icon-delete"></i>删除</span>
        </div>
      </div>
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
      radio: 0,
      img: require('../../assets/img/404.png'),
      list: [] // 文章列表
    }
  },
  filters: {
    status (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticle()
  },
  mounted () {},
  methods: {
    getArticle () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        this.list = res.data.data.results
        console.log(this.list)
      })
    }
  }
}
</script>

<style scoped lang="less">
.text {
  border-bottom: 1px dashed #ccc;
  padding: 30px 10px;
}

.box {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    .imgs {
      width: 200px;
      height: 100px;
      border-radius: 4%;
    }
    .title {
      height: 100px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  .right {
    span {
      margin-left: 10px;
    }
  }
}
</style>
