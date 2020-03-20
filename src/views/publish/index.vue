<template>
  <div class="">
    <el-card>
      <!-- 面包 -->
      <crumb slot="header">
        <div slot="title">
          发布文章
        </div>
      </crumb>
      <!-- 内容 -->
      <el-form style="margin-left:50px" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="form.title" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <quill-editor v-model="form.cotent" style="height:300px;margin-bottom:100px" ></quill-editor>
        </el-form-item>

        <el-form-item label="封面">
            <el-radio-group v-model="form.radio">
                 <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
            <el-select v-model="channels.id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary">发布</el-button>
            <el-button>存草稿</el-button>
        </el-form-item>
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
    return {
      form: {
        title: '',
        cotent: '',
        radio: 0
      },
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getChannels()
  },
  mounted () {},
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
