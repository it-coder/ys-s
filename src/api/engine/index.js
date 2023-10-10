import request from "@/utils/request";

export async function queryEngineInfo() {
  return request({
    url: "http://20.21.1.112:3032/api/open/client/default_player",
    method: "post",
  });
}

export async function queryPoints(params) {
  return request({
    url: "/cdm-api/traffic/screen/api/traffic/dotLocation",
    method: "get",
    params,
  });
}

export async function queryVideo(id = "1637718855423954946") {
  return request({
    url: "cdm-api/traffic/equip/getCameraUrl?id=" + id,
    method: "get",
  });
}
