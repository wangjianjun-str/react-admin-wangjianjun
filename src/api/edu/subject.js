import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const Moke_URL = "http://localhost:8080/admin/edu/subject"
// 获取一级课程分类
export function reqGetSubject(page,limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

// admin/edu/subject/get/:parentId
// 获取二级课程分类
export function reqGetSecSubject(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}
