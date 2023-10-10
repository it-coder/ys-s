<template>
  <div class="item-title">{{ title }}</div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.item-title {
  position: relative;
  width: 506px;
  height: 68px;
  background: url("/@/assets/images/edu_title_bg_r.png") no-repeat 0 0;
  line-height: 70px;
  background-size: 506px 68px;
  background-repeat: no-repeat;
  background-position: center center;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  padding-right: 58px;
  text-align: right;
  box-sizing: border-box;
  font-family: PangMenZhengDao;
  margin-left: -13px;
}
</style>
