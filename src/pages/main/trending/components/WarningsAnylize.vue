<template>
  <div class="m-item">
    <item-title title="告警统计" />
    <div class="m-content">
      <div class="chartsPercent">
        <span class="percent">520</span>
        <span class="service">总告警量</span>
      </div>
      <div :id="id" style="width: 280px; height: 200px"></div>
      <ul class="legend-box">
        <li v-for="(item, index) in dataList" :key="index">
          <span></span>
          <span>{{ item.name }}</span>
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import highcharts from "highcharts";
import ItemTitle from "./ItemTitle.vue";
import { fontChart } from "@/utils/echartPxToRem";
import { onMounted, watch, onUnmounted, ref } from "vue";
const maxPercent = ref("48%");
const maxName = ref("系统告警");
const props = defineProps({
  id: {
    type: String,
    default: "123",
    required: true,
  },
  dataList: {
    type: Array,
    default: () => [
      {
        name: "系统告警",
        y: 1,
        h: 20,
        bfb: 1.5,
      },
      {
        name: "紧急告警",
        y: 11,
        h: 10,
        bfb: 2,
      },
      {
        name: "重要告警",
        y: 3,
        h: 10,
        bfb: 1,
      },
      {
        name: "次要告警",
        y: 1,
        h: 20,
        bfb: 1.5,
      },
      {
        name: "提醒",
        y: 42,
        h: 10,
        bfb: 2,
      },
      {
        name: "恢复告警",
        y: 462,
        h: 10,
        bfb: 1,
      },
    ],
  },
});
const timer3 = ref(null);
watch(
  () => props.dataList,
  (newValue) => {
    initOption();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  // window.addEventListener("resize", initOption);
  initOption();
});

