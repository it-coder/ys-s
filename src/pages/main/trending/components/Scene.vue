<template>
  <div class="m-item">
    <item-title title="态势感知" />
    <div class="m-content">
      <div class="chart-row">
        <div id="row1Charts188_1"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import * as echarts from "echarts";
import axios from "axios";
import ItemTitle from "./ItemTitle.vue";
const data = reactive({
  myChart: null,
  timer: null,
  currentIndex: 0,
  option: {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8000)",
      borderColor: "rgba(39, 51, 79, 1)",
      borderWidth: 2,
      textStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 14,
      },
    },
    legend: {
      show: false,
    },
    grid: {
      top: "40",
      bottom: "40",
      left: "50",
      right: "20",
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
      axisTick: false,
      axisLabel: {
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontWeight: 400,
      },
    },
    yAxis: {
      name: "",
      nameTextStyle: {
        padding: [0, 6, 0, 0],
        fontSize: 12,
      },
      type: "value",
      axisLabel: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 14,
        fontWeight: 400,
        formatter: function (value) {
          return value + "";
        },
      },
      splitLine: {
        lineStyle: {
          color: "#ffffff",
          type: "dashed",
          opacity: 0.1,
        },
      },
      splitNumber: 3,
    },
    series: [
      {
        type: "line",
        symbol: "none",
        legendHoverLink: false,
        smooth: true,
        lineStyle: {
          color: "#197CE5",
          width: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(25, 124, 229, 0.32)",
              },
              {
                offset: 1,
                color: "rgba(255, 110, 35, 0)",
              },
            ],
          },
        },
        data: [18, 22, 7, 13, 25, 30],
      },
      {
        type: "line",
        symbol: "none",
        legendHoverLink: false,
        smooth: true,
        lineStyle: {
          color: "#C86736",
          width: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(255, 110, 35, 0.32)",
              },
              {
                offset: 1,
                color: "rgba(255, 110, 35, 0)",
              },
            ],
          },
        },
        data: [28, 24, 12, 36, 30, 40],
      },
    ],
  },
});

let myChart = null;

const updateCustomModule = () => {};
const tabelChange = (num) => {
  data.currentIndex1 = num;
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
const echartInit = () => {
  const chartDom = document.getElementById("row1Charts188_1");
  myChart = echarts.init(chartDom);
  myChart.setOption(data.option);
  autoPlay();
};
const getDay = (day) => {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  // return tYear + "-" + tMonth + "-" + tDate;
  return tMonth + "." + tDate;
};
const doHandleMonth = (month) => {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
};
onMounted(() => {
  echartInit();
});

// onMounted(() => {
//   let headerConfig = {
//      headers:{
//         token:'',
//         sqid:''
//      }
//    }
//    const tk = decodeURIComponent("https://www.lscdm.com/cockpit/dist/board.html#/share-board/8h2oAax0?tk=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjb21tdW5pdHlNYXAiOnsiMSI6IumZiOmBk-mXqOacquadpeekvuWMuiJ9LCJkZWZhdWx0Q29tbXVuaXR5SWQiOjEsImxvZ2luTmFtZSI6ImFkbWluIiwidGVsZXBob25lIjoiMTg3NjY2MzA4MTciLCJ1c2VyVHlwZSI6IjEiLCJ1c2VySWQiOjE1NzU2NjQ5NzEyMDY5OTE4NzMsInVzZXJuYW1lIjoi6LaF57qn566h55CG5ZGYIn0sInVzZXJfbmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE2Nzg5NTMwMDUsImF1dGhvcml0aWVzIjpbIjE1NTk3MjI2NzMwNDEzNTQ3NTQiLCIxNTc1NjY4MDAyNTM5NTQ0NTc4IiwiMTU3ODU1NzA5NDYyOTU4MDgwMSIsIjE2MDU0ODQ1ODA2MTYzOTI3MDYiLCIxNjAyMjQ1NjEwMDMzOTM0MzM5IiwiMTU3NTY4MDc5Mjg2ODI2NTk4NSIsIjE1ODA0NzkyMDIyMDA3NjQ0MTgiXSwianRpIjoiODY4OTc1NmItNGQwZi00M2NmLThmMjUtZjk4MGFiMTQ1NTg3IiwiY2xpZW50X2lkIjoiV0VCIn0.PTgSVsHvXekFYi45g3chnqIOwFZaTqHsWBZ3v8eYjVE").replace(/\s/g, ' ').split('tk=')
//    console.log(window.location.hash)
//    console.log(tk)
//    const sq = window.location.hash.split('sq=')
//    console.log(sq)
//    if(tk.length>1){
//      headerConfig.headers.Authorization = tk[1]
//    }
//    if(sq.length>1){
//      headerConfig.headers.sqid = sq[1].split('&tk=')[0]
//    }

//    axios.get('/cdm-api/traffic/screen/api/carbon/humidity/monitor/1',headerConfig).then(res => {
//       if (res.data.code === 0&&res.data.data) {
//         data.option.xAxis.data = res.data.data.reduce((prev,cur)=>{
//           return [...prev,cur.date]
//         },[])

//         data.option.series[0].data = res.data.data.reduce((prev,cur)=>{
//           return [...prev,cur.num]
//         },[])
//       }else{

//       }
//    }).catch((err)=>{
//       console.log(err)
//    }).finally(()=>{
//      echartInit()
//    })
// });
</script>

<style lang="scss" scoped>
.m-item {
  // width: 506px;
}

.m-content {
  // margin-left: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(29, 38, 53, 0.2) 0%,
    rgba(17, 28, 68, 0.7) 100%
  );
}
.tabel-box {
  position: absolute;
  top: 2px;
  right: 40px;
}
.tabel-box > li {
  cursor: pointer;
  width: 50px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: #1393f4;
  background: rgba(17, 127, 212, 0.15);
  margin-left: 0px;
  display: inline-block;
}
.tabel-box > li.active {
  color: #ffffff;
  background: #1393f4;
}
#row1Charts188_1 {
  width: 490px;
  height: 270px;
}
</style>
