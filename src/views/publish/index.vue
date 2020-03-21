<template>
  <div class="">
    <el-card v-loading="loading"
      ><!-- 面包 -->
      <crumb slot="header">
        <div slot="title">
          发布文章
        </div>
      </crumb>
      <!-- 内容 -->
      <el-form
        ref="myForm"
        :model="form"
        :rules="rules"
        style="margin-left:50px"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" style="width:60%"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <quill-editor
            v-model="form.content"
            style="height:300px;margin-bottom:100px"
          ></quill-editor>
        </el-form-item>

        <el-form-item label="封面" prop="cover">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 封面组件 -->
        <el-form-item>
          <cover-img :list='form.cover.images'></cover-img>
        </el-form-item>

        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="form.channel_id">
            <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="send">发布</el-button>
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
  components: {

  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      rules: {
        title: [{ required: true, message: '不能为空' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      },
      loading: false
    }
  },
  computed: {},
  watch: {
    'form.cover.type': function () {
      if (this.form.cover.type === -1 || this.form.cover.type === 0) {
        this.form.cover.images = []
      } else if (this.form.cover.type === 1) {
        this.form.cover.images = ['']
      } else if (this.form.cover.type === 3) {
        this.form.cover.images = ['', '', '']
      }
    }
  },
  created () {
    this.getChannels()
  },
  mounted () {},
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      })
    },
    send () {
      this.$refs.myForm.validate(yes => {
        if (yes) {
          this.loading = true
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft: false },
            data: this.form
          })
            .then(res => {
              this.loading = false
              this.$message('发布成功')
              // this.$router.push('/home/articles')
            })
            .catch(() => {
              this.loading = false
              this.$message('发布失败')
            })
        }
      })
    }

  }
}
</script>

<style scoped lang="less"></style>