onUnmounted(() => {
  window.removeEventListener("resize", initOption);
  if (timer3.value) {
    clearInterval(timer3.value);
  }
});
//  初始化echarts
const initOption = () => {
  // let quantity = 0; // 总数
  props.dataList.forEach((item) => {
    // quantity += item.y;
    item.h = 10;
  });
  // props.dataList.forEach((item) => {
  //   item.bfb = parseInt((item.y / quantity) * 100);
  //   console.log(item.bfb * 1,'item.bfb * 1.5');
  //   item.h = item.bfb * 1 >= 70 ? 60 : item.bfb * 1
  //   // item.h = parseInt(0.86 * item.bfb); // 最高高度60，根据比例渲染高度
  //   // console.log(props.dataList, "dataList----->>>");
  // });
  // 修改3d饼图绘制过程
  var each = highcharts.each,
    round = Math.round,
    cos = Math.cos,
    sin = Math.sin,
    deg2rad = Math.deg2rad;
  highcharts.wrap(
    highcharts.seriesTypes.pie.prototype,
    "translate",
    function (proceed) {
      proceed.apply(this, [].slice.call(arguments, 1));
      // Do not do this if the chart is not 3D
      if (!this.chart.is3d()) {
        return;
      }
      var series = this,
        chart = series.chart,
        options = chart.options,
        seriesOptions = series.options,
        depth = seriesOptions.depth || 0,
        options3d = options.chart.options3d,
        alpha = options3d.alpha,
        beta = options3d.beta,
        z = seriesOptions.stacking
          ? (seriesOptions.stack || 0) * depth
          : series._i * depth;
      z += depth / 2;
      if (seriesOptions.grouping !== false) {
        z = 0;
      }
      each(series.data, function (point) {
        var shapeArgs = point.shapeArgs,
          angle;
        point.shapeType = "arc3d";
        var ran = point.options.h;
        shapeArgs.z = z;
        shapeArgs.depth = depth * 0.75 + ran;
        shapeArgs.alpha = alpha;
        shapeArgs.beta = beta;
        shapeArgs.center = series.center;
        shapeArgs.ran = ran;
        angle = (shapeArgs.end + shapeArgs.start) / 2;
        point.slicedTranslation = {
          translateX: round(
            cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
          ),
          translateY: round(
            sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
          ),
        };
      });
    }
  );
  (function (H) {
    H.wrap(highcharts.SVGRenderer.prototype, "arc3dPath", function (proceed) {
      // Run original proceed method
      var ret = proceed.apply(this, [].slice.call(arguments, 1));
      ret.zTop = (ret.zOut + 0.5) / 100;
      return ret;
    });
  })(highcharts);
  highcharts.chart(props.id, {
    chart: {
      animation: false,
      backgroundColor: "none",
      type: "pie", //饼图
      margin: [0, 0, 0, 0],
      options3d: {
        enabled: true, //使用3d功能
        alpha: 58, //延y轴向内的倾斜角度
        beta: 0,
      },
      events: {
        load: function () {
          var each = highcharts.each,
            points = this.series[0].points;
          console.log(this.series[0].points);
          each(points, function (p, i) {
            p.graphic.attr({
              translateY: -p.shapeArgs.ran,
            });
            p.graphic.side1.attr({
              translateY: -p.shapeArgs.ran,
            });
            p.graphic.side2.attr({
              translateY: -p.shapeArgs.ran,
            });
          });
          maxPercent.value = points[0].proportion;
          maxName.value = points[0].name;
          let i = 0;
          timer3.value = setInterval(function () {
            console.log(points, 56);
            if (!points[0].id) {
            } else {
              each(points, function (p, index) {
                p &&
                  p.graphic.attr({
                    translateY: -p.shapeArgs.ran,
                    depth: 10,
                  });
                p &&
                  p.graphic.side1.attr({
                    translateY: -p.shapeArgs.ran,
                  });
                p &&
                  p.graphic.side2.attr({
                    translateY: -p.shapeArgs.ran,
                  });
              });
              maxPercent.value = points[i].proportion;
              maxName.value = points[i].name;
              points &&
                points[i].graphic.attr({
                  translateY: -points[i].shapeArgs.ran * 2,
                  depth: 20,
                });
              points &&
                points[i].graphic.side1.attr({
                  translateY: -points[i].shapeArgs.ran * 2,
                });
              points &&
                points[i].graphic.side2.attr({
                  translateY: -points[i].shapeArgs.ran * 2,
                });
            }
            if (i < points.length - 1) {
              i++;
            } else {
              i = 0;
            }
            // }
          }, 3000);
        },
      },
    },
    legend: {
      enabled: false, // 关闭图例
      align: "right", //水平方向位置
      verticalAlign: "top", //垂直方向位置
      layout: "vertical",
      x: fontChart(-50),
      y: fontChart(10),
      symbolWidth: fontChart(10),
      symbolHeight: fontChart(10),
      itemHoverStyle: { color: "#f4f4f6", cursor: "default" },
      symbolRadius: "50%", // 修改成圆
      itemMarginBottom: fontChart(20),
      labelFormat: "{name}",
      itemStyle: {
        color: "#f4f4f6",
        fontSize: "14px",
        cursor: "default",
      },
      // itemStyle: {
      //   cursor: "default",
      // },
      // itemHoverStyle: {
      //   cursor: "default",
      // },
    },
    title: {
      // enabled: false,
      text: "",
    },
    subtitle: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8000)",
      borderColor: "rgba(39, 51, 79, 1)",
      borderWidth: 2,
      style: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
      },
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: false, // 禁用点击
        cursor: "pointer",
        depth: fontChart(8),
        showInLegend: true,
        size: "100%", // 外圈直径大小
        innerSize: fontChart(110), // 内圈直径大小
        center: ["35%", "40%"],
        colors: [
          "rgba(114, 98, 253, .9)",
          "rgba(0, 255, 210, .9)",
          "rgba(221, 59, 244, .9)",
          "rgba(16, 138, 174, .9)",
          "rgba(0, 77, 161, .9)",
          "rgba(60, 32, 173, .9)",
        ],
        dataLabels: {
          enabled: false, //是否显示饼图的线形tip
          distance: fontChart(0),
          align: "center",
          position: "center",
          format: "{point.bfb}%",
          // formatter: (point,b) => {
          //   console.log(point,'ponit-->>')
          //   console.log(b,'ponit-->>')
          // },
          style: {
            fontSize: fontChart(13),
          },
        },
        // marker: {
        //   enabled: false,
        //   states:{
        //     hover:{
        //       enabled: false,
        //     },
        //   },
        // },
        events: {
          mouseOver: function (e) {
            //  console.log(23232)
          },
        },
        point: {
          events: {
            legendItemClick: function (e) {
              return false; // 直接 return false 即可禁用图例点击事件
            },
            mouseOver: function (e) {
              console.log(343434, e);
              if (timer3.value) {
                clearInterval(timer3.value);
              }
              var each = highcharts.each,
                points = e.target.series.points;
              each(points, function (p, i) {
                p.graphic.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side1.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side2.attr({
                  translateY: -p.shapeArgs.ran,
                });
              });
              if (!points[0].id) {
              } else {
                each(points, function (p, index) {
                  p &&
                    p.graphic.attr({
                      translateY: -p.shapeArgs.ran,
                      depth: 10,
                    });
                  p &&
                    p.graphic.side1.attr({
                      translateY: -p.shapeArgs.ran,
                    });
                  p &&
                    p.graphic.side2.attr({
                      translateY: -p.shapeArgs.ran,
                    });
                });

                maxPercent.value = points[e.target.index].proportion;
                maxName.value = points[e.target.index].name;
                points &&
                  points[e.target.index].graphic.attr({
                    translateY: -points[e.target.index].shapeArgs.ran * 2,
                    depth: 20,
                  });
                points &&
                  points[e.target.index].graphic.side1.attr({
                    translateY: -points[e.target.index].shapeArgs.ran * 2,
                  });
                points &&
                  points[e.target.index].graphic.side2.attr({
                    translateY: -points[e.target.index].shapeArgs.ran * 2,
                  });
              }
            },

            mouseOut: function (e) {
              var each = highcharts.each,
                points = e.target.series.points;

              console.log(highcharts.each, e.target.series.points);
              each(points, function (p, index) {
                p &&
                  p.graphic.attr({
                    translateY: -p.shapeArgs.ran,
                    depth: 10,
                  });
                p &&
                  p.graphic.side1.attr({
                    translateY: -p.shapeArgs.ran,
                  });
                p &&
                  p.graphic.side2.attr({
                    translateY: -p.shapeArgs.ran,
                  });
              });

              maxPercent.value = points[0].proportion;
              maxName.value = points[0].name;
              let i = 0;
              timer3.value = setInterval(function () {
                console.log(points, 56);
                if (!points[0].id) {
                } else {
                  each(points, function (p, index) {
                    p &&
                      p.graphic.attr({
                        translateY: -p.shapeArgs.ran,
                        depth: 10,
                      });
                    p &&
                      p.graphic.side1.attr({
                        translateY: -p.shapeArgs.ran,
                      });
                    p &&
                      p.graphic.side2.attr({
                        translateY: -p.shapeArgs.ran,
                      });
                  });
                  maxPercent.value = points[i].proportion;
                  maxName.value = points[i].name;
                  points &&
                    points[i].graphic.attr({
                      translateY: -points[i].shapeArgs.ran * 2,
                      depth: 20,
                    });
                  points &&
                    points[i].graphic.side1.attr({
                      translateY: -points[i].shapeArgs.ran * 2,
                    });
                  points &&
                    points[i].graphic.side2.attr({
                      translateY: -points[i].shapeArgs.ran * 2,
                    });
                }
                if (i < points.length - 1) {
                  i++;
                } else {
                  i = 0;
                }
                // }
              }, 3000);
            },
          },
        },
      },
    },
    credits: {
      enabled: false, // 禁用版权信息
    },
    series: [
      {
        type: "pie",
        name: "数值",
        data: props.dataList,
      },
    ],
  });
};
</script>
<style lang="scss" scoped>
.m-item {
  // width: 506px;
}

