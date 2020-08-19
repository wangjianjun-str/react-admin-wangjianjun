import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";
// 删除课程分类数据
// http://localhost:5000/admin/edu/subject/remove/:id  DELETE
export function delSubjectList(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}

// const Moke_URL = "http://localhost:8080/admin/edu/subject"
// 获取一级课程分类列表
// /admin/edu/subject/:page/:limit
export function reqSubjectList(page,limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
// 获取二级课程分类列表
// http://localhost:5000/admin/edu/subject/get/:parentId
export function reqSecSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}
// http://localhost:5000/admin/edu/subject/save
// 添加课程分类
export function reqAddSubjectList(title,parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data:{
      title,
      parentId,
    }
  });
}

// 更新课程分类
// http://localhost:5000/admin/edu/subject/update
export function reqUpdateSubjectList(id,title) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data:{
      id,
      title,
    }
  });
}