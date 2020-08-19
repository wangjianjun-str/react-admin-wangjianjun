// http://localhost:5000/admin/edu/course
import request from "@utils/request";

const BASE_URL = "/admin/edu/course";
export function reqGetAllCourse(){
  return request({
    url:`${BASE_URL}`,
    method:"get"
  })
}