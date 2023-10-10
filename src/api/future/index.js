import request from "@/utils/request";

export async function pointStatistics(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/community/neighborhood/integralStatistics",
    params,
    method: "get",
  });
}

export async function queryBooksRank(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/educational/booking/entities/tops",
    params,
    method: "get",
  });
}

export async function queryClassManagementData(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/educational/course/management",
    params,
    method: "get",
  });
}

export async function queryEducationActivity(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/educational/activiti",
    params,
    method: "get",
  });
}

export async function queryEducationInfo(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/educational/resource",
    params,
    method: "get",
  });
}

export async function queryBookStores(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/educational/bookstores/numbers",
    params,
    method: "get",
  });
}

export async function queryBusActivity(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/entrepereneur/ship/maker/activities",
    params,
    method: "get",
  });
}

export async function queryBusCompanyRank(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/entrepereneur/ship/entrepereneur/top",
    params,
    method: "get",
  });
}

export async function queryBusMemberInfo(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/entrepereneur/ship/employment/information",
    params,
    method: "get",
  });
}

export async function queryBusFlow(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/entrepereneur/ship/personnel/access",
    params,
    method: "get",
  });
}

export async function queryBusPolicyInfo(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/entrepereneur/ship/policy/count/info",
    params,
    method: "get",
  });
}

export async function queryBusPolicyHotKeys(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/entrepereneur/ship/policy/count",
    params,
    method: "get",
  });
}

export async function queryBusSpaceInfo(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/entrepereneur/ship/space/access",
    params,
    method: "get",
  });
}

export async function queryArcDeviceManagement(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/architectural/device/manager",
    params,
    method: "get",
  });
}

export async function queryArcDeviceStatus(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/architectural/device/run/status",
    params,
    method: "get",
  });
}

export async function queryArcEvent(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/architectural/event/aram",
    params,
    method: "get",
  });
}

export async function queryArcHouse(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/architectural/house/manager",
    params,
    method: "get",
  });
}
//教育监控视频
export async function classroomMonitoring(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/educational/classroomMonitoring",
    params,
    method: "get",
  });
}
//建筑监控视频
export async function securityMonitoring(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/architectural/device/securityMonitoring",

    params,
    method: "get",
  });
}
//邻里积分商城
export async function pointsMall(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/neighborhood/pointsMall",
    params,
    method: "get",
  });
}
//电子照片墙
export async function photoWall(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/neighborhood/photoWall",
    params,
    method: "get",
  });
}
//物品共享
export async function goodsSharingOrder(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/neighborhood/goodsSharingOrder",
    params,
    method: "get",
  });
}
//邻里活动类型分布
export async function activityAnalysis(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/neighborhood/activityAnalysis",
    params,
    method: "get",
  });
}
//热门社团
export async function hotCircle(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/neighborhood/hotCircle",
    params,
    method: "get",
  });
}
//场地预约排名
export async function siteAppointmentRanking(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/neighborhood/siteAppointmentRanking",
    params,
    method: "get",
  });
}
//数据统计
export async function dataStatistics(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/neighborhood/dataStatistics",
    params,
    method: "get",
  });
}