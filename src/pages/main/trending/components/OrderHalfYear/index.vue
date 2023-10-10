<template>
  <div class="m-item">
    <item-title title="养老关怀服务" />
    <div class="m-content">
      <div id="rowCharts-top5-ll5" v-if="checkNum == 1"></div>
      <div v-if="checkNum == 2">
        <!-- <div class="chartsPercent">
          <span class="percent">{{ maxPercent }}</span>
          <span class="service">{{ maxName }}</span>
        </div> -->
        <Circle :id="'67899'" :dataList="dataList"></Circle>
      </div>
      <div class="checkBox">
        <span
          :class="['check_item', checkNum == 1 ? 'isChecked' : '']"
          @click="checkBox(1)"
          >日间养老</span
        >
        <span
          :class="['check_item', checkNum == 2 ? 'isChecked' : '']"
          @click="checkBox(2)"
          >照护服务</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import Circle from "./CricleThree.vue";
import ItemTitle from "../ItemTitle.vue";
import { queryDayCare, careService } from "/@/api/futureService";
const timer = ref(null);

const dateStrList = ref([]);
const bedReservationTotalList = ref([]);
const serviceReservationTotalList = ref([]);
const maxPercent = ref("48%");
const maxName = ref("商业服务");
const dataList = ref([
  {
    name: "商业服务",
    y: 10,
    h: 20,
    bfb: 1.5,
  },
  {
    name: "政务服务",
    y: 8,
    h: 10,
    bfb: 2,
  },
  {
    name: "物业服务",
    y: 10,
    h: 10,
    bfb: 1,
  },
]);

onMounted(() => {
  queryDayCare().then((res) => {
    if (res.code === 0) {
      let month = new Date().getMonth() + 1;
      for (let i = 0; i < 6; i++) {
        --month;
        if (month == 0) {
          month = 12;
        }
        dateStrList.value.unshift(month + "月");
      }
      console.log(dateStrList.value, 555);
      res.data.map((item) => {
        // dateStrList.value.push(item.dateStr);
        bedReservationTotalList.value.push(item.bedReservationTotal);
        serviceReservationTotalList.value.push(item.serviceReservationTotal);
      });
    } else {
      dateStrList.value = ["1月", "2月", "3月", "4月", "5月", "6月"];
      bedReservationTotalList.value = [33, 20.2, 9.5, 15, 18, 23];
      serviceReservationTotalList.value = [33, 20.2, 9.5, 15, 18, 23];
    }

    setTimeout(() => {
      echartInit();
    });
  }).catch((err)=>{
      console.log(err)
   }).finally(()=>{
     
   }) ;

  careService().then((res) => {
    if (res.code == 0) {
      res.data.valueNameVos.map((item) => {
        item.y = item.value;
        item.h = item.value;
      });
      dataList.value = res.data.valueNameVos;
      let arr = res.data.valueNameVos;
      let maxNum = arr[0].value;
      let maxIndex = 0;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].value > maxNum) {
          maxNum = arr[i].value;
          maxIndex = i;
        }
      }
      setTimeout(() => {
        maxPercent.value = arr[0].proportion;
        maxName.value = arr[0].name;
      });
      // let i = 0;
      // timer.value = setInterval(() => {
      //   maxPercent.value = arr[i].proportion;
      //   maxName.value = arr[i].name;
      //   // dataList.value[i].h = 40;
      //   if (i < arr.length - 1) {
      //     i++;
      //   } else {
      //     i = 0;
      //   }
      // }, 3000);
    }
  }).catch((err)=>{
      console.log(err)
   }).finally(()=>{
     
   });
});

