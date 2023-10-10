<template>
  <div class="m-item">
    <item-title title="机构单位目录" />
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
  header: ["市本级/区县级", "机构/单位数量", "项目数量"],
  align: ["center", "center", "center", "center"],
  data: [
    ["市本级", "24", "9999"],
    ["市本级", "24", "43434"],
    ["市本级", "24", "4434"],
    ["区县级", "24", "9999"],
    ["区县级", "24", "25645"],
    ["区县级", "24", "34534"],
    ["市本级", "24", "9999"],
    ["市本级", "24", "9999"],
    ["市本级", "24", "9999"],
  ],
  rowNum: 5,
  columnWidth: [140, 130, 130],
  headerBGC: "rgba(55, 112, 255, 0.3)",
  oddRowBGC: "rgba(152, 161, 177, 0.000)",
  evenRowBGC: "",
  headerHeight: "32",
});
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

.dv-scroll {
  width: 100%;
  height: 250px;
}
</style>
