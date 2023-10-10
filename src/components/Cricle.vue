<template>
  <div :id="id" style="width: 480px; height: 240px"></div>
</template>
<script setup>
import highcharts from "highcharts";
import { fontChart } from "@/utils/echartPxToRem";
import { onMounted, watch, onUnmounted } from "vue";

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
    ],
  },
});

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
  window.addEventListener("resize", initOption);
});

onUnmounted(() => {
  window.removeEventListener("resize", initOption);
});
//  初始化echarts
const initOption = () => {
  // let quantity = 0; // 总数
  // props.dataList.forEach((item) => {
  //   quantity += item.y;
  // });
  props.dataList.forEach((item) => {
    // item.bfb = parseInt((item.y / quantity) * 100);
    // console.log(item.bfb * 1,'item.bfb * 1.5');
    item.h = item.bfb * 1 >= 70 ? 20 : 20
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
        },
      },
    },
    legend: {
      enabled: true, // 关闭图例
      align: "right", //水平方向位置
      verticalAlign: "top", //垂直方向位置
      layout: "vertical",
      x: fontChart(-50),
      y: fontChart(0),
      symbolWidth: fontChart(10),
      symbolHeight: fontChart(10),
      symbolRadius: "50%", // 修改成圆
      itemMarginBottom: fontChart(20),
      labelFormat: "{name}",
      itemStyle: {
        color: "#f4f4f6",
        fontSize: fontChart(14),
      },
    },
    title: {
      // enabled: false,
      text: "",
    },
    subtitle: {
      text: "",
    },
    plotOptions: {
      pie: {
        allowPointSelect: false, // 禁用点击
        cursor: "pointer",
        depth: fontChart(8),
        showInLegend: true,
        size: "80%", // 外圈直径大小
        innerSize: fontChart(120), // 内圈直径大小
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
      },
    },
    credits: {
      enabled: false, // 禁用版权信息
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        data: props.dataList,
      },
    ],
  });
};
</script>
