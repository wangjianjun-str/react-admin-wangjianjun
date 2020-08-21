// http://localhost:5000/admin/edu/course  get
// 获取所有课程列表
import request from "@utils/request"
const BASE_URL = "/admin/edu/course"
export function reqGetAllCourseList(){
  return request({
    url:`${BASE_URL}`,
    method:"get"
  })
}

