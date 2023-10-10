<template>
  <div
    class="outter"
    :id="platform === 'web' ? 'fixed-body' : ''"
    :data-platform="platform"
  >
    <div class="container" ref="futureRef">
      <template v-if="platform === 'web'">
        <div class="global-header">
          <p class="title">态势感知</p>
          <p class="time">2023-10-14 14:34:25</p>
          <p class="num">34</p>
          <p class="desc">实时安全态势</p>
        </div>
        <div class="tabbar-nav"></div>
        <div class="left-bg"></div>
        <div class="right-bg"></div>
      </template>
      <!-- <component class="m-c" :is="componentToRender"></component> -->
      <Trending :platform="platform" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, unref, nextTick } from "vue";
import { useWindowSizeFn } from "/@/hooks/event/useWindowSizeFn";
import { useRouter, useRoute } from "vue-router";
import Trending from "./trending/index.vue";

const route = useRoute();
const defaultTab = route?.query?.tab;

const visible = ref(false);
const videoUrl = ref("");

const points = ref([]);

const platform = ref("web");

const activeTab = ref({});
const data = {
  communityName: "",
  tabList: [
    {
      id: "whG5yckk",
      name: "一老一小",
      component: Trending,
    },
  ],
};

const futureRef = ref(null);

function adjustWindowScale() {
  const fixedSize = {
    width: 1920,
    height: 1080,
  };
  const clientWidth = document.body.clientWidth;
  if (clientWidth < 500) {
    platform.value = "app";
    const scale = (clientWidth / 500).toFixed(4);
    if (unref(futureRef)) {
      unref(futureRef).style.transform = `scale(${scale})`;
    }
    return;
  }
  const scale = (clientWidth / fixedSize.width).toFixed(4);
  if (unref(futureRef)) {
    unref(futureRef).style.transform = `scale(${scale})`;
  }
}

async function onEngineLoaded(_) {
  await nextTick();
  useWindowSizeFn(
    function () {
      adjustWindowScale();
    },
    50,
    { immediate: true }
  );
}

onMounted(async () => {
  if (defaultTab) {
    activeTab.value =
      data.tabList.find((item) => item.id === defaultTab) || data.tabList[0];
  } else {
    activeTab.value = data.tabList[0];
  }
  onEngineLoaded();
});

const changePage = (item) => {
  activeTab.value = item;
};

const componentToRender = computed(() => {
  return unref(activeTab)?.component;
});
</script>

<style lang="scss" scoped>
.outter[data-platform="app"] {
  background: #040914;
  width: 500px;
}
#fixed-body {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  position: relative;
  transform-origin: left top;
}
.main-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
}
.m-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.m-c {
  position: relative;
  z-index: 1;
}
.container {
  // background-image: url("/@/assets/images/main_bg.png");
  // background-size: 100% 100%;
  width: 100%;
  height: 100%;
  background: #040914;
  transform-origin: left top;
  // background-repeat: no-repeat;
}
.left-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 650px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(7, 22, 46, 0.8) 0%,
    rgba(7, 22, 46, 0.8) 60%,
    rgba(2, 6, 30, 0) 100%
  );
}
.right-bg {
  position: absolute;
  right: 0;
  top: 0;
  width: 650px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(2, 6, 30, 0) 0%,
    rgba(7, 22, 46, 0.95) 40%,
    rgba(7, 22, 46, 1) 100%
  );
}
.tabbar-nav {
  width: 100%;
  height: 67px;
  display: flex;
  align-items: center;
  padding-left: 100px;
  // background-image: url("/@/assets/images/nav_title.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  z-index: 1;
}
.tabbar-nav-name {
  position: absolute;
  left: 50%;
  top: 38%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, #ffffff 0%, #d7fffe 65%, #ffffff 100%);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 1px 5px 5px rgba(0, 0, 0, 0.1);
  font-size: 48px;
  line-height: 95px;
  height: 95px;
  font-family: YouSheBiaoTiHei-Regular;
  font-family: PangMenZhengDao;
}
.tabbar-nav > ul {
  display: flex;
  align-items: center;
}
.tabbar-nav > ul > li {
  font-size: 20px;
  color: #aaa;
  width: 110px;
  height: 41px;
  line-height: 35px;
  margin: -33px -5px 0;
  text-align: center;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  font-family: PangMenZhengDao;
}
.tabbar-nav > ul .active-item {
  position: relative;
  color: #ffffff;
  background-image: url("/@/assets/images/nav_active.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  font-family: PangMenZhengDao;
  text-shadow: 0px 2px 20px rgba(24, 243, 248, 0.65);
}
.pop-video {
  width: 100%;
  height: 300px;
}
.insp-modal :deep(.ant-modal-body) {
  padding: 0;
}
.m-bg :deep(#streamingVideo) {
  width: 1920px !important;
  height: 1080px !important;
}
.m-bg :deep(.player) {
  width: 1920px !important;
  height: 1080px !important;
}

.global-header {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  margin: auto;
  color: #fff;
  z-index: 1;
  width: 800px;
  text-align: center;
  font-family: PangMenZhengDao;
  .title {
    font-size: 48px;
    font-family: PangMenZhengDao;
    letter-spacing: 3px;
  }
  .time {
    margin-top: 16px;
    display: inline-block;
    padding: 3px 20px;
    height: 33px;
    background: rgba(39, 44, 47, 0.9);
    border: 1px solid rgba(151, 151, 151, 0.06);
    font-size: 26px;
    font-family: PangMenZhengDao;
    font-weight: bold;
    color: #f5fcff;
    line-height: 26px;
  }
  .num {
    margin-top: 40px;
    font-size: 48px;
    font-family: PangMenZhengDao;
    color: #f5fcff;
    line-height: 55px;
    letter-spacing: 1px;
    background: linear-gradient(180deg, #fa996d 0%, #ff7230 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .desc {
    font-size: 16px;
    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #f5fcff;
    line-height: 22px;
  }
}
</style>

<style lang="scss"></style>
