<template>
  <div>
    <van-overlay
      :show="isShow"
      :custom-style="{
        background: 'rgb(255, 255, 255, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '100px',
      }"
    >
      <van-loading size="24px" color="#4994df">
        <span style="color: #4994df">{{ title || "加载中···" }}</span>
      </van-loading>
    </van-overlay>
  </div>
</template>
