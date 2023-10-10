<template>
  <div class="analyze-container" @click="handleGlobalClick">
    <div class="analyze-inner" ref="analyzeRef">
      <!-- <div class="loading" v-show="loading">
        <Spin size="large" />
      </div> -->
      <div class="title-wrap"><span>浙江移动物业巡检驾驶舱 </span></div>
      <div class="action-wrap">
        <div class="search">
          <Form
            ref="formRef"
            layout="inline"
            class="search-form"
            :model="searchFormState"
          >
            <form-item label="" name="year">
              <date-picker
                v-model:value="searchFormState.year"
                mode="year"
                placeholder="请选择年份"
                format="YYYY"
                dropdownClassName="analyze-component--datepicker"
                :disabled-date="disabledDate"
                :open="yearShowOne"
                @openChange="openChangeOne"
                @panelChange="panelChangeOne"
                :allowClear="false"
            /></form-item>
            <form-item label="" name="quarter">
              <Select
                ref="select"
                v-model:value="searchFormState.quarter"
                dropdownClassName="analyze-component--select"
                placeholder="请选择季度"
                style="width: 100px"
                @focus="focus"
                @change="handleChange"
              >
                <select-option
                  :key="quarter.value"
                  v-for="quarter in quarterList"
                  :value="quarter.value"
                  :disabled="quarter.disabled"
                  >{{ quarter.label }}</select-option
                >
              </Select>
            </form-item>
            <form-item label="" name="areaCode">
              <Select
                ref="select"
                allowClear
                dropdownClassName="analyze-component--select"
                v-model:value="searchFormState.areaCode"
                placeholder="请选择市区"
                style="width: 100px"
              >
                <select-option
                  :key="item.value"
                  v-for="item in areaList"
                  :value="item.value"
                  >{{ item.label }}</select-option
                >
              </Select>
            </form-item>
            <Button @click="search">搜索</Button>
          </Form>
        </div>
        <div class="download">
          <Button @click="openDownloadModal"
            ><template #icon><DownloadOutlined /></template>下载巡检报表</Button
          >
        </div>
      </div>
      <div class="content">
        <div class="slide-wrap left-slide">
          <LeftInspTimesChart :data="topStatistic?.checkAll || []" />
          <LeftTotalData :data="detailStatistic" />
        </div>
        <div class="map-wrap">
          <CenterTotalData :data="detailStatistic" />
          <CenterMap
            :data="mapStatistic"
            :areaCode="currentAreaCode"
            @handleAreaChange="handleAreaChange"
          />
        </div>
        <div class="slide-wrap right-slide">
          <RightInspResolveChart :data="topStatistic || []" />
          <RightNotice class="notice" :data="notice" />
          <RightAbnormal class="abnormal" :data="abnormal" />
        </div>
      </div>
      <Modal
        class="modal__download-analyze"
        v-model:visible="donwloadModalVisible"
        title=""
        :footer="null"
        :closable="false"
        :width="640"
      >
        <div class="download-modal-inner">
          <div class="download-modal-header">
            <span>下载</span>
            <img
              :src="downloadCloseIcon"
              class="cursor-pointer"
              @click="donwloadModalVisible = false"
            />
          </div>
          <Form
            ref="downloadFormRef"
            :model="downloadFormState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :rules="donwloadRules"
          >
            <form-item label="选择时间" class="download-form-item" name="range">
              <DatePicker.RangePicker
                dropdownClassName="analyze-component--datepicker"
                v-model:value="downloadFormState.range"
                :locale="locale"
                style="width: 340px"
            /></form-item>
            <form-item
              label="选择地市"
              class="download-form-item"
              name="areaCode"
            >
              <Select
                ref="select"
                dropdownClassName="analyze-component--select"
                placeholder="请选择地市"
                style="width: 340px"
                v-model:value="downloadFormState.areaCode"
              >
                <select-option
                  :key="item.value"
                  v-for="item in authorizedAreaList"
                  :value="item.value"
                  >{{ item.label }}</select-option
                >
              </Select>
            </form-item>
          </Form>
          <Button class="download-modal-action" @click="download">下载</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref, computed, onMounted, nextTick } from 'vue'
import { Form, Select, DatePicker, Button, Modal } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
// import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn'

// import {
//   queryTopStatistic,
//   queryMapStatistic,
//   queryDetailStatistic,
//   queryNotice,
//   queryAbnormal,
//   exportData,
// } from '/@/api/analyze/index'
// import locale from '/~/ant-design-vue/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'
import moment from 'moment'
// import { downloadByData } from '/@/utils/file/download'

