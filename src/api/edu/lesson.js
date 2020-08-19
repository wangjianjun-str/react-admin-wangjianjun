// 获取章节所有课时列表
// http://localhost:5000/admin/edu/lesson/get/:chapterId  get
import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";
export function reqGetLessonList(chapterId){
  return request({
    url:`${BASE_URL}/get/${chapterId}`,
    method:"get",
  })
}
