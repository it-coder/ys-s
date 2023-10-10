import request from "@/utils/request";
// 停车场概况
export async function trafficPark(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/traffic/parking",
    params,
    method: "get",
  });
}
//车辆通行趋势统计
export async function brakeRuning(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/traffic/vehicleAccessStatistics",
    params,
    method: "get",
  });
}
//共享停车统计
export async function spaceSharing(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/traffic/sharedParkingStatistics",
    params,
    method: "get",
  });
}


//车辆出入情况
export async function bizBrake(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/traffic/vehicleAccess",
    params,
    method: "get",
  });
}



//人员通行情况
export async function bizAccess(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/traffic/biz/access",
    params,
    method: "get",
  });
}

//车辆类型占比统计
export async function carType(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/traffic/carTypeProportion",
    params,
    method: "get",
  });
}