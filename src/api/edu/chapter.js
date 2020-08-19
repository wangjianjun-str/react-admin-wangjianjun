// http://localhost:5000/admin/edu/chapter/:page/:limit  get
import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";
export function reqGetChapterList(courseId){
  return request({
    url:`${BASE_URL}/1/5`,
    method:"get",
    params:{
      courseId,
    }
  })
}