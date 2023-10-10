<template>
  <div class="item">
    <div class="item-title">处理情况</div>
    <div class="item-content">
      <div
        id="chart-resolve-times"
        :style="{ width: '100%', height: '250px' }"
      ></div>
    </div>
    <div class="tips">
      <div class="tip-item">
        <span class="rr"></span>
        复核数
      </div>
      <div class="tip-item">
        <span class="rc"></span>
        整改数
      </div>
      <div class="tip-item">
        <span class="lr"></span>
        复核率
      </div>
      <div class="tip-item">
        <span class="lc"></span>
        整改率
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, watch } from "vue";

const props = defineProps({
  data: Object,
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
  myChart = echarts.init(document.getElementById("chart-resolve-times"));
  // 绘制图表
});

const setOptions = () => {
  myChart.setOption({
    tooltip: {
      show: true,
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
      formatter: (params) => {
        var res = // 字符串形式的html标签会被echarts转换渲染成数据，这个res主要是画的tooltip里的上部分的标题部分
          "<div style='margin-bottom:5px;padding:0 12px;width:160px;height:24px;line-height:24px;border-radius:3px;'><p>" +
          params[0].name +
          " </p></div>";
        const backgroundList = [
          "linear-gradient(180deg, #3968BA 0%, #0B2E8D 100%)",
          "linear-gradient(180deg, #7B97D0 0%, #2E4DA7 100%)",
          "#00ffff",
          "#FFAB38",
        ];
        for (var i = 0; i < params.length; i++) {
          //因为是个数组，所以要遍历拿到里面的数据，并加入到tooltip的数据内容部分里面去
          res += `<div style="color: #fff;font-size: 14px; padding:0 6px;line-height: 24px; display: flex; align-items: center">
                      <span style="display:inline-block;margin-right:7px;border-radius:50%;width:10px;height:${
                        i > 1 ? 2 : 10
                      }px;background:${backgroundList[i]};"></span>
                      ${params[i].seriesName}
                      <span style="text-align: right; flex: 1">${
                        params[i].data
                      }${i > 1 ? "%" : ""}</span>
                    </div>`;
        }
        return res;
      },
    },

    // grid: {
    //   right: 25,
    //   left: 40,
    // },

    xAxis: [
      {
        type: "category",
        data: props.data?.handleALl?.map((item) => item.areaName),
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
        splitLine: { show: false },
      },
      {
        type: "value",
        axisLabel: {
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
        name: "复核数",
        type: "bar",
        barWidth: 11,
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
                color: "rgba(57, 104, 186, 1)",
              },
              {
                offset: 1,
                color: "rgba(28, 81, 254, 1)",
              },
            ],
          },
        },
        data: props.data?.reviewAll?.map((item) => +item.data),
      },
      {
        name: "整改数",
        type: "bar",
        barWidth: 11,
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
                color: "rgba(194, 208, 255, 1)",
              },
              {
                offset: 1,
                color: "rgba(77, 109, 204, 1)",
              },
            ],
          },
        },
        data: props.data?.handleALl?.map((item) => +item.data),
      },
      {
        name: "复核及时率",
        type: "line",
        yAxisIndex: 1,
        symbol: "none",
        lineStyle: {
          color: "#00FFFF",
          type: "dashed",
        },

        data: props.data?.inTimeReview?.map((item) => +item.data),
      },
      {
        name: "整改及时率",
        type: "line",
        yAxisIndex: 1,
        symbol: "none",
        lineStyle: {
          color: "#FFAB38",
        },
        data: props.data?.inTimeHandle?.map((item) => +item.data),
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
.tips {
  // margin-top: 6px;
  margin-bottom: 27px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .tip-item {
    margin: 0 15px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 12px;
    display: flex;
    align-items: center;
    > span {
      margin-right: 3px;
    }
    .rr,
    .rc {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 4px;
    }
    .rr {
      background: linear-gradient(180deg, #3968ba 0%, #0b2e8d 100%);
    }
    .rc {
      background: linear-gradient(180deg, #7b97d0 0%, #2e4da7 100%);
    }
    .lr,
    .lc {
      display: inline-block;
      width: 8px;
      height: 2px;
    }
    .lr {
      background: #00ffff;
    }
    .lc {
      background: #ffab38;
    }
  }
}
</style>
