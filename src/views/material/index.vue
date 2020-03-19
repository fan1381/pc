<template>
  <div class="">
    <el-card v-loading="loading">
      <!-- 面包屑 -->
      <crumb slot="header">
        <template slot="title">
          素材管理
        </template>
      </crumb>

      <el-row type="flex" justify="end">
        <el-upload action="" :http-request="uploadImg">
          <el-button size="small" type="primary" >点击上传</el-button>
        </el-upload>
      </el-row>

      <el-row>
        <el-tabs v-model="activeName" @tab-click="changeTabs">
          <el-tab-pane label="全部图片" name="all">
            <div class="one">
              <el-card class="card" v-for="(item, index) in img" :key="index">
                <img @click="clickImg(index)" :src="item.url" alt="" />
                <el-row class="row">
                  <i
                    class="el-icon-star-on"
                    @click="collects(item)"
                    :style="{ color: item.is_collected ? 'red' : '#000' }"
                  ></i>
                  <i class="el-icon-delete-solid" @click="deletes(item.id)"></i>
                </el-row>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="收藏图片" name="collect">
            <div class="one">
              <el-card class=" card" v-for="item in img" :key="item.id">
                <img @click="openDialog(index)" :src="item.url" alt />
              </el-card>
            </div>
          </el-tab-pane>
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
    <!-- 弹层走马灯 -->
    <el-dialog @opened="open" :visible.sync="dialogVisible" width="60%">
      <template>
        <el-carousel ref="open" :interval="4000" type="card" height="400px">
          <el-carousel-item
            v-for="(item, index) in img"
            :key="index"
            class="qq"
          >
            <div class="medium">
              <img :src="item.url" alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
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
      },
      loading: false, // 收藏状态
      dialogVisible: false, // 弹层状态
      index: 0 // 走马灯的索引
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
          collect: this.activeName === 'collect',
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
    },
    // 收藏或取消收藏
    async collects (item) {
      this.loading = true
      await this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: {
          collect: !item.is_collected
        }
      })
      this.loading = false
      this.getImg()
    },
    // 删除
    async deletes (id) {
      // this.loading = true
      await this.$confirm('确定删除？')
        .then(() => {
          this.$axios({
            method: 'delete',
            url: `/user/images/${id}`
          }).then(() => {
            this.getImg()
          })
        })
        .catch(() => {})

      // this.loading = false
    },
    // 打开弹层记录索引
    clickImg (index) {
      this.dialogVisible = true
      this.index = index
    },
    // 打来弹层的回调，来手动修改轮播的图片的开始位置
    open () {
      this.$refs.open.setActiveItem(this.index)
    },
    // 上传
    uploadImg (params) {
      this.loading = true
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.loading = false
        this.$message('上传成功')
        this.getImg()
      })
    }
  }
}
</script>

<style scoped lang="less">
.one {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;

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
// 走马灯
.el-carousel__item div {
  color: #475669;
  opacity: 0.75;
  margin: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.qq {
  height: 100%;
}
.medium {
  height: 100%;
}
</style>
