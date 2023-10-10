<template>
  <div class="m-item">
    <item-title title="告警（最近24小时）" />
    <div class="m-content">
      <div class="table">
        <dv-scroll-board class="dv-scroll" ref="dvScroll" :config="config" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import * as echarts from "echarts";
import axios from "axios";
import ItemTitle from "./ItemTitle.vue";

const tableData = [
  {
    level: 0,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
  {
    level: 1,
    time: "2023.09.22 15:00:00",
    desc: "可疑命令执行",
    status: "0",
    position: "市直机关工委-杭州市机关",
  },
];

const colorMap = {
  0: "#fff",
  1: "#f0f",
  2: "#ff0",
};
const levelColorMap = {
  0: "#D03939",
  1: "#EAB966",
};
const statusMap = {
  0: {
    text: "已处理",
    color: "#4EC662",
  },
};

const config = reactive({
  // header: ["资产", "状态"],
  align: ["center", "center", "center", "center"],
  data: tableData.map((item) => {
    return [
      `<span style="width: 8px; height: 8px; border-radius: 50%; display: block; transform: translateY(25px);background: ${
        levelColorMap[item.level]
      }"></span>`,
      `<div style="line-height: 25px">
        <p>${item.time}</p>
        <p style="color: ${statusMap[item.status].color}">${
        statusMap[item.status].text
      }</p>
      </div>`,
      `<div style="line-height: 25px">
        <p>${item.desc}</p>
        <p>${item.position}</p>
      </div>`,
    ];
  }),
  rowNum: 5,
  columnWidth: [50, 180, 180],
  // headerBGC: "rgba(55, 112, 255, 0.3)",
  oddRowBGC: "rgba(152, 161, 177, 0.000)",
  evenRowBGC: "",
  headerHeight: "0",
});
</script>

<style lang="scss" scoped>
.m-item {
  // width: 506px;

  margin-top: 12px;
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

.dv-scroll {
  width: 100%;
  height: 250px;
}
</style>
