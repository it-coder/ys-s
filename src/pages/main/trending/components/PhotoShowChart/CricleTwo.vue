<template>
  <div class="chartsPercent">
    <span class="percent">{{ maxPercent }}</span>
    <span class="service">{{ maxName }}</span>
  </div>
  <div :id="id" style="width: 480px; height: 300px"></div>
</template>
<script setup>
import highcharts from "highcharts";
import { fontChart } from "@/utils/echartPxToRem";
import { onMounted, watch, onUnmounted, ref } from "vue";
const maxPercent = ref("48%");
const maxName = ref("商业服务");
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
        name: "商业服务",
        y: 10,
        h: 10,
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
    ],
  },
});
const timer1 = ref(null);
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
  initOption();
  // window.addEventListener("resize", initOption);
});

onUnmounted(() => {
  window.removeEventListener("resize", initOption);
  if (timer1.value) {
    clearInterval(timer1.value);
  }
});
//  初始化echarts
const initOption = () => {
  let quantity = 0; // 总数
  props.dataList.forEach((item) => {
    quantity += item.y;
  });
  props.dataList.forEach((item) => {
    item.bfb = parseInt((item.y / quantity) * 100);
    // item.h = item.bfb * 1 >= 70 ? 60 : item.bfb * 1
    item.h = 10;
    // item.h = parseInt(0.86 * item.bfb); // 最高高度60，根据比例渲染高度
    // console.log(props.dataList, "dataList----->>>");
  });
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
          timer1.value = setInterval(function () {
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
      y: fontChart(60),
      symbolWidth: fontChart(10),
      symbolHeight: fontChart(10),
      symbolRadius: "50%", // 修改成圆
      itemMarginBottom: fontChart(20),
      labelFormat: "{name}",
      itemStyle: {
        color: "#f4f4f6",
        fontSize: "14px",
      },
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
        size: "60%", // 外圈直径大小
        innerSize: fontChart(110), // 内圈直径大小
        center: ["25%", "66%"],
        colors: [
          "rgba(0, 188, 255, .9)",
          "rgba(0, 255, 210, .9)",
          "rgba(124, 227, 226, .9)",
          "rgba(221, 59, 244, .9)",
          "rgba(114, 98, 253, .9)",
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
        point: {
          events: {
            legendItemClick: function (e) {
              return false; // 直接 return false 即可禁用图例点击事件
            },
            mouseOver: function (e) {
              console.log(343434, e);
              if (timer1.value) {
                clearInterval(timer1.value);
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
              timer1.value = setInterval(function () {
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
        name: "数值：",
        data: props.dataList,
      },
    ],
  });
};
</script>
<style lang="scss" scoped>
.chartsPercent {
  position: absolute;
  top: 148px;
  left: 89px;
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
</style>
