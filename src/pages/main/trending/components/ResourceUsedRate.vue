<template>
  <div class="m-item">
    <item-title title="资源利用率" />
    <div class="m-content">
      <div class="item">
        <p>60.5%</p>
        <p>ECS</p>
      </div>
      <div class="item">
        <p>1%</p>
        <p>RDS</p>
      </div>
      <div class="item">
        <p>15%</p>
        <p>SLB</p>
      </div>
      <div class="item">
        <p>9.5%</p>
        <p>OSS</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import ItemTitle from "./ItemTitle.vue";
import * as echarts from "echarts";
import { reactive, onMounted, onBeforeUnmount, ref, nextTick } from "vue";
const title = ref("");
const liHeight = ref("");
</script>
<style lang="scss" scoped>
.m-item {
  width: 483px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  background: linear-gradient(
    90deg,
    rgba(32, 140, 255, 0.2) 0%,
    rgba(32, 140, 255, 0) 100%
  );
}
.m-content {
  // width: 480px;
  // padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  width: 398px;
  height: 200px;
  background: url("/@/assets/images/left2.png") 0 0/100% 100% no-repeat;
  .item {
    margin-top: 17px;
    flex-shrink: 0;
    > p:first-child {
      margin-top: 9px;
      padding-left: 72px;
      font-size: 20px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      line-height: 16px;
    }
    > p:last-child {
      margin-top: 8px;
      font-size: 20px;
      font-family: PangMenZhengDao;
      color: #97c7ff;
      line-height: 16px;
      padding-left: 72px;
    }
  }

  .item:first-child {
    position: absolute;
    left: -26px;
    top: 0px;
  }
  .item:nth-child(2) {
    position: absolute;
    right: -0px;
    top: 0px;
  }
  .item:nth-child(3) {
    position: absolute;
    left: -26px;
    bottom: 26px;
  }
  .item:nth-child(4) {
    position: absolute;
    right: -0px;
    bottom: 24px;
  }

  img {
    width: 100%;
  }
  // span {
  //   width: 90%;
  //   position: absolute;
  //   top: 16px;
  //   color: #fff;
  //   text-align: center;
  //   font-size: 18px;
  //   font-family: "E-Charts";
  // }
}
</style>
