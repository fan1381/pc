<template>
  <div class="">
    <el-card>
      <!-- 面包 -->
      <crumb slot="header">
        <div slot="title"></div>
      </crumb>

      <div ref="app" style="width:600px;height:300px;"></div>

      <!-- <div id="container">
        <div v-for="(item, index) in list" :key="index" class="item item-i">
          {{ index + 1 }}
        </div>
        <div class="item"></div>
      </div> -->
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      // list: 20
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.get()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const myChart = echarts.init(this.$refs.app)
      myChart.setOption(this.option)
    },
    get () {
      this.$axios({
        url: 'statistics/followers'
      }).then(res => {
        console.log(res.data.data)
        const list = res.data.data.age

        for (const i in list) {
          const data = list[i]
          this.option.series[0].data.push(data)
        }
        console.log(this.option.series[0].data)
      })
    }
  }
}
</script>

<style scoped lang="less">
#container {
  display: grid;
  grid-template-columns: repeat(7, 100px);
  grid-template-rows: repeat(3, 100px);
  grid-column-gap: 20px;
  grid-template-areas:
    "a b c"
    "d e f"
    "g h i";
  justify-content: center;
  align-items: end;
}

.item {
  font-size: 32px;
  text-align: center;
  border: 1px solid #e5e4e9;
}

.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}
.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
}
.item-9 {
  grid-area: e;
  background-color: pink;
}
</style>
