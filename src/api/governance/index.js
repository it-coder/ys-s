import request from "@/utils/request";
// 停车场概况
export async function populationTypeStatistics(data) {
  return request({
    url: "/cdm-api/traffic/screen/api/community/government/populationTypeStatistics",
    data,
    method: "post",
  });
}

//设备管理
export async function divice(data) {
  return request({
    url: "/cdm-api/traffic/screen/api/government/divice",
    data,
    method: "post",
  });
}

//居民自治
export async function resident(data) {
  return request({
    url: "/cdm-api/traffic/screen/api/government/resident",
    data,
    method: "post",
  });
}

//预警事件管理
export async function earlyWarningEvent(data) {
  return request({
    url: "/cdm-api/traffic/screen/api/government/earlyWarningEvent",
    data,
    method: "post",
  });
}

//人群类型
export async function populationType(data) {
  return request({
    url: "/cdm-api/traffic/screen/api/government/populationType",
    data,
    method: "post",
  });
}

//红色党建
export async function securityMonitoring(data) {
  return request({
    url: "/cdm-api/traffic/screen/api/government/securityMonitoring",
    data,
    method: "post",
  });
}

  //民意调研
export async function entrepreneurshipPolicyInfo(data) {
  return request({
    url: "/cdm-api/traffic/screen/api/government/entrepreneurshipPolicyInfo",
    data,
    method: "post",
  });
}