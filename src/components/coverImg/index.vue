<template>
  <div class="box">
    <div
      @click="openDialog"
      class="img"
      v-for="(item, index) in list"
      :key="index"
    >
      <!-- <span>点击添加图片</span> -->
    </div>
    <el-dialog
      title="请选择"
      :visible.sync="dialog"
      :before-close="closeDialog"
    >
      <el-tabs v-model="tabs">
        <el-tab-pane label="素材库" name="material">
          <div class="material ">
            <el-card class="card" v-for="item in img" :key="item.id">
              <img :src="item.url" alt="" />
            </el-card>
          </div>
        </el-tab-pane>

        <el-tab-pane label="上传" class="load" name="upload">
          <el-upload :show-file-list="false" action="" class="upload">
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
      img: [],
      tabs: 'material'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getImg()
  },
  mounted () {},
  methods: {
    openDialog () {
      this.dialog = true
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
        console.log(this.img)
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
