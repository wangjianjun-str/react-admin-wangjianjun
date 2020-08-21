// 引入获取课程列表的api
import {reqGetAllCourseList} from "@api/edu/course"
// 获取章节分页列表
import {reqGetChapterList} from "@api/edu/chapter"
// 获取章节所有课时列表
import {reqGetLessonList} from "@api/edu/lesson"
// 引入常量
import {GET_ALL_COURSE,GET_CHAPTERLIST,GET_LESSONLIST} from "./constants"


// 获取章节所有课时列表同步action
function getAllLessonListSync(data){
  return {
    type:GET_LESSONLIST,
    data
  }
}
// 获取章节所有课时列表异步action
export function getAllLessonList(chapterId){
  return dispatch=>{
    return reqGetLessonList(chapterId).then(res=>{
      dispatch(getAllLessonListSync({res,chapterId}))
    })
  }
}





// 获取章节分页列表的同步action
function getChapterListSync(data){
  return {
    type:GET_CHAPTERLIST,
    data
  }
}

// 获取章节分页列表action
export function getChapterList(courseId){
  return dispatch=>{
    return reqGetChapterList(courseId).then(res=>{
       dispatch(getChapterListSync({res,courseId}))
    })
  }
}


// 定义同步action
function getAllCourseListSync(data){
  return {
    type:GET_ALL_COURSE,
    data
  }
}
// 获取课程列表action
export function getAllCourseList(){
  return dispatch=>{
    return reqGetAllCourseList().then(res=>{
      dispatch(getAllCourseListSync(res))
    })
  }
}