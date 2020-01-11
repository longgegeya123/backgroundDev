 <template>
  <div>
    <div id="main" :style="{width:'100%',height:'500px'}"></div>
  </div>
</template>

<script>
import Product from "../../../../axiosBr/product/product_servies";

const _product = new Product();
import echarts from "echarts";
export default {
  data() {
    return {
      token: this.$store.state.tokenr,
      legend: [],
      series: [],
      xAxis: [],
      yAxis: []
    };
  },
  mounted() {
    /* ECharts图表 */
    _product.statis(this.token).then(res => {
      console.log(res);
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: res.data.data.legend.data
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: res.data.data.xAxis[0].data
          }
        ],
        yAxis: [
          {
            type: res.data.data.yAxis[0].type
          }
        ],
        series: res.data.data.series
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style>
</style>