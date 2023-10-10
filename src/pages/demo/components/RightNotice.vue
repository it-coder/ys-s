<template>
  <div class="notice-item">
    <div class="item-title">通报</div>
    <div class="item-content" v-if="data?.length > 0">
      <dv-scroll-board class="dv-scroll" :config="config" style="width: 100%" />
    </div>
    <p class="no-data" v-else>暂无通报</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  data: Object,
});

const config = ref({
  data: [],
  rowNum: 3,
  // columnWidth: [437],
  oddRowBGC: "rgba(0,0,0,0)",
  evenRowBGC: "rgba(0,0,0,0)",
});

watch(
  () => props.data,
  () => {
    config.value.data = generate(props.data);
  }
);

function generate() {
  const messageMap = {
    1: (quarter) => {
      const _ = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
      };
      return "还未提交第" + _[quarter] + "季度巡检报告";
    },
    2: () => "还未及时复核",
    3: () => "还未及时整改",
  };
  return props.data.map((item, idx) => {
    return [
      `<div class="item  ${
        idx !== 0 ? "not-first-child" : ""
      }" style="height: 80px">
        <span class="icon" ></span>
        <div class="desc" style="max-width: 90%">
          <p class="oneline"  style="width: 100%">${
            item.name + item.siteName
          }</p>
          <p>${messageMap[item.message]?.(item.quarter)}</p>
          <p>截止时间：${item.time}</p>
        </div>
      </div>`,
    ];
  });
}
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

.notice-item {
  width: 100%;
}
.item-content {
  margin-top: 20px;
}
.dv-scroll {
  height: 240px !important;
}
.list {
}
:deep(.item) {
  width: 100%;
  display: flex;
  align-items: flex-start;
  background: #0b142d;
  box-shadow: inset 0px 0px 11px 0px rgba(47, 173, 226, 0.38);
  // opacity: 0.6;
  border: 2px solid #13458f;
  padding: 10px 12px 12px 7px;
  cursor: pointer;
  margin-bottom: -2px;
}

:deep(.icon) {
  display: block;
  margin-top: 7px;
  margin-left: 12px;
  margin-right: 8px;
  width: 8px;
  height: 8px;
  background: #93acf1;
  box-shadow: 0px 0px 4px 0px #254db8;
  border: 2px solid #1f53ff;
}
.desc {
  flex: 1;
}
:deep(.desc > p:first-child) {
  font-size: 14px;
  margin-bottom: 0;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fff;
  line-height: 20px;
}
:deep(.desc > p:nth-child(2)) {
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #abaeb7;
  line-height: 14px;
}
:deep(.desc > p:nth-child(3)) {
  margin-top: 6px;
  margin-bottom: 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #abaeb7;
  line-height: 14px;
}
:deep(.dv-scroll-board .rows .ceil) {
  padding: 0;
}

.no-data {
  color: #fff;
  text-align: center;
  margin-top: 20px;
  line-height: 200px;
  height: 240px;
}
</style>

<style>
.dv-scroll-board.dv-scroll .ceil .item:hover {
  background: #02255e;
}
</style>
