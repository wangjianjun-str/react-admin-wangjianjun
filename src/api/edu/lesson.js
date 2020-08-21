// http://localhost:5000/admin/edu/lesson/get/:chapterId  get chapterId	 章节id

// 获取章节所有课时列表
import request from "@utils/request"
const BASE_URL = "/admin/edu/lesson"
export function reqGetLessonList(chapterId){
  return request({
    url:`${BASE_URL}/get/${chapterId}`,
    method:"get",
  })
}
// 获取七牛云上传凭据
// http://localhost:5000/uploadtoken  GET

export function reqUploadToken(){
  return request({
    url:`/uploadtoken`,
    method:"GET"
  })
}

// 新增课时
// http://localhost:5000/admin/edu/lesson/save   POST

export function addLesson({chapterId,title,free,video}){
  request({
    url:`${BASE_URL}/save`,
    method:"post",
    data:{
      chapterId,title,free,video
    }
  })
}