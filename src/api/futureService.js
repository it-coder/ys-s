import request from "@/utils/request";


//商业服务分类统计
export async function commerceServiceStatistics(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/service/commerceServiceStatistics",
    params,
    method: "get",
  });
}


//社区服务类型分布
export async function queryCommunityServiceDistribution(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/service/queryCommunityServiceDistribution",
    params,
    method: "get",
  });
}

//社区商家统计分析
export async function merchantStatistics(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/service/merchantStatistics",
    params,
    method: "get",
  });
}

//物业服务工单统计
export async function serviceOrderStatistics(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/service/serviceOrderStatistics",
    params,
    method: "get",
  });
}

//物业服务工单统计
export async function queryServiceOrders(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/service/queryServiceOrders",
    params,
    method: "get",
  });
}

//商业服务订单统计
export async function commerceServiceOrderStatistics(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/service/commerceServiceOrderStatistics",
    params,
    method: "get",
  });
}

//老年菜品销量
export async function querySalesVolumeOfCanteenDishes(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/oldAndChildCare/querySalesVolumeOfCanteenDishes",
    params,
    method: "get",
  });
}

//养老关怀服务-日间养老
export async function queryDayCare(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/oldAndChildCare/queryDayCare",
    params,
    method: "get",
  });
}

//人口年龄分布
export async function queryAgeDistribution(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/oldAndChildCare/queryAgeDistribution",
    params,
    method: "get",
  });
}

//养老关怀服务-照护服务
export async function careService(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/oldAndChildCare/careService",
    params,
    method: "get",
  });
}

//聚焦一老一小
export async function queryInformationForElderlyCare(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/oldAndChildCare/queryInformationForElderlyCare",
    params,
    method: "get",
  });
}

//托育机构
export async function queryNurseryInstitution(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/oldAndChildCare/queryNurseryInstitution",
    params,
    method: "get",
  });
}



//人口年龄分布详情
export async function queryPersonList(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/oldAndChildCare/queryPersonList",
    params,
    method: "get",
  });
}

//实时监控视频
export async function querySurveillanceVideos(type,currentPage,pageSize) {
  return request({
    url: `/cdm-api/traffic/screen/api/oldAndChildCare/querySurveillanceVideos?sceneType=${type}&currentPage=${currentPage}&pageSize=${pageSize}`,
    method: "get",
  });
}