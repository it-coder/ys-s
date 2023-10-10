<template>
  <div class="m-item">
    <item-title title="人口年龄分布" />
    <div v-if="!detailId">
      <div class="t-content">
        <div class="t-flex-1">
          <img src="@/assets/img/echarts/greenPeople.png" />
          <div class="text_content">
            <span class="num">{{ total }}</span>
            <span class="text">总人数（人）</span>
          </div>
        </div>
      </div>
      <div class="m-content">
        <!-- <div id="Ebox"></div> -->
        <Cricle :id="'234'" :dataList="dataList"></Cricle>
        <!-- <div class="chartsPercent">
          <span class="percent">{{ maxPercent }}</span>
          <span class="service">{{ maxName }}</span>
        </div> -->
        <ul class="legend">
          <li class="legendItem" v-for="(item, index) in dataList" :key="index">
            <div class="circle" :class="'circle' + index"></div>
            <span class="age">{{ item.name }}</span>
            <span class="detail" @click="toTable(item)">详情></span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="detailId" class="d-content">
      <div class="backButton" @click="toBack">返回</div>
      <dv-scroll-board class="dv-scroll" ref="dvScroll" :config="config" />
    </div>
  </div>
</template>

<script setup>
import Cricle from "./CricleTwo.vue";
import ItemTitle from "../ItemTitle.vue";
import { queryAgeDistribution, queryPersonList } from "@/api/futureService";
import { onMounted, ref, onUnmounted } from "vue";
const timer = ref(null);
const config = {
  header: ["姓名", "性别", "年龄", "房屋"],
  align: ["center", "center", "center", "center"],
  data: [
    ["慕容复", "男", "29", "嘉慧小区17号楼1单元501"],
    ["慕容复", "男", "29", "嘉慧小区17号楼1单元501"],
    ["慕容复", "男", "29", "嘉慧小区17号楼1单元501"],
    ["慕容复", "男", "29", "嘉慧小区17号楼1单元501"],
    ["慕容复", "男", "29", "嘉慧小区17号楼1单元501"],
  ],
  rowNum: 4,
  columnWidth: [200, 150, 150, 350],
  headerBGC: "rgba(55, 112, 255, 0.3)",
  oddRowBGC: "rgba(152, 161, 177, 0.1200)",
  evenRowBGC: "",
  headerHeight: "40",
};

const detailId = ref();
const toDetail = (ageGroup) => {
  queryPersonList(ageGroup).then((res) => {
    if (res.code == 0 && res.data) {
      res.data.map((item, index) => {
        config.data[index] = [item.name, item.sex, item.age, item.houseAddress];
      });
    }
    detailId.value = 1;
  });
};
const toTable = (item) => {
  config.data = [["暂无数据", "暂无数据", "暂无数据", "暂无数据"],];
  item.personList &&
    item.personList.map((item, index) => {
      config.data[index] = [item.name, item.sex, item.age, item.houseAddress];
    });
  detailId.value = 1;
};
const toBack = () => {
  detailId.value = "";
};

