import request from "@/utils/request";
//能源消耗数据统计 
export async function staHydropowerMonth(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/carbon/staHydropower/month",
    params,
    method: "get",
  });
}
//能源消耗排行 
export async function staHydropowerTop(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/carbon/staHydropower/top",
    params,
    method: "get",
  });
}
// 垃圾桶满溢
export async function carbonAlarm(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/carbon/iot/alarm",
    params,
    method: "get",
  });
}
//空气质量监测 
export async function monitor(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/carbon/env/monitor",
    params,
    method: "get",
  });
}
//温度趋势图 
export async function envMonitor(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/carbon/sta/env/monitor",
    params,
    method: "get",
  });
}
//湿度趋势图 
export async function humidityMonitor(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/carbon/humidity/monitor",
    params,
    method: "get",
  });
}