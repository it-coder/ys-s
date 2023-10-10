<template>
  <div class="m-item">
    <item-title title="资源汇总" />
    <div class="m-content">
      <div class="item">
        <p>ECS（核）</p>
        <p>3300</p>
      </div>
      <div class="item">
        <p>RDS（核）</p>
        <p>300</p>
      </div>
      <div class="item">
        <p>SLB（个）</p>
        <p>1792</p>
      </div>
      <div class="item">
        <p>OSS（TB）</p>
        <p>780</p>
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
  .item {
    margin-top: 17px;
    flex-shrink: 0;
    width: 195px;
    height: 65px;
    background: url("/@/assets/images/icon_1.png") 0 0/100% 100% no-repeat;
    > p:first-child {
      margin-top: 9px;
      padding-left: 72px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(212, 237, 253, 0.83);
      line-height: 20px;
    }
    > p:last-child {
      margin-top: 5px;
      font-size: 20px;
      font-family: PangMenZhengDao;
      color: #fceb4b;
      line-height: 16px;
      padding-left: 72px;
    }
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
