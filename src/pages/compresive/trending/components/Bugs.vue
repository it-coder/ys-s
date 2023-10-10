<template>
  <div class="m-item">
    <item-title title="漏洞（最近7天）" />
    <div class="m-content">
      <div class="circle-chart">
        <div class="pie-ech">
          <div id="pie-charts-act-ll3"></div>
          <div class="indicator">
            <p class="indicator-num">{{ data.echTotal }}</p>
            <p class="indicator-title">总量</p>
          </div>
          <ul class="legend-box">
            <li
              v-for="(item, index) in data.option.series[0].data"
              :key="index"
            >
              <span :style="{ background: data.option.color[index] }"></span>
              <span>{{ item.name }}</span>
              <span :style="{ color: data.option.color[index] }">{{
                item.value
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="line-chart">
        <div id="line-charts-ll0"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ItemTitle from "./ItemTitle.vue";
import * as echarts from "echarts";
import { reactive, onMounted, onBeforeUnmount, ref, nextTick } from "vue";
const title = ref("");
const liHeight = ref("");

const data = reactive({
  echTotal: 100,
  myChart: null,
  timer: null,
  currentIndex: 0,
  total: 385,
  option: {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0, 0, 0, 0.8000)",
      borderColor: "rgba(39, 51, 79, 1)",
      borderWidth: 2,
      formatter: (params) => {
        return `${params.marker} ${params.name}: ${params.value}<br />&nbsp;&nbsp;&nbsp;&nbsp;占比: ${params.percent}%`;
      },
      textStyle: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
      },
    },
    legend: {
      show: false,
      orient: "vertical",
      right: 10,
      top: 10,
      icon: "circle",
      itemHeight: 10,
      itemWidth: 10,
      itemGap: 12,
      textStyle: {
        color: "#B2C1E8",
        fontSize: 14,
      },
    },
    color: ["#D03939", "#EAB966", "#7CC8EE"],
    series: [
      {
        type: "pie",
        radius: ["62%", "75%"],
        center: ["50%", "50%"],
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        // itemStyle: {
        //   borderColor: "#0b192a",
        //   borderWidth: 2,
        // },
        data: [
          {
            name: "需紧急修复",
            value: 192,
          },
          {
            name: "可延后修复",
            value: 79,
          },
          {
            name: "暂可不修复",
            value: 0,
          },
        ],
      },
      {
        type: "pie",
        radius: ["82%", "86%"],
        center: ["50%", "50%"],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        tooltip: {
          show: false,
        },
        itemStyle: {
          color: "rgba(255,255,255,0.1)",
        },
        data: [
          {
            value: 1,
          },
        ],
      },
    ],
  },
});

const lineData = reactive({
  stoppingAmount: 51,
  parkingSpaceAmount: 20,
  leisureAmount: 29,
  stabilizationPay: 666,
  temporaryPay: 666,
  myChart: null,
  option: {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8000)",
      borderColor: "rgba(39, 51, 79, 1)",
      borderWidth: 2,
      textStyle: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
      },
    },
    // legend: {
    //   right: "5%",
    //   icon: "circle",
    //   itemHeight: 8,
    //   itemWidth: 8,
    //   textStyle: {
    //     color: "#EFF4FF",
    //   },
    //   data: ["当日积分发放", "当日积分兑换"],
    // },
    color: ["#D03939", "#EAB966", "#7CC8EE"],
    grid: {
      top: "40",
      bottom: "40",
      left: "40",
      right: "40",
    },
    xAxis: {
      type: "category",
      data: ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6"],
      axisTick: false,
      axisLabel: {
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontWeight: 400,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "rgba(189, 198, 216, 0.6)",
        fontSize: 12,
        fontWeight: 400,
      },
      splitLine: {
        lineStyle: {
          color: "#ffffff",
          type: "dashed",
          opacity: 0.1,
        },
      },
    },
    series: [
      // {
      //   name: "当日积分数",
      //   type: "line",
      //   symbol: "none",
      //   legendHoverLink: false,
      //   smooth: true,
      //   areaStyle: {
      //     color: {
      //       type: "linear",
      //       x: 0,
      //       y: 0,
      //       x2: 0,
      //       y2: 1,
      //       colorStops: [],
      //     },
      //   },
      //   data: [40, 50, 60, 40, 50, 60],
      // },
      {
        name: "当日积分发放",
        type: "line",
        symbol: "none",
        legendHoverLink: false,
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [],
          },
        },
        data: [30, 35, 40, 30, 35, 40],
      },
      {
        name: "当日积分兑换",
        type: "line",
        symbol: "none",
        legendHoverLink: false,
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [],
          },
        },
        data: [10, 20, 10, 20, 10, 20],
      },
    ],
  },
  length: 6,
  currentIndex: 0,
  timer: null,
});

let myLineChart = null;

const lineEchartInit = () => {
  const chartDom = document.getElementById("line-charts-ll0");
  myLineChart = echarts.init(chartDom);
  myLineChart.setOption(lineData.option);
};

let myChart = null;

onBeforeUnmount(() => {
  if (data.timer) {
    clearInterval(data.timer);
  }
});

const echartInit = () => {
  const chartDom = document.getElementById("pie-charts-act-ll3");
  myChart = echarts.init(chartDom);
  myChart.setOption(data.option);
  autoPlay();
};

const autoPlay = () => {
  if (!data.timer) {
    data.timer = setInterval(() => {
      playAction();
      data.currentIndex++;
      if (data.currentIndex >= data.option.series[0].data.length) {
        data.currentIndex = 0;
      }
    }, 5000);
  }
  playAction();
  data.currentIndex++;
};
const playAction = () => {
  //显示tooltip
  myChart.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: data.currentIndex,
  });
  //取消高亮
  myChart.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
  });
  //高亮
  myChart.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: data.currentIndex,
  });
};

onMounted(() => {
  echartInit();
  lineEchartInit();
});
</script>
<style lang="scss" scoped>
.m-item {
  width: 483px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  background: linear-gradient(
    90deg,
    rgba(32, 140, 255, 0.2) 0%,
    rgba(32, 140, 255, 0) 100%
  );
}
.m-content {
  // width: 480px;
  // padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  img {
    width: 100%;
  }
  // span {
  //   width: 90%;
  //   position: absolute;
  //   top: 16px;
  //   color: #fff;
  //   text-align: center;
  //   font-size: 18px;
  //   font-family: "E-Charts";
  // }
}
.circle-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 153px;
}

.indicator {
  top: 20%;
  width: 100%;
  text-align: center;
  position: absolute;
}
.indicator-title {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-align: center;
}
.indicator-num {
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-weight: 600;
  display: block;
  text-align: center;
  font-family: YouSheBiaoTiHei-Regular;
  font-family: PangMenZhengDao;
}

.pie-ech {
  position: relative;
  width: 100%;
}
#pie-charts-act-ll3 {
  width: 100%;
  height: 153px;
}

#line-charts-ll0 {
  width: 345px;
  height: 240px;
  margin-top: 0px;
  margin-left: -25px;
}

.legend-box {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.legend-box > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.legend-box > li {
}
.legend-box > li > span:nth-child(1) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.legend-box > li > span:nth-child(2) {
  font-size: 14px;
  font-weight: 400;
  width: 80px;
  color: #b2c1e8;
  line-height: 15px;
  margin: 0 9px 0 16px;
  place-self: center start;
}
.legend-box > li > span:nth-child(3) {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  width: 30px;
  line-height: 20px;
  text-align: left;
  place-self: center end;
}
</style>