const data = {
  myChart: null,
  timer: null,
  currentIndex: 0,
  option: {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8000)",
      formatter: (params) => {
        let res = `<h3 style="font-size:14px;line-height:14px;font-weight:400;color:#fff;">${params[0].name}</h3>`;
        if (params[2] && params[2].data) {
          res += `<h3 style="font-size:14px;line-height:14px;margin-top:13px;color:#fff;"><span style="width:6px;height:6px;border-radius:2px;background:#69E3FF;margin-top: -6x;display: inline-block;margin: 3px;"></span>&nbsp;&nbsp;床位预约： ${params[0].data}</h3>`;
          res += `<h3 style="font-size:14px;line-height:14px;margin-top:13px;color:#fff;"><span style="width:6px;height:6px;border-radius:2px;background:#74FFDC;margin-top: -6x;display: inline-block;margin: 3px;"></span>&nbsp;&nbsp;服务预约： ${params[3].data}</h3>`;
        } else return ""; //y轴上的第一组数据不显示tooltip
        return res;
      },
      borderColor: "rgba(39, 51, 79, 1)",
      borderWidth: 2,
      textStyle: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
      },
      axisPointer: {
        type: "shadow",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      show: true,
      right: 15,
      top: 0,
      icon: "circle",
      itemHeight: 10,
      itemWidth: 10,
      itemGap: 12,
      textStyle: {
        color: "#B2C1E8",
        fontSize: 14,
      },
      selectedMode: false,
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: dateStrList.value,
      boundaryGap: [0, 0.01],
      axisLabel: {
        //x轴文字的配置
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "",
        min: 0,
        max: 60,
        interval: 10,
        axisLabel: {
          color: "#B2C1E8",
          formatter: "{value} ",
        },
        splitLine: {
          lineStyle: {
            color: "#ffffff",
            type: "dashed",
            opacity: 0.1,
          },
        },
      },
      {
        type: "value",
        name: "",
        min: 0,
        max: 60,
        interval: 10,
        splitLine: {
          lineStyle: {
            color: "#ffffff",
            type: "dashed",
            opacity: 0.1,
          },
        },
        axisLabel: {
          color: "#B2C1E8",
          formatter: "{value}",
        },
      },
    ],

    series: [
      {
        //下半截柱子
        name: "床位预约",
        type: "bar",
        barWidth: 16,
        yAxisIndex: 0,
        itemStyle: {
          //lenged文本
          opacity: 1,
          color: (params) => {
            return new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              [
                {
                  offset: 0,
                  color: "#69E3FF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#03ACFF", // 100% 处的颜色
                },
              ],
              false
            );
          },
        },
        data: bedReservationTotalList.value,
        label: {
          normal: {
            color: "#fff",
            show: false,
            position: [0, "-18px"],
            textStyle: {
              fontSize: 14,
            },
            formatter: function (a, b) {
              return a.name;
            },
          },
        },
      },
      {
        //数据圆片
        name: "",
        type: "pictorialBar",
        yAxisIndex: 0,
        symbolSize: [16, 8],
        symbolOffset: [-10, -5],
        z: 3,
        itemStyle: {
          opacity: 1,
          color: "rgb(27, 140, 255)",
        },
        symbolPosition: "end",
        data: bedReservationTotalList.value,
        label: {
          show: false,
          color: "rgba(255, 255, 255, 0.8)",
          position: ["326px", "-12px"],
          textStyle: {
            fontSize: 18,
          },
        },
      },
      {
        //最左圆片
        name: "",
        type: "pictorialBar",
        symbolSize: [16, 8],
        yAxisIndex: 0,
        symbolOffset: [-10, 0],
        z: 3,
        itemStyle: {
          opacity: 1,
          color: "#03ACFF",
        },
        symbolPosition: "end",
        data: [1, 1, 1, 1, 1, 1],
      },
      {
        //下半截柱子
        name: "服务预约",
        type: "bar",
        yAxisIndex: 1,
        barWidth: 16,
        barGap: "20%",
        itemStyle: {
          //lenged文本
          opacity: 1,
          color: (params) => {
            return new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              [
                {
                  offset: 0,
                  color: "#74FFDC", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#00FFBF", // 100% 处的颜色
                },
              ],
              false
            );
          },
        },
        data: serviceReservationTotalList.value,
        label: {
          normal: {
            color: "#fff",
            show: false,
            position: [0, "-18px"],
            textStyle: {
              fontSize: 14,
            },
            formatter: function (a, b) {
              return a.name;
            },
          },
        },
      },
      {
        //数据圆片
        name: "",
        type: "pictorialBar",
        yAxisIndex: 1,
        symbolSize: [16, 8],
        symbolOffset: [10, -5],
        z: 3,
        itemStyle: {
          opacity: 1,
          color: "#06B88C",
        },
        symbolPosition: "end",
        data: serviceReservationTotalList.value,
        label: {
          show: false,
          color: "rgba(255, 255, 255, 0.8)",
          position: ["326px", "-12px"],
          textStyle: {
            fontSize: 18,
          },
        },
      },
      {
        //最左圆片
        name: "",
        type: "pictorialBar",
        symbolSize: [16, 8],
        symbolOffset: [10, 0],
        z: 3,
        itemStyle: {
          opacity: 1,
          color: "#00FFBF",
        },
        symbolPosition: "end",
        data: [1, 1, 1, 1, 1, 1],
      },
    ],
  },
};

let myChart = null;
const echartInit = () => {
  const chartDom = document.getElementById("rowCharts-top5-ll5");
  myChart = echarts.init(chartDom);
  myChart.setOption(data.option);
};

const checkNum = ref(1);
const checkBox = (num) => {
  checkNum.value = num;
};
watch(checkNum, (newValue, oldValue) => {
  if (newValue == 1) {
    clearInterval(timer.value);
    setTimeout(() => {
      echartInit();
    });
  } else {
    maxPercent.value = dataList.value[0].proportion;
    maxName.value = dataList.value[0].name;
    let i = 0;
    timer.value = setInterval(() => {
      maxPercent.value = dataList.value[i].proportion;
      maxName.value = dataList.value[i].name;
      // dataList.value[i].h = 40;
      if (i < dataList.value.length - 1) {
        i++;
      } else {
        i = 0;
      }
    }, 3000);
  }
});

onMounted(() => {
  echartInit();
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style lang="scss" scoped>
.m-item {
  width: 480px;
  background: linear-gradient(
    90deg,
    rgba(32, 140, 255, 0.2) 0%,
    rgba(32, 140, 255, 0) 100%
  );
}
.m-content {
  position: relative;
  padding: 24px 0 25px 0;
  margin-left: 12px;
  box-sizing: border-box;
  .checkBox {
    position: absolute;
    color: #fff;
    line-height: 20px;
    top: 20px;
    left: 0;
    .check_item {
      width: 150px;
      padding: 5px 10px;
      font-family: "E-Charts";
      color: #ddd;
      background: url("@/assets/img/echarts/langbox.png") no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .isChecked {
      color: #fff;
      background: linear-gradient(180deg, #00bcff 0%, #00698e 100%);
    }
  }
  .chartsPercent {
    position: absolute;
    top: 97px;
    left: 173px;
    display: flex;
    text-align: center;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    z-index: 100;
    .service {
      font-family: PingFangSC-Regular, PingFang SC;
    }
    .percent {
      font-family: "E-Charts";
      font-size: 32px;
      margin-bottom: -10px;
    }
  }
}
#rowCharts-top5-ll5 {
  width: 450px;
  height: 270px;
}
</style>