import { getAreaMap } from '/@/api/system/address/index'
import LeftTotalData from './components/LeftTotalData.vue'
import LeftInspTimesChart from './components/LeftInspTimesChart.vue'
import RightInspResolveChart from './components/RightInspResolveChart.vue'
import CenterTotalData from './components/CenterTotalData.vue'
import RightNotice from './components/RightNotice.vue'
import RightAbnormal from './components/RightAbnormal.vue'
import CenterMap from './components/CenterMap.vue'
import downloadCloseIcon from '/@/assets/images/analyze/download_modal_close.png'

const FormItem = Form.Item
const SelectOption = Select.Option

const loading = ref(true)
const currentAreaCode = ref('')

const downloadFormRef = ref()
const searchFormState = reactive({
  year: moment(),
  quarter: Math.ceil((new Date().getMonth() + 1) / 3),
  areaCode: null,
})

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }

const areaList = ref([])
const authorizedAreaList = ref([])

const yearShowOne = ref(false)
const donwloadModalVisible = ref(false)

const mapStatistic = ref()
const detailStatistic = ref({})
const notice = ref()
const abnormal = ref()
const topStatistic = ref()
const analyzeRef = ref()

const downloadFormState = reactive({
  areaCode: '',
  range: [],
})
const donwloadRules = {
  range: { required: true, message: '请选择时间', trigger: 'blur', type: 'array' },
  areaCode: { required: true, message: '请选择地市', trigger: 'blur' },
}

const quarterList = computed(() => {
  const currentYear = new Date().getFullYear()
  const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3)
  const selectedYear = searchFormState.year ? new Date(searchFormState.year).getFullYear() : null

  return [
    {
      label: '第一季度',
      value: 1,
      disabled: false,
    },
    {
      label: '第二季度',
      value: 2,
      disabled: false,
    },
    {
      label: '第三季度',
      value: 3,
      disabled: false,
    },
    {
      label: '第四季度',
      value: 4,
      disabled: false,
    },
  ].map((item) => {
    if (!selectedYear) return item
    if (currentYear < selectedYear) {
      return { ...item, disabled: true }
    } else if (currentYear === selectedYear) {
      return {
        ...item,
        disabled: currentQuarter < item.value,
      }
    } else {
      return item
    }
  })
})

function handleAreaChange(areaCode) {
  if (+areaCode !== +searchFormState.areaCode) {
    searchFormState.areaCode = areaCode + ''
    search()
  }
}

load()

