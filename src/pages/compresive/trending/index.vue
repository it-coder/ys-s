<template>
  <div class="trending">
    <template v-if="platform === 'web'">
      <div class="left-side">
        <bugs />
        <property />
        <basic-line />
      </div>
      <div class="center">
        <Cloud />
        <Risk />
      </div>
      <div class="right-side">
        <Security />
        <Attack />
        <Warning />
      </div>
    </template>
    <template v-else>
      <div class="mobile-container">
        <bugs />
        <property />
        <basic-line />
        <Cloud />
        <Risk />
        <Security />
        <Attack />
        <Warning />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Bugs from "./components/Bugs.vue";
import BasicLine from "./components/BasicLine.vue";
import Property from "./components/Property.vue";
import Attack from "./components/Attack.vue";
import Warning from "./components/Warning.vue";
import Security from "./components/Security.vue";
import Risk from "./components/Risk.vue";
import Cloud from "./components/Cloud.vue";

defineProps({
  platform: {
    type: String,
    default: "web",
  },
});
</script>

<style lang="scss" scoped>
.trending {
  position: relative;
  display: flex;
  margin-top: -35px;
  flex-direction: row;
  justify-content: space-between;
}
.mobile-container {
  min-height: 100vh;
  overflow: scroll;
  margin-top: 35px;
  background: #040914;
  padding: 20px;
  // box-sizing: border-box;
}
::v-deep .mobile-container .m-item {
  // transform: scale(0.8);
  // transform: scale(0.9);
  transform-origin: left top;
}
.left-side {
  position: absolute;
  left: 24px;
  top: 0;
  width: 463px;
}
.center {
  position: absolute;
  width: 940px;
  left: 0;
  right: 0;
  top: 640px;
  margin: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.right-side {
  width: 463px;
  position: absolute;
  right: 24px;
  top: -10px;
}
</style>
