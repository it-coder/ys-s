import request from "@/utils/request";
// 健康资源信息
export async function healthsInfo(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/health/resource",
    params,
    method: "get",
  });
}
// 疫苗接种统计
export async function vaccination(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/health/vaccination",
    params,
    method: "get",
  });
}
//水电数据统计
export async function hydroelectric(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/health/hydroelectric",
    params,
    method: "get",
  });
}

//门磁数据统计
export async function door(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/health/door",
    params,
    method: "get",
  });
}

//疾病数据统计
export async function records(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/health/records",
    params,
    method: "get",
  });
}

//健身机构使用情况
export async function site(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/health/institutionsAnalysis",
    params,
    method: "get",
  });
}
//健身监测数据
// export async function gymAnalysis(params) {
//   return request({
//     url: "/cdm-api/traffic/screen/api/health/gymAnalysis?pageNum=1&pageSize=4",
//     params,
//     method: "get",
//   });
// }

//健身机构使用情况
export async function gymAnalysis(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/health/gymAnalysis",
    params,
    method: "get",
  });
}
