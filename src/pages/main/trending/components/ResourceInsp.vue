<template>
  <div class="m-item">
    <item-title title="资源监控" />
    <div class="m-content">
      <div class="item" v-for="(item, index) in list" :key="item.title">
        <div class="title">{{ item.title }}</div>
        <div class="pie-charts" :id="'pie-charts-insp_' + index"></div>
        <div class="pie-center">
          <p>正常</p>
          <p>
            {{
              (
                +item.data[0].value /
                (+item.data[0].value +
                  +item.data[1].value +
                  +item.data[2].value)
              ).toFixed(2) *
                100 +
              "%"
            }}
          </p>
        </div>
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

const list = [
  {
    title: "云主机",
    data: [
      {
        label: "正常",
        value: "95",
      },
      {
        label: "数据不足",
        value: "2",
      },
      {
        label: "报警",
        value: "3",
      },
    ],
  },
  {
    title: "云数据库",
    data: [
      {
        label: "正常",
        value: "90",
      },
      {
        label: "数据不足",
        value: "5",
      },
      {
        label: "报警",
        value: "5",
      },
    ],
  },
  {
    title: "负载均衡",
    data: [
      {
        label: "正常",
        value: "92",
      },
      {
        label: "数据不足",
        value: "8",
      },
      {
        label: "报警",
        value: "0",
      },
    ],
  },
  {
    title: "对象存储",
    data: [
      {
        label: "正常",
        value: "100",
      },
      {
        label: "数据不足",
        value: "0",
      },
      {
        label: "报警",
        value: "0",
      },
    ],
  },
];

function generateOptionByData(data) {
  return {
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
    color: ["#1278FD", "#E9CE39", "#F24343"],
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
        data: data.map((item) => {
          return {
            name: item.label,
            value: +item.value,
          };
        }),
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
  };
}

let myChart = null;
const echartInit = () => {
  list.map((item, index) => {
    const chartDom = document.getElementById("pie-charts-insp_" + index);
    const c = echarts.init(chartDom);
    c.setOption(generateOptionByData(item.data));
  });
};

onMounted(() => {
  echartInit();
});
</script>

<style lang="scss" scoped>
.m-item {
  width: 100%;
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
  padding: 34px 87px 0 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;

  .item {
    width: 166px;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    .title {
      padding: 0 6px;
      display: flex;
      align-items: center;
      width: 25px;
      height: 88px;
      line-height: 15px;
      font-size: 13px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      box-sizing: border-box;
      background: url("/@/assets/images/t_bg.png") 0 0/100% 100% no-repeat;
    }
    .pie-charts {
      width: 136px;
      height: 136px;
    }
    .pie-center {
      position: absolute;
      right: 54px;
      top: 46px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #ffffff;
      line-height: 21px;
    }
  }
  // .item:first-child {
  //   position: absolute;
  //   left: 20px;
  //   top: 20px;
  // }

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
</style>
