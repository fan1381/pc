<template>
  <div class="">
    <el-card>
      <!-- 面包屑 -->
      <crumb slot="header">
        <template slot="title">
          素材管理
        </template>
      </crumb>

      <el-row type="flex" justify="end">
        <el-button type="primary">上传图片</el-button>
      </el-row>

      <el-row>
        <el-tabs v-model="activeName"  @tab-click="changeTabs">
          <el-tab-pane label="全部图片" name="all">
            <div class="one">
              <el-card class="card" v-for="(item, index) in img" :key="index">
                <img :src="item.url" alt="" />
                <el-row class="row">
                  <i class="el-icon-star-on"></i>
                  <i class="el-icon-delete-solid"></i>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="收藏图片" name="collect"> </el-tab-pane>
        </el-tabs>
      </el-row>
      <!-- 分页 -->
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
        >
        </el-pagination>
      </el-row>
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
      img: [],
      activeName: 'all',
      page: {
        pageSize: 8,
        total: 0,
        currentPage: 1
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getImg()
  },
  mounted () {},
  methods: {
    // 获取图片素材
    getImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.img = res.data.data.results
        this.page.total = res.data.data.total_count
      })
    },
    changeTabs () {
      this.page.currentPage = 1
      this.getImg()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getImg()
    }
  }
}
</script>

<style scoped lang="less">
.one {
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 200px;
    height: 220px;
    margin: 20px 50px;
    background-color: pink;
    position: relative;
    border: none;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .row {
      display: flex;
      justify-content: space-around;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0px;
      font-size: 20px;
      height: 40px;
      background-color: #f4f5f6;
      i {
        font-size: 25px;
        margin: 8px 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
