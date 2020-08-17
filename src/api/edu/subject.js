import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

const Moke_URL = "http://localhost:8080/admin/edu/subject"
// 获取分类
export function reqGetSubject(page,limit) {
  return request({
    url: `${Moke_URL}/${page}/${limit}`,
    method: "GET",
  });
}
