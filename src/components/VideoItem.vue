<template>
  <div class="video-inner">
    <span class="video-title" v-if="title">{{ title }}</span>
    <video
      v-if="src"
      :id="videoId"
      class="video-js vjs-default-skin my-video"
      autoplay
      controls
      muted
      preload="auto"
      style="width: 100%; height: 100%"
    >
      <source
        :src="src"
        type="application/x-mpegURL"
        style="width: 100%; height: 100%"
      />
    </video>
  </div>
</template>

<script>
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";
import lang_zhcn from "video.js/dist/lang/zh-CN.json";
import {
  defineComponent,
  watch,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";

videojs.addLanguage("zh-CN", lang_zhcn);

export default defineComponent({
  name: "VideoItem",

  props: {
    // 视频地址
    src: {
      type: String,
      required: true,
    },
    // 视频地址
    title: {
      type: String,
    },
    // 视频列表中每个视频的索引值
    index: {
      default: 0,
    },
  },

  setup(props) {
    // 监听视频地址变化
    watch(
      () => props.src,
      (n) => {
        changeVideoSource(n);
      }
    );

    // 在onMounted阶段进行初始化
    onMounted(() => {
      initVideo();
    });

    // 在onBeforeUnmount阶段释放资源
    onBeforeUnmount(() => {
      disposeVideo();
    });

    // 用于多视频列表区分每个视频的id
    const videoId = computed(() => {
      return "my-video" + props.index;
    });
    // 初始化视频
    function initVideo() {
      if (!props.src) return;

      videojs(
        videoId.value,
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: {
            playToggle: true,
            captionsButton: false,
            chaptersButton: false,
            subtitlesButton: false,
            remainingTimeDisplay: false,
            progressControl: {
              seekBar: true,
            },
            volumePanel: {
              inline: false,
              CurrentTimeDisplay: true,
            },
            fullscreenToggle: true,
            playbackRateMenuButton: false,
          },
          language: "zh-CN",
        },
        () => {
          const myPlayer = videojs(videoId.value);
          // myPlayer.play();
          myPlayer.on("error", () => {});
        }
      );
    }
    // 视频地址发生变化时的处理
    function changeVideoSource(src) {
      if (!src) return;

      const myPlayer = videojs(videoId.value);
      myPlayer.src([
        {
          type: "application/x-mpegURL",
          src: src,
        },
      ]);
      myPlayer.play();
    }
    function disposeVideo() {
      try {
        const myPlayer = videojs(videoId.value);
        myPlayer.dispose();
      } catch (e) {}
    }

    return {
      videoId,
    };
  },
});
</script>

<style lang="scss" scoped>
.video-inner {
  position: relative;
  width: 100%;
  height: 100%;
}
.video-title {
  color: #ffffff;
  font-size: 14px;
  position: absolute;
  top: 8px;
  left: 6px;
  z-index: 1;
  font-family: "Microsoft YaHei";
}
</style>
