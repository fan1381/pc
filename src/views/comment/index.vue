<template>
  <div class="">
    <el-card>
      <!-- 面包屑 -->
      <crumb slot="header">
        <div slot="title">
          评论管理
        </div>
      </crumb>

      <!-- 表格 -->
      <el-table v-loading='loading' :data="tableData" style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="600"
        ></el-table-column>
        <el-table-column
          :formatter="formatter"
          prop="comment_status"
          label="评论状态"
        >
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
            <el-button type="text" @click="open(obj.row)">{{
              obj.row.comment_status ? "关闭" : "打开"
            }}</el-button>
            <el-button type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height:80px">
        <el-pagination
          :page-size="page.pageSize"
          :current-page="page.pagerCount"
          layout="prev, pager, next"
          :total="page.total"
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
      tableData: [],
      loading: false,
      page: {
        pageSize: 10,
        total: 88,
        pagerCount: 1
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticles()
  },
  mounted () {},
  methods: {
    //   获取评论管理信息
    getArticles () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.pagerCount, per_page: this.page.pageSize }
      }).then(res => {
        this.tableData = res.data.data.results
        this.page.total = res.data.data.total_count
        this.page.pageSize = res.data.data.per_page
        this.page.pagerCount = res.data.data.page
        this.loading = false
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭评论
    open (row) {
      const mess = row.comment_status
      this.$confirm(`确定要${mess ? '关闭' : '打开'}评论吗？`).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'PUT',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getArticles()
        })
      })
    },
    // 分页功能
    changePage (newPage) {
      this.page.pagerCount = newPage
      this.getArticles()
    }
  }
}
</script>

<style scoped lang="less"></style>
