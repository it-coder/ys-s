<template>
  <div class="m-item">
    <item-title title="攻击来源top5（最近24小时）" />
    <div class="m-content">
      <div class="attack-item">
        <div class="item-top">
          <p>市城管局-杭州市城市管理协同局办公系统</p>
          <p>200</p>
        </div>
        <el-progress
          :percentage="50"
          :stroke-width="8"
          :show-text="false"
        ></el-progress>
      </div>
      <div class="attack-item">
        <div class="item-top">
          <p>市城管局-杭州市城市管理协同局办公系统</p>
          <p>200</p>
        </div>
        <el-progress
          :percentage="50"
          :stroke-width="8"
          :show-text="false"
        ></el-progress>
      </div>
      <div class="attack-item">
        <div class="item-top">
          <p>市城管局-杭州市城市管理协同局办公系统</p>
          <p>200</p>
        </div>
        <el-progress
          :percentage="50"
          :stroke-width="8"
          :show-text="false"
        ></el-progress>
      </div>
      <div class="attack-item">
        <div class="item-top">
          <p>市城管局-杭州市城市管理协同局办公系统</p>
          <p>200</p>
        </div>
        <el-progress
          :percentage="50"
          :stroke-width="8"
          :show-text="false"
        ></el-progress>
      </div>
      <div class="attack-item">
        <div class="item-top">
          <p>市城管局-杭州市城市管理协同局办公系统</p>
          <p>200</p>
        </div>
        <el-progress
          :percentage="50"
          :stroke-width="8"
          :show-text="false"
        ></el-progress>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import * as echarts from "echarts";
import axios from "axios";
import ItemTitle from "./ItemTitle.vue";
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
.attack-item {
  margin-top: 15px;
  .item-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 5px;
  }
}
::v-deep .attack-item .el-progress-bar__inner {
  background: linear-gradient(90deg, #10274b 0%, #1978e5 100%);
}
::v-deep .attack-item .el-progress-bar__outer {
  background: rgba(255, 255, 255, 0.08);
}
</style>
