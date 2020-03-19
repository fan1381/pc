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
          <el-radio-group v-model="form.radio" @change="cahngeStatus">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道列表：">
          <el-select v-model="form.id">
            <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间选择：">
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>

      <el-row class="text">共找到{{ this.page.total}}条符合条件的内容</el-row>

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

      <!-- 分页 -->
      <el-row type="flex" justify="center" style='margin-top:15px;'>
        <el-pagination
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          layout="prev, pager, next"
          :total="page.total"
          @current-change='changePage'
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// import func from '../../../vue-temp/vue-editor-bridge'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      form: {
        radio: 5,
        date: [],
        id: null
      },
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1

      },
      img: require('../../assets/img/404.png'),
      list: [], // 文章列表
      channels: [] // 频道列表
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
  watch: {
    form: {
      handler: function () {
        this.cahngeStatus()
      },
      deep: true
    }
  },
  created () {
    this.getArticle()
    this.getChannel()
  },
  mounted () {},
  methods: {
    cahngeStatus () {
      const params = {
        status: this.form.radio === 5 ? null : this.form.radio,
        channel_id: this.form.id,
        begin_pubdate: this.form.date.length ? this.form.date[0] : null,
        end_pubdate: this.form.date.length > 1 ? this.form.date[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticle(params)
    },
    getArticle (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.data.results
        this.page.total = res.data.data.total_count
        console.log(res)
      })
    },
    // 获取文章频道
    getChannel () {
      this.$axios({
        url: 'channels'
      }).then(res => {
        this.channels = res.data.data.channels
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.cahngeStatus()
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
