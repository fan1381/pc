<template>
  <div class="">
    <!-- 大容器 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside style="min-height:100vh;background-color:#353b4e;width:230px">
        <left></left>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <el-header>
          <headers></headers>
        </el-header>

        <el-main>
          1
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
