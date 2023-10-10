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
    riskLevel: 0,
    desc: "市委军民融合办-移动办公",
    effect: 30,
  },
  {
    riskLevel: 1,
    desc: "市委军民融合办-移动办公",
    effect: 30,
  },
  {
    riskLevel: 1,
    desc: "市委军民融合办-移动办公",
    effect: 30,
  },
  {
    riskLevel: 1,
    desc: "市委军民融合办-移动办公",
    effect: 30,
  },
  {
    riskLevel: 1,
    desc: "市委军民融合办-移动办公",
    effect: 30,
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
  2: "#39B34D",
};
const statusMap = {
  0: {
    text: "已处理",
    color: "#4EC662",
  },
};

const config = reactive({
  header: ["资产", "风险等级", "影响资产"],
  align: ["left", "center", "center", "center"],
  data: tableData.map((item) => {
    return [
      `<div >
        <p>${item.desc}</p>
      </div>`,
      `<span style="width: 8px; height: 8px; border-radius: 50%; display: block; transform: translateY(18px);background: ${
        levelColorMap[item.riskLevel]
      }"></span>`,
      item.effect,
    ];
  }),
  rowNum: 5,
  columnWidth: [220, 80, 80],
  headerBGC: "rgba(55, 112, 255, 0)",
  oddRowBGC: "rgba(152, 161, 177, 0.000)",
  evenRowBGC: "",
  headerHeight: "40",
});
</script>

<style lang="scss" scoped>
.m-item {
  width: 440px;
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
