<template>
  <div class="map-container" ref="containerRef">
    <img class="map-bg" :src="background" />
    <div class="points">
      <div
        @click="chooseArea(area)"
        :class="[
          'p cursor-pointer',
          activeArea.key === area.key ? 'active' : '',
        ]"
        :style="{ left: area.pos[0] + '%', top: area.pos[1] + '%' }"
        v-for="area in areaList"
        :key="area.name"
      >
        <img
          class="actived"
          :src="map_selected"
          v-if="activeArea.key === area.key"
        />
        <img class="un-actived" :src="map_unselected" v-else />
        <span>{{ area.name }}</span>
      </div>
    </div>
    <div class="tooltip" v-show="tooltipVisible" :style="tooltipStyle">
      <p class="city">{{ activeArea.areaName }}</p>
      <p class="split-line"></p>
      <p class="info">
        <span class="label">一级巡检点：</span
        ><span class="value">{{ activeArea?.multiBuildingNum || 0 }}</span>
      </p>
      <p class="info">
        <span class="label">二级网格：</span
        ><span class="value">{{ activeArea?.gridTypeNum || 0 }}</span>
      </p>
      <p class="info">
        <span class="label">营业厅：</span
        ><span class="value">{{ activeArea?.businessHallNum || 0 }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, unref, watch } from "vue";
import map_hz from "/@/assets/images/analyze/map_hz.png";
import map_huz from "/@/assets/images/analyze/map_huz.png";
import map_jx from "/@/assets/images/analyze/map_jx.png";
import map_sx from "/@/assets/images/analyze/map_sx.png";
import map_nb from "/@/assets/images/analyze/map_nb.png";
import map_qz from "/@/assets/images/analyze/map_qz.png";
import map_tz from "/@/assets/images/analyze/map_tz.png";
import map_jh from "/@/assets/images/analyze/map_jh.png";
import map_ls from "/@/assets/images/analyze/map_ls.png";
import map_wz from "/@/assets/images/analyze/map_wz.png";
import img_zs from "/@/assets/images/analyze/map_zs.png";
import map_bg from "/@/assets/images/analyze/map.png";
import map_selected from "/@/assets/images/analyze/map_selected.png";
import map_unselected from "/@/assets/images/analyze/map_unselected.png";

const props = defineProps({
  data: Object,
  areaCode: string,
});

const emit = defineEmits(["handleAreaChange"]);
const containerRef = ref();
const activeArea = ref({});
const tooltipVisible = ref(false);

const areaList = ref([
  {
    name: "杭州",
    key: "hz",
    areaCode: 3301,
    pos: [240, 220].map((p) => parseInt((p / 750) * 100)),
    img: map_hz,
  },
  {
    name: "湖州",
    key: "huz",
    areaCode: 3305,
    pos: [300, 100].map((p) => parseInt((p / 750) * 100)),
    img: map_huz,
  },
  {
    name: "嘉兴",
    key: "jx",
    areaCode: 3304,
    pos: [420, 100].map((p) => parseInt((p / 750) * 100)),
    img: map_jx,
  },
  {
    name: "绍兴",
    key: "sx",
    areaCode: 3306,
    pos: [400, 220].map((p) => parseInt((p / 750) * 100)),
    img: map_sx,
  },
  {
    name: "宁波",
    key: "nb",
    areaCode: 3302,
    pos: [520, 230].map((p) => parseInt((p / 750) * 100)),
    img: map_nb,
  },
  {
    name: "舟山",
    key: "zs",
    areaCode: 3309,
    pos: [630, 200].map((p) => parseInt((p / 750) * 100)),
    img: img_zs,
  },
  {
    name: "衢州",
    key: "qz",
    areaCode: 3308,
    pos: [120, 380].map((p) => parseInt((p / 750) * 100)),
    img: map_qz,
  },
  {
    name: "金华",
    key: "jh",
    areaCode: 3307,
    pos: [320, 340].map((p) => parseInt((p / 750) * 100)),
    img: map_jh,
  },
  {
    name: "台州",
    key: "tz",
    areaCode: 3310,
    pos: [500, 380].map((p) => parseInt((p / 750) * 100)),
    img: map_tz,
  },
  {
    name: "丽水",
    key: "ls",
    areaCode: 3311,
    pos: [220, 480].map((p) => parseInt((p / 750) * 100)),
    img: map_ls,
  },
  {
    name: "温州",
    key: "wz",
    areaCode: 3303,
    pos: [400, 500].map((p) => parseInt((p / 750) * 100)),
    img: map_wz,
  },
]);

const background = computed(() => {
  return unref(activeArea)?.img || map_bg;
});

watch(
  () => props.data,
  () => {
    const dataMap = {};
    props.data.map((item) => {
      dataMap[item.areaCode] = item;
    });
    unref(areaList).map((area) => {
      const data = dataMap[area.areaCode] || {};
      area.businessHallNum = data.businessHallNum;
      area.gridTypeNum = data.gridTypeNum;
      area.multiBuildingNum = data.multiBuildingNum;
      area.areaName = data.areaName;
    });
  }
);
watch(
  () => props.areaCode,
  () => {
    if (+props.areaCode !== +unref(activeArea)?.areaCode) {
      activeArea.value =
        unref(areaList).find((r) => r.areaCode === +props.areaCode) || {};
    }
    if (!props.areaCode) {
      tooltipVisible.value = false;
    }
    // if()
  }
);

const tooltipStyle = computed(() => {
  const area = unref(areaList).find((r) => r.key === unref(activeArea).key);
  const offset = [-230, -120];
  if (!area) return {};

  const left =
    (area.pos[0] / 100) * containerRef.value.offsetWidth + offset[0] + "px";
  const top =
    (area.pos[1] / 100) * containerRef.value.offsetHeight + offset[1] + "px";
  return { left, top };
});

function chooseArea(area) {
  activeArea.value = area;
  tooltipVisible.value = true;
  emit("handleAreaChange", area.areaCode);
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  position: relative;
}
.map-bg {
  // width: 898px;
  width: 100%;
}
.points {
}
.p {
  position: absolute;
  display: flex;
  align-items: center;
}
.p > img {
  width: 100px;
  height: 66px;
  display: block;
}
.p > img.actived {
  width: 184px;
  height: 200px;
  transform: translate(-45px, -90px);
}
.p.active > span {
  transform: translate(-91px, -137px);
}
.p > span {
  margin-top: 3px;
  margin-left: -45px;
  font-size: 14px;
  font-family: TRENDS;
  color: #ffffff;
  line-height: 20px;
}
.tooltip {
  position: absolute;
  left: 0;
  top: 0;
  background: url("/@/assets/images/analyze/map_tooltip_bg.png") 0 0/100% 100%
    no-repeat;
  width: 230px;
  padding: 17px 23px 30px;
  .city {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 22px;
  }
  .split-line {
    height: 2px;
    opacity: 0.3;
    margin-left: -13px;
    margin-right: -13px;
    border: 1px solid #ffffff;
  }
  .info {
    margin-bottom: 0;
    margin-top: 8px;
    margin-bottom: 2px;
    .label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 15px;
    }
    .value {
      font-size: 16px;
      font-family: "datav_number";
      color: #ffd240;
      line-height: 21px;
    }
  }
}
</style>