queryMapStatistic().then((res) => {
  mapStatistic.value = res
})
function load(params = {}) {
  loading.value = true
  const ignoreTimeParams = {
    areaCode: params?.areaCode,
  }
  const ignoreAreaParams = {
    year: params?.year,
    quarter: params?.quarter,
  }
  Promise.all([
    queryTopStatistic(ignoreAreaParams).then((res) => {
      topStatistic.value = res
    }),
    queryDetailStatistic(params).then((res) => {
      detailStatistic.value = res
    }),
    queryNotice(ignoreTimeParams).then((res) => {
      notice.value = res?.records || []
    }),
    queryAbnormal(ignoreTimeParams).then((res) => {
      abnormal.value = res?.records || []
    }),
  ])
    .then(() => {
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function search() {
  const params = {
    ...searchFormState,
    year: searchFormState.year ? dayjs(searchFormState.year).format('YYYY') : '',
  }
  currentAreaCode.value = searchFormState.areaCode
  load(params)
}

getAreaMap({ authorized: 2 }).then(async (res) => {
  const arr = []

  res?.map((item) => {
    arr.push({
      label: item.name,
      value: item.code,
    })
    if (item.children) {
      item.children.map((c) => {
        arr.push({
          label: c.name,
          value: c.code,
        })
      })
    }
  })
  authorizedAreaList.value = arr
})

getAreaMap().then(async (res) => {
  const zjAreas = res?.[0]
  areaList.value = zjAreas.children.map((city) => {
    return {
      label: city.name,
      value: city.code,
    }
  })
})

function openDownloadModal() {
  downloadFormState.range = []
  downloadFormState.areaCode = unref(authorizedAreaList)?.[0]?.value || ''
  donwloadModalVisible.value = true
}

function download() {
  unref(downloadFormRef)
    .validateFields()
    .then(async (res) => {
      const date = res.range.map((d) => {
        return dayjs(d).format('YYYY-MM-DD')
      })
      const params = {
        areaCode: res.areaCode,
        startTime: date[0] ? date[0] + ' 00:00:00' : '',
        endTime: date[1] ? date[1] + ' 23:59:59' : '',
      }
      const stream = await exportData(params)
      downloadByData(stream.data, '巡检数据.xlsx')
    })
}

function openChangeOne(status) {
  if (status) {
    setTimeout(() => {
      yearShowOne.value = true
    }, 20)
  }
}

// 得到年份选择器的值
function panelChangeOne(value) {
  searchFormState.year = value //
  const selectedYear = new Date(value).getFullYear()
  const currentYear = new Date().getFullYear()
  if (selectedYear === currentYear) {
    if (
      +searchFormState.quarter &&
      Math.ceil(new Date().getMonth() / 3) < +searchFormState.quarter
    ) {
      // searchFormState.quarter = null
    }
  }
  if (selectedYear > currentYear) {
    searchFormState.quarter = null
  }
  yearShowOne.value = false
}

function handleGlobalClick() {
  if (yearShowOne.value) {
    yearShowOne.value = false
  }
}

function adjustWindowScale() {
  const baseWidth = 1760
  const clientWidth = document.body.clientWidth
  const scale = (clientWidth / baseWidth).toFixed(2)

  if (clientWidth < baseWidth) {
    unref(analyzeRef).style.transform = `scale(${scale})`
  }
}

onMounted(async () => {
  await nextTick()
  useWindowSizeFn(
    function () {
      adjustWindowScale()
    },
    150,
    { immediate: true },
  )
})
</script>

<style lang="scss" scoped>
.analyze-container {
  width: 100%;
  overflow-x: scroll;
  min-height: 100vh;
  min-width: 1760px;
  background: url("/@/assets/images/analyze/bg_nocompress.jpg") 0 0/100% 100%
    no-repeat;
  // @media screen and (max-width: @screen-2xl) {
  //   transform: scale(0.9);
  //   transform-origin: left top;
  // }
}
.analyze-inner {
  transform-origin: left top;
  // min-width: 1600px;
  // @media screen and (max-width: @screen-2xl) {
  //   transform: scale(0.8);
  //   transform-origin: left top;
  // }
}
.slide-wrap {
  width: 23%;
  min-width: 400px;
}
.map-wrap {
  flex: 1;
  margin: 0 40px;
  padding-top: 60px;
  min-width: 800px;
}
.action-wrap {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
}
.title-wrap {
  margin-bottom: -80px;
  text-align: center;
  font-size: 40px;
  height: 140px;
  font-family: PangMenZhengDao;
  color: #ffffff;
  line-height: 60px;
  letter-spacing: 2px;
  background: url("/@/assets/images/analyze/title_bg.png") 0 0/100% 100%
    no-repeat;
  > span {
    position: relative;
    top: 20px;
  }
}
.content {
  display: flex;
  flex-direction: row;
  padding: 12px 40px 0;
  justify-content: space-between;
}
.notice {
  margin-bottom: 20px;
}
.loading {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
}
// :deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
//   background: rgba(15, 35, 88, 0.8);
//   border: none;
// }
// :deep(.ant-select-single.ant-select-show-arrow .ant-select-selection-item) {
//   color: #fff;
// }
p {
  margin-bottom: 0;
}
:deep(p) {
  margin-bottom: 0;
}
</style>
<style lang="scss">
.modal__download-analyze {
  color: #fff;
  background: url("/@/assets/images/analyze/download_modal_bg.png") 0 0/100%
    100% no-repeat;
  .ant-modal-content {
    background: none;
  }
  .download-modal-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-left: 12px;
    > img {
      width: 27px;
      height: 27px;
    }
    > span {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 22px;
      text-shadow: 0px 0px 6px #1393f4;
    }
  }
  .download-modal-inner {
    padding-bottom: 80px;
    .download-form-item {
      margin-left: -40px;
      justify-content: center;
      .ant-form-item-label > label {
        color: #fff;
        font-size: 14px;
      }
    }
    .download-modal-action {
      margin-top: 6px;
      display: inline-block;
      position: relative;
      left: 143px;
      color: #fff;
      width: 126px;
      height: 31px;
      border: none;
      background: url("/@/assets/images/analyze/download_action_bg.png") 0 0/100%
        100% no-repeat;
    }
  }
  .ant-select-selection-search-input::placeholder {
    color: #fff;
  }
  .ant-form-item-has-error .ant-input,
  .ant-form-item-has-error .ant-input-affix-wrapper,
  .ant-form-item-has-error .ant-input:hover,
  .ant-form-item-has-error .ant-input-affix-wrapper:hover {
    background: rgb(15, 35, 88);
  }
  .ant-form-item-has-error
    .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    background: rgb(15, 35, 88);
  }
}

.analyze-container,
.modal__download-analyze {
  .ant-input,
  .ant-select {
    background: #0f2358;
    border: 1px solid #1b3e99;
    color: #ffffff;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background: #0f2358;
    border: 1px solid #1b3e99;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
  }
  .ant-select-clear,
  .ant-calendar-picker-clear {
    background: #0f2358;
  }
  .ant-select-clear:hover,
  .ant-calendar-picker-clear:hover {
    color: #ccc;
  }
  .ant-btn {
    background: linear-gradient(180deg, #1b3e99 0%, #0e1f43 100%);
    color: #fff;
    border: 1px solid rgba(27, 62, 153, 1);
  }

  .anticon.anticon-close-circle {
    color: rgba(255, 255, 255, 0.6);
  }
  .ant-form-inline .ant-form-item {
    margin-right: 11px;
  }
}

.analyze-component--datepicker
  .ant-calendar-year-panel-selected-cell
  .ant-calendar-year-panel-year {
  color: #ffffff !important;
  background: #1e92ff;
  border-radius: 2px;
}
.analyze-component--datepicker .ant-calendar {
  background: linear-gradient(156deg, rgba(17, 40, 101, 0.95) 0%, #0e1328 100%);
  box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.5),
    inset 0px 0px 30px 3px rgba(0, 115, 255, 0.27);
  border-radius: 2px;
  border: 1px solid #1b3e99;
}
.analyze-component--datepicker {
  color: rgba(255, 255, 255, 0.85);
  .ant-calendar-input-wrap {
    border: none;
  }
  .ant-calendar-year-panel > div {
    background: linear-gradient(
      156deg,
      rgba(17, 40, 101, 0.95) 0%,
      #0e1328 100%
    );
  }
  .ant-calendar-year-panel-header {
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  .ant-calendar .ant-calendar-input {
    background: transparent;
  }
  .ant-calendar-year-panel-year:hover {
    background: rgba(30, 146, 255, 1);
  }
  .ant-calendar-header a:hover {
    color: #fff;
  }
  .ant-calendar-input {
    color: #fff;
  }
  .ant-calendar-year-panel-header .ant-calendar-year-panel-century-select,
  .ant-calendar-year-panel-header .ant-calendar-year-panel-decade-select,
  .ant-calendar-year-panel-header .ant-calendar-year-panel-year-select,
  .ant-calendar-year-panel-header .ant-calendar-year-panel-month-select {
    color: #fff;
  }
  .ant-calendar-year-panel-year {
    color: #fff;
  }
  .ant-calendar-year-panel-last-decade-cell .ant-calendar-year-panel-year,
  .ant-calendar-year-panel-next-decade-cell .ant-calendar-year-panel-year {
    color: rgba(0, 0, 0, 0.25);
  }
  .ant-calendar-range .ant-calendar-in-range-cell::before {
    background: #213b5a;
  }
  .ant-calendar-picker-container {
  }
  .ant-calendar-last-month-cell .ant-calendar-date,
  .ant-calendar-next-month-btn-day .ant-calendar-date,
  .ant-calendar-last-month-cell .ant-calendar-date:hover,
  .ant-calendar-next-month-btn-day .ant-calendar-date:hover {
    color: rgba(255, 255, 255, 0.25);
  }
  .ant-calendar-date {
    color: rgba(255, 255, 255, 0.65);
  }
  .ant-calendar-date:hover {
    background: #177ddc;
    color: #fff;
  }
  .ant-calendar-header .ant-calendar-century-select,
  .ant-calendar-header .ant-calendar-decade-select,
  .ant-calendar-header .ant-calendar-year-select,
  .ant-calendar-header .ant-calendar-month-select {
    color: rgba(255, 255, 255, 0.85);
  }
}
.analyze-component--select {
  background: linear-gradient(156deg, rgba(17, 40, 101, 0.95) 0%, #0e1328 100%);
  box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.5),
    inset 0px 0px 30px 3px rgba(0, 115, 255, 0.27);
  border-radius: 2px;
  border: 1px solid #1b3e99;
  color: #fff;
  .ant-select-item {
    color: #fff;
  }
  .ant-select-item-option-disabled {
    color: rgba(255, 255, 255, 0.4);
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled),
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background: rgba(30, 146, 255, 1);
    color: #fff;
  }
}
</style>
