<template>
  <div class="center-data">
    <div class="list">
      <div class="item">
        <img :src="prefixIcon1" class="prefix-icon" />
        <div class="desc">
          <p>总巡检点</p>
          <p class="desc-num">{{ data.siteTotal }}</p>
        </div>
      </div>
      <div class="item">
        <img :src="prefixIcon2" class="prefix-icon" />
        <div class="desc">
          <p>累计巡检次数</p>
          <p class="desc-num">{{ data?.inspectionTimes }}</p>
        </div>
      </div>
      <div class="item">
        <img :src="prefixIcon3" class="prefix-icon" />
        <div class="desc">
          <p>参与巡检人数</p>
          <p class="desc-num">{{ data.completeTotal }}</p>
        </div>
      </div>
      <div class="item">
        <img :src="prefixIcon4" class="prefix-icon" />
        <div class="desc">
          <p>本季度提交情况</p>
          <p class="desc-num">{{ data?.reportTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import prefixIcon1 from "/@/assets/images/analyze/center_1.png";
import prefixIcon2 from "/@/assets/images/analyze/center_2.png";
import prefixIcon3 from "/@/assets/images/analyze/center_3.png";
import prefixIcon4 from "/@/assets/images/analyze/center_4.png";

defineProps({
  data: Object,
});
</script>
<style lang="scss" scoped>
.center-data {
  width: 100%;
}
.list {
  display: flex;
  justify-content: center;
}
.item {
  display: flex;
  margin-right: 80px;
  align-items: center;
}
.prefix-icon {
  display: block;
  width: 48px;
  height: 58px;
  margin-right: 10px;
}
.desc {
}
.desc > p:first-child {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #b2c1e8;
  line-height: 15px;
  width: 120px;
}
.desc > p:nth-child(2) {
  margin-top: 8px;
  font-size: 24px;
  color: #ffffff;
  line-height: 20px;
  letter-spacing: 1px;
  font-family: "datav_number";
}
</style>
