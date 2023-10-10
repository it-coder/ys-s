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
  background: url("/@/assets/images/title_bg_n.png") no-repeat 0 0;
  line-height: 70px;
  background-size: 506px 68px;
  background-repeat: no-repeat;
  background-position: center center;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  padding-left: 58px;
  box-sizing: border-box;
  font-family: PangMenZhengDao;
  margin-left: -13px;
}
</style>
