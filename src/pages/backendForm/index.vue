<template>
  <div class="container">
    <el-row :gutter="20" class="header">
      <el-col :span="6"
        ><div class="grid-content bg-purple">系统名称</div></el-col
      >
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首页" name="first"></el-tab-pane>
            <el-tab-pane label="产品" name="second"></el-tab-pane>
            <el-tab-pane label="企业" name="third"></el-tab-pane>
            <el-tab-pane label="配置" name="fourth"></el-tab-pane>
            <el-tab-pane label="设置" name="fifth"></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="1" style="text-align: right">
        <div class="block">
          <BellOutlined :style="{ fontSize: '16px' }" /></div
      ></el-col>
      <el-col :span="2" class="avatar-wrap">
        <div class="block avatar-img">
          <el-avatar
            :size="28"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </div>
        <span>admin</span></el-col
      >
    </el-row>
    <div class="content">
      <el-row>
        <el-col :span="5">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            active-text-color="#fff"
            background-color="#092141"
            text-color="rgba(255,255,255,.5)"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>资源管理</span>
              </template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
              <el-menu-item index="1-3">item three</el-menu-item>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>人员管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><document /></el-icon>
              <span>系统配置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19">
          <div class="inner">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            </el-breadcrumb>
            <p class="page-title">组织管理</p>
            <el-row class="table-container">
              <el-col :span="6">
                <div class="search">
                  <a-input
                    class="search-input"
                    v-model:value="value"
                    placeholder=""
                  />
                  <a-button type="primary">查询</a-button>
                </div>
                <a-tree
                  class="atree"
                  checkable
                  :tree-data="treeData"
                  :field-names="fieldNames"
                  v-model:expandedKeys="expandedKeys"
                  v-model:selectedKeys="selectedKeys"
                  v-model:checkedKeys="checkedKeys"
                  defaultExpandAll
                >
                </a-tree>
              </el-col>
              <el-col :span="16" :offset="1">
                <a-table
                  :row-selection="{}"
                  :dataSource="dataSource"
                  :columns="columns"
                />
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import { BellOutlined } from "@ant-design/icons-vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const expandedKeys = ref(["0-0-0", "0-0-1"]);
const selectedKeys = ref(["0-0-0", "0-0-1"]);
const checkedKeys = ref(["0-0-0", "0-0-1"]);
const fieldNames = {
  children: "child",
  title: "name",
};
const treeData = ref([
  {
    name: "parent 1",
    key: "0-0",
    child: [
      {
        name: "张晨成",
        key: "0-0-0",
        child: [
          { name: "leaf", key: "0-0-0-0" },
          { name: "leaf", key: "0-0-0-1" },
        ],
      },
      {
        name: "parent 1-1",
        key: "0-0-1",
        child: [{ key: "0-0-1-0", name: "zcvc" }],
      },
    ],
  },
]);

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
</script>

<style lang="scss" scoped>
.container {
  color: #fff;
  background: rgba(4, 23, 48, 1);
  min-height: 100vh;
}
.el-menu-vertical-demo {
  background: #092141;
  min-height: calc(100vh - 60px);
}
.inner {
  min-height: calc(100vh - 60px);
  padding: 16px;
}
.page-title {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  line-height: 28px;
}
.inner-left {
  padding-right: 20px;
  height: 100%;
  border-right: 1px solid #343434;
}
.table-container {
  margin-top: 8px;
}
.header {
  padding: 0 28px;
  align-items: center;
  height: 60px;
  background: #092141;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.3);
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.search-input {
  width: 160px;
  background: transparent;
  color: #fff;
}
.avatar-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-right: 24px;
  > span:last-child {
    padding-left: 6px;
  }
  .avatar-img {
    padding-top: 7px;
  }
}

.sub-title {
  padding-top: 33px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 22px;
}

.stats {
  .compresive {
    margin-top: 56px;
    margin-bottom: 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .stat-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50px;
      }
      > div {
        margin-left: 18px;
        color: #fff;
        > p:first-child {
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
          line-height: 24px;
        }
        > p:last-child {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          line-height: 14px;
        }
      }
    }
  }
}

.line-charts {
  width: 100%;
  height: 251px;
}
</style>

<style>
.el-tabs__nav-wrap:after {
  display: none;
}
.el-tabs__item {
  color: #fff;
}
.el-menu-item:hover {
  background: #245bd3;
}
.el-breadcrumb__inner {
  color: rgba(255, 255, 255, 0.7);
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}

.ant-tree {
  background: transparent;
}
.ant-tree .ant-tree-node-content-wrapper {
  color: #fff;
}
.ant-tree-switcher .ant-tree-switcher-icon.anticon {
  color: #fff;
}
.ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background-color: #245bd3;
}

.ant-table {
  background: transparent;
  color: #fff;
}
.ant-table-thead > tr > th {
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}
.ant-table-tbody > tr.ant-table-row-selected:hover > td {
  background: transparent;
}
.ant-table-tbody > tr.ant-table-row-selected > td {
  background: transparent;
  border-color: #fff;
}
.ant-table-tbody > tr.ant-table-row:hover > td,
.ant-table-tbody > tr > td.ant-table-cell-row-hover {
  background: transparent;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.el-menu {
  border-right: 0;
}
.el-tabs__nav {
  float: right;
}
.el-tabs__nav-scroll {
  transform: translateY(7px);
}
</style>
