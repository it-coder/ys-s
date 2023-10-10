<template>
  <div class="item">
    <div class="item-title">巡检统计</div>
    <div class="item-content">
      <div class="data-details">
        <img :src="prefixIcon1" class="prefix-icon" />
        <div class="total">
          <p class="total-data">{{ data?.siteTotal }}</p>
          <p class="total-desc">总巡检点</p>
        </div>
        <div class="detail">
          <p class="detail-item">
            <span>一级巡检点：</span
            ><span>{{ data?.complexBuildTotal || 0 }}</span>
          </p>
          <p class="detail-item">
            <span>二级网格：</span><span>{{ data?.gridSiteTotal || 0 }}</span>
          </p>
          <p class="detail-item">
            <span>营业厅：</span
            ><span>{{ data?.businessOfficeTotal || 0 }}</span>
          </p>
        </div>
      </div>

      <img class="btn-split" :src="splitImg" />
      <div class="data-details">
        <img :src="prefixIcon2" class="prefix-icon" />
        <div class="total">
          <p class="total-data">{{ data?.inspectionTimes }}</p>
          <p class="total-desc">累计巡检次数</p>
        </div>
        <div class="detail">
          <p class="detail-item">
            <span>季度环比：</span><span>{{ data?.inspectionTimesRatio }}</span>
          </p>
        </div>
      </div>

      <img class="btn-split" :src="splitImg" />
      <div class="data-details">
        <img :src="prefixIcon3" class="prefix-icon" />
        <div class="total">
          <p class="total-data">{{ data?.completeTotal }}</p>
          <p class="total-desc">参与巡检人数</p>
        </div>
        <div class="detail">
          <p class="detail-item">
            <span>季度环比：</span><span>{{ data?.completeTotalRatio }}</span>
          </p>
        </div>
      </div>

      <img class="btn-split" :src="splitImg" />
      <div class="data-details">
        <img :src="prefixIcon4" class="prefix-icon" />
        <div class="total">
          <p class="total-data">{{ data?.reportTotal }}</p>
          <p class="total-desc">本季度提交情况</p>
        </div>
        <div class="detail">
          <p class="detail-item">
            <span>巡检正常：</span><span>{{ data?.normalRatio }}</span>
          </p>
          <p class="detail-item">
            <span>待复核异常：</span><span>{{ data?.reviewExRatio }}</span>
          </p>
          <p class="detail-item">
            <span>确认异常：</span><span>{{ data?.confirmExRatio }}</span>
          </p>
        </div>
      </div>
      <img class="btn-split" :src="splitImg" />
    </div>
  </div>
</template>

<script setup>
import prefixIcon1 from "/@/assets/images/analyze/left_1.png";
import prefixIcon2 from "/@/assets/images/analyze/left_2.png";
import prefixIcon3 from "/@/assets/images/analyze/left_3.png";
import prefixIcon4 from "/@/assets/images/analyze/left_4.png";
import splitImg from "/@/assets/images/analyze/split.png";

defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.data-details {
  display: flex;
  align-items: flex-end;
  margin-top: 40px;
}

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

.btn-split {
  width: 100%;
  height: 26px;
}
.prefix-icon {
  display: block;
  position: relative;
  bottom: -10px;
  width: 84px;
  height: 63px;
  margin-right: 20px;
}
.total {
  width: 120px;
}
.total-data {
  font-size: 24px;
  color: #ffffff;
  line-height: 20px;
  letter-spacing: 1px;
  font-family: "datav_number";
}
.total-desc {
  font-size: 14px;
  font-weight: 500;
  color: #b2c1e8;
  margin-top: 12px;
}
.detail {
}
.detail {
}
.detail-item {
  position: relative;
}
.detail-item > span:first-child {
  font-size: 12px;
  font-weight: 400;
  color: #b2c1e8;
  line-height: 15px;
}
.detail-item > span:last-child {
  font-size: 16px;
  font-family: "datav_number";
  position: absolute;
  left: 80px;
  top: 1px;
  color: #ffffff;
  line-height: 21px;
}
</style>
