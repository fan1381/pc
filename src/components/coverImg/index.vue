<template>
  <div class="box">
    <div
      class="img"
      v-for="(item, index) in list"
      :key="index"
      @click="openDialog(index)"
    >
      <img :src="item" alt="" />
    </div>
    <el-dialog
      title="请选择"
      :visible.sync="dialog"
      :before-close="closeDialog"
    >
      <el-tabs v-model="tabs">
        <el-tab-pane label="素材库" name="material">
          <div class="material ">
            <el-card class="card" v-for="(item, index) in img" :key="index">
              <img @click="material(index)" :src="item.url" alt="" />
            </el-card>
          </div>
        </el-tab-pane>

        <el-tab-pane label="上传" class="load" name="upload">
          <el-upload
            :http-request="uploads"
            :show-file-list="false"
            action=""
            class="upload"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['list'],
  components: {},
  data () {
    return {
      dialog: false,
      img: [], // 素材库
      tabs: 'material',
      pinkIndex: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getImg()
    console.log(+8888)
  },
  mounted () {},
  methods: {
    openDialog (index) {
      this.dialog = true
      this.pinkIndex = index
    },
    closeDialog () {
      this.dialog = false
    },
    // 素材库图片
    getImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false
        }
      }).then(res => {
        this.img = res.data.data.results
      })
    },
    // 点击素材库图片在父组件预览
    material (index) {
      const url = this.img[index].url
      const pink = this.pinkIndex
      this.list[pink] = url
      this.dialog = false
    },
    // 上传功能
    uploads (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        const uploadUrl = res.data.data.url
        const index = this.pinkIndex
        this.list[index] = uploadUrl
        this.dialog = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.box {
  display: flex;
}
.img {
  width: 200px;
  height: 200px;
  background: pink;
  border: 1px solid #ccc;
  margin: 5px;
  //   opacity: 0.7;
  img {
    width: 100%;
    height: 100%;
  }
}
// 上传
.load {
  display: flex;
  justify-content: center;
}
.upload {
  width: 200px;
  height: 200px;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 100px;
  }
}
.material {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .card {
    width: 140px;
    height: 140px;
    background-color: #ff0000;
    margin: 10px 10px;
    opacity: 0.5;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