.m-content {
  margin-top: 30px;
  position: relative;
  // margin-left: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(29, 38, 53, 0.2) 0%,
    rgba(17, 28, 68, 0.7) 100%
  );
}
.chartsPercent {
  position: absolute;
  top: 40px;
  left: 70px;
  display: flex;
  text-align: center;
  flex-direction: column;
  font-size: 16px;
  color: #fff;
  z-index: 100;
  .percent {
    font-family: "E-Charts";
    font-size: 32px;
    margin-bottom: -10px;
  }
  .service {
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
.legend-box {
  position: absolute;
  top: 30px;
  left: 240px;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 240px;
  flex-wrap: wrap;
}
.legend-box > li {
  width: 120px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.legend-box > li > span:nth-child(1) {
  width: 8px;
  height: 8px;
  background: #00ffd2;
  border-radius: 4px;
}
.legend-box > li > span:nth-child(2) {
  font-size: 14px;
  font-weight: 400;
  color: #b2c1e8;
  line-height: 15px;
  margin: 0 9px 0 16px;
  place-self: center start;
}
.legend-box > li > span:nth-child(3) {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  line-height: 20px;
  text-align: right;
  place-self: center end;
}
.legend-box > li:nth-child(1) > span:nth-child(1) {
  background: rgba(114, 98, 253, 0.9);
}
.legend-box > li:nth-child(2) > span:nth-child(1) {
  background: rgba(0, 255, 210, 0.9);
}
.legend-box > li:nth-child(3) > span:nth-child(1) {
  background: rgba(221, 59, 244, 0.9);
}
.legend-box > li:nth-child(4) > span:nth-child(1) {
  background: rgba(16, 138, 174, 0.9);
}
.legend-box > li:nth-child(5) > span:nth-child(1) {
  background: rgba(0, 77, 161, 0.9);
}
.legend-box > li:nth-child(6) > span:nth-child(1) {
  background: rgba(60, 32, 173, 0.9);
}
.legend-box > li:nth-child(7) > span:nth-child(1) {
  background: #6d5ff3;
}
.legend-box > li:nth-child(8) > span:nth-child(1) {
  background: #86e1e1;
}
.legend-box > li:nth-child(9) > span:nth-child(1) {
  background: #fce7a9;
}
.legend-box > li:nth-child(10) > span:nth-child(1) {
  background: #138dea;
}
.legend-box > li:nth-child(11) > span:nth-child(1) {
  background: #00ffd2;
}
.legend-box > li:nth-child(12) > span:nth-child(1) {
  background: #f26a24;
}
.legend-box > li:nth-child(13) > span:nth-child(1) {
  background: #bfccdc;
}
.legend-box > li:nth-child(14) > span:nth-child(1) {
  background: #135cea;
}
.legend-box > li:nth-child(15) > span:nth-child(1) {
  background: #eab517;
}
.legend-box > li:nth-child(16) > span:nth-child(1) {
  background: #6d5ff3;
}
.legend-box > li:nth-child(17) > span:nth-child(1) {
  background: #86e1e1;
}
.legend-box > li:nth-child(18) > span:nth-child(1) {
  background: #fce7a9;
}
</style>
