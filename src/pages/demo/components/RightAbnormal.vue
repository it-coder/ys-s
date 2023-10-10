<template>
  <div class="notice-item">
    <div class="item-title">异常情况</div>
    <div class="item-content" v-if="data?.length > 0">
      <dv-scroll-board
        class="dv-scroll"
        :config="config"
        style="width: 100%; height: 220px"
      />
    </div>
    <p class="no-data" v-else>无异常情况</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { urlToBase64 } from "/@/utils/file/base64Conver";
import noticePrefixIcon from "/@/assets/images/analyze/notice_prefix.png";
const props = defineProps({
  data: Object,
});

const config = ref({
  data: [],
  rowNum: 2,
  oddRowBGC: "rgba(0,0,0,0)",
  evenRowBGC: "rgba(0,0,0,0)",
  // waitTime: 111111111,
});

watch(
  () => props.data,
  () => {
    generate();
  }
);

async function generate() {
  urlToBase64(noticePrefixIcon).then((b64) => {
    config.value.data = props.data.map((item, idx) => {
      return [
        `<div class="item ${
          idx !== 0 ? "not-first-child" : ""
        }" style="height: 60px">
          <img class="icon" src="${b64}"/>
          <div class="desc" style="max-width: 90%">
            <p class="oneline" style="width: 100%">${
              item.name + item.siteName
            }巡检报告存在异常巡检项</p>
            <p>${item.time}</p>
          </div>
        </div>`,
      ];
    });
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
  height: 120px !important;
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
  margin-bottom: -2px;
  padding: 10px 12px 12px 7px;
  cursor: pointer;
}
:deep(.item.not-first-child) {
  border-top: none;
}
:deep(.icon) {
  margin-top: 2px;
  width: 34px;
  height: 29px;
  margin-right: 6px;
}
.desc {
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
.no-data {
  color: #fff;
  text-align: center;
  line-height: 200px;
}

:deep(.dv-scroll-board .rows .ceil) {
  padding: 0;
}
</style>
