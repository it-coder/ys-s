<template>
  <div class="trending">
    <template v-if="platform === 'web'">
      <div class="left-side">
        <Resources />
        <ResourceUsedRate />
        <ResourceInsp />
      </div>
      <div class="center">
        <img class="image_19" src="@/assets/images/image_19.png" />
        <img class="earth" src="@/assets/images/center-earth.png" />
        <img class="btm" src="@/assets/images/btm.png" />
      </div>
      <div class="right-side">
        <OrgList />
        <Scene />
        <WarningsAnylize />
      </div>
    </template>
    <template v-else>
      <div class="mobile-container">
        <Resources />
        <ResourceUsedRate />
        <ResourceInsp />
        <OrgList />
        <Scene />
        <WarningsAnylize />
      </div>
    </template>
  </div>
</template>

<script setup>
import Resources from "./components/Resources.vue";
import ResourceUsedRate from "./components/ResourceUsedRate.vue";
import ResourceInsp from "./components/ResourceInsp.vue";
import BasicLine from "./components/BasicLine.vue";
import Property from "./components/Property.vue";
import WarningsAnylize from "./components/WarningsAnylize.vue";
import OrgList from "./components/OrgList.vue";
import Scene from "./components/Scene.vue";
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
}

.mobile-container {
  min-height: 100vh;
  overflow: scroll;
  margin-top: 35px;
  background: #040914;
  padding: 20px;
  // box-sizing: border-box;
}
.left-side {
  position: absolute;
  left: 24px;
  top: -30px;
  width: 463px;
  z-index: 3;
}
.center {
  position: absolute;
  width: 940px;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  > img {
    width: 100%;
    position: absolute;
  }
  .image_19 {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 0;
    top: 460px;
    width: 1920px;
    left: -52%;
  }
  .btm {
    top: 900px;
  }
}
.right-side {
  width: 480px;
  position: absolute;
  right: 24px;
  top: -40px;
  z-index: 3;
}
</style>
