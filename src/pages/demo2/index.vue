<template>
  <div class="container">
    <p>charts</p>
    <div id="echart1" :style="{ width: '400px', height: '250px' }"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, watch, nextTick } from "vue";

let myChart = null;

const data = [
  {
    areaName: 1,
    data: 2,
  },
  {
    areaName: 1,
    data: 2,
  },
  {
    areaName: 1,
    data: 2,
  },
];

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(document.getElementById("echart1"));
  setOptions();
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
        data: data.map((item) => item.areaName),
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
        data: data.map((item) => +item.data),
      },
    ],
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