const maxPercent = ref("48%");
const maxName = ref("商业服务");
const total = ref(293);
const dataList = ref([
  {
    name: "商业服务",
    y: 10,
    h: 20,
    bfb: 1.5,
  },
  {
    name: "政务服务",
    y: 8,
    h: 10,
    bfb: 2,
  },
  {
    name: "物业服务",
    y: 10,
    h: 10,
    bfb: 1,
  },
]);
onMounted(() => {
  queryAgeDistribution().then((res) => {
    if (res.code == 0) {
      total.value = res.data.total;
      res.data.valueNameVos.map((item) => {
        item.y = item.value;
        item.h = 10;
      });
      dataList.value = res.data.valueNameVos;

      let arr = res.data.valueNameVos;
      let maxNum = arr[0].value;
      let maxIndex = 0;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].value > maxNum) {
          maxNum = arr[i].value;
          maxIndex = i;
        }
      }
      setTimeout(() => {
        maxPercent.value = arr[0].proportion;
        maxName.value = arr[0].name;
      });
      let i = 0;
      timer.value = setInterval(() => {
        maxPercent.value = arr[i].proportion;
        maxName.value = arr[i].name;
        // dataList.value[i].h = 40;
        if (i < arr.length - 1) {
          i++;
        } else {
          i = 0;
        }
      }, 3000);
    }
  }).catch((err)=>{
      console.log(err)
   }).finally(()=>{
     
   }) ;
});
</script>
<style lang="scss" scoped>
.m-item {
  padding-bottom: 10px;
  margin-bottom: 10px;
  background: linear-gradient(
    90deg,
    rgba(32, 140, 255, 0.2) 0%,
    rgba(32, 140, 255, 0) 100%
  );
}
.t-content {
  display: flex;
  position: absolute;
  justify-content: space-between;
  padding: 20px 35px;
  z-index: 99;
  .t-flex-1 {
    display: flex;
    margin: 10px 0 0 10px;
    .text_content {
      display: flex;
      margin-left: 10px;
      margin-top: 12px;
      flex-direction: column;
      color: #ffffff;
      font-size: 28px;
      line-height: 30px;
      font-family: "E-Charts";
      .text {
        font-size: 18px;
      }
    }
    img {
      width: 70px;
      height: 70px;
    }
  }
}
.m-content {
  width: 480px;
  height: 245px;
  position: relative;
  .chartsPercent {
    position: absolute;
    top: 152px;
    left: 86px;
    display: flex;
    text-align: center;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    z-index: 100;

    .service {
      font-family: PingFangSC-Regular, PingFang SC;
    }
    .percent {
      font-family: "E-Charts";
      font-size: 32px;
      margin-bottom: -10px;
    }
  }
  .legend {
    color: #fff;
    position: absolute;
    top: 5px;
    right: 25px;
    .legendItem {
      width: 180px;
      padding: 23px 0;
      border-bottom: 1px dotted #ddd;
      .circle {
        float: left;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #00bcff;
      }
      .circle1 {
        background: #00ffd2;
      }
      // .circle2 {
      //   background: #00ffd2;
      // }
      .circle2 {
        background: #7ce3e2;
      }

      .circle3 {
        background: #dd3bf4;
      }
      .circle4 {
        background: #7262fd;
      }
      .age {
        float: left;
        margin-left: 20px;
        line-height: 12px;
        font-family: "E-Charts";
      }
      .detail {
        float: right;
        margin-left: 40px;
        line-height: 12px;
        font-family: "E-Charts";
        color: #00bcff;
        z-index: 999;
        cursor: pointer;
      }
    }
  }
}
.d-content {
  width: 480px;
  // height: 245px;
  padding: 0 30px;
  position: relative;
  .backButton {
    width: 75px;
    height: 24px;
    margin: 10px 0;
    background: linear-gradient(180deg, #00bcff 0%, #00698e 100%);
    box-shadow: inset 0px 0px 12px 0px #60d5ff;
    border-radius: 2px;
    color: #fff;
    font-family: "E-Charts";
    text-align: center;
    cursor: pointer;
  }
}
.dv-scroll {
  width: 100%;
  height: 200px;
}
.dv-scroll-board .header .header-item {
  font-size: 14px;
  font-weight: 500;
  color: rgba(159, 187, 255, 1);
  height: 40px;
}
.dv-scroll-board .rows .ceil {
  font-size: 14px;
  font-weight: 400;
  color: red;
}

.row-item:hover {
  cursor: pointer;
  background: rgba(71, 173, 255, 0.16);
  box-shadow: inset 0px 0px 13px 0px #018ef7;
  border: 2px solid rgba(62, 167, 255, 0.57);
}

#Ebox {
  width: 480px;
  height: 240px;
  z-index: 99;
}
</style>
