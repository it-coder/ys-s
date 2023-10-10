<template>
  <div class="item">
    <div class="item-title">巡检次数分布</div>
    <div class="item-content">
      <div
        id="chart-insp-times"
        :style="{ width: '100%', height: '250px' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, watch } from "vue";

const props = defineProps({
  data: Array,
});

let myChart = null;

watch(
  () => props.data,
  () => {
    if (!myChart) {
      myChart = echarts.init(document.getElementById("chart-insp-times"));
    }
    setOptions();
  }
);

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(document.getElementById("chart-insp-times"));
});

const setOptions = () => {
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      textStyle: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
      },
      backgroundColor: "rgba(0, 0, 0, 0.8000)",
      borderColor: "rgba(39, 51, 79, 1)",
      borderWidth: 2,
    },

    grid: {
      right: 25,
      left: 40,
    },
    xAxis: [
      {
        type: "category",
        data: props.data.map((item) => item.areaName),
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          interval: 0,
          rotate: 40,
          color: "#EFF4FF",
          fontSize: 12,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "rgba(189, 198, 216, 0.6)",
          formatter: "{value}",
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(108, 128, 151, 0.30)",
          },
        },
      },
    ],
    series: [
      {
        name: "巡检次数",
        type: "bar",
        barWidth: 11,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(45, 77, 103, .35)",
        },
        barBorderRadius: 2,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 255, 255, 1)",
              },
              {
                offset: 1,
                color: "rgba(105, 193, 255, 0)",
              },
            ],
          },
        },
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: props.data.map((item) => +item.data),
      },
    ],
  });
};
</script>
<style lang="scss" scoped>
.item-title {
  position: relative;
  width: 100%;
  height: 42px;
  line-height: 42px;
  background-size: 420px 42px;
  background: url("/@/assets/images/analyze/item_title_bg.png") 0 0/100% 100%
    no-repeat;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  padding-left: 30px;
  box-sizing: border-box;
}
</style>
