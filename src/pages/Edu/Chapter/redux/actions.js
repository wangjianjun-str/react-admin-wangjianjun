import {reqGetAllCourse} from "@api/edu/course"
import {reqGetChapterList} from "@api/edu/chapter"
import {reqGetLessonList} from "@api/edu/lesson"
import {GET_ALL_COURSE,GET_CHAPTERLIST,GET_LESSONLIST} from "./constants"

function getLessonListSync(data){
  return {
    type: GET_LESSONLIST,
    data
  }
}
export function getLessonList(chapterId){ 
  return dispatch=>{
    reqGetLessonList(chapterId).then((res)=>{
      dispatch(getLessonListSync({res,chapterId}))
    })
  }
}




function getChapterListSync(data){
  return {
    type: GET_CHAPTERLIST,
    data
  }
}
export function getChapterList(courseId){
  return dispatch=>{
    reqGetChapterList(courseId).then((res)=>{
      dispatch(getChapterListSync(res))
    })
  }
}



function getCourseListSync(data){
  return {
    type: GET_ALL_COURSE,
    data
  }
}
export function getCourseList(){
  return dispatch=>{
    reqGetAllCourse().then((res)=>{
      dispatch(getCourseListSync(res))
    })
  }
}