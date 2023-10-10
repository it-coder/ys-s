<template>
  <div class="engine">
    <div class="current-point" v-if="!isBackground">
      {{ point }}
    </div>
    <div id="engine" class="engine-container"></div>
  </div>
</template>

<script setup>
import { ref, unref, watch } from "vue";
import { engineHttpUrl, engineWsPrefix } from "/@/config/engine.js";

const props = defineProps({
  isBackground: {
    default: false,
    type: Boolean,
  },
  points: {
    default: () => [],
    type: Array,
  },
});

const emit = defineEmits(["onEngineLoaded", "onPopClick"]);

const engine = ref(null);
const point = ref({});

watch(
  () => props.points,
  () => {
    if (props.points?.length > 0) {
      setTimeout(() => {
        clearDots();
        addDots(props.points);
      }, 2000);
    }
  },
  { immediate: true }
);
function clearDots() {
  unref(engine).sendMessage({
    action: "marker.clearAll",
  });
}
function addDots(pois) {
  pois.map((poi) => {
    const location = poi.point;
    for (let [k, v] of Object.entries(location)) {
      location[k] = +v;
    }

    const msgId = unref(engine).sendMessage({
      action: "marker.createpop",
      location,
      payload: JSON.stringify(poi),
      // offsetVector: {
      //   X: 0,
      //   Y: 0,
      //   Z: 100,
      // },
      firstlevel: poi.type,
      secondlevel: poi.subType,
      // url: "www.baidu.com",
      popname: poi.pointName || "",
      fronsize: 12,
      status: 0,
      webuisize: {
        X: 1000,
        Y: 450,
      },
      // webuioffset: {
      //   X: 20,
      //   Y: 0,
      // },
      breakdown: false,
      hadWebClick: true,
      SapacePopHadNoHoverColor: true,
      visibleheight: 5000,
    });
  });
}

initEngine();

function initEngine() {
  fetch(engineHttpUrl, {
    method: "POST",
  })
    .then((es) => es.json())
    .then((es) => {
      if (es.code !== 0 || !es.data.token) {
        return;
      }
      let link = engineWsPrefix + "?token=" + es.data.token;
      let search = new URLSearchParams(location.search);

      const Engine = window.Engine.default;
      engine.value = new Engine({
        dom: document.getElementById("engine"),
        directServer: link,
        debug: search.get("debug") === "true",
      });

      emit("onEngineLoaded", engine.value);

      unref(engine).addResponseEventListener("onMessage", (data) => {
        const _ = JSON.parse(data);

        if (_.action === "PopClick") {
          emit("onPopClick", JSON.parse(_.payload));
        }

        if (_.action === "MeshClick") {
          point.value = _;
        } else {
          point.value = null;
        }
      });
    })
    .catch((ex) => console.error(ex));
}
</script>

<style lang="scss" scoped>
.current-point {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 200px;
  background: #fff;
  z-index: 99;
  font-size: 12px;
}
</style>
