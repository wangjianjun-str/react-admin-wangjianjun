// 引入常量
import {GET_ALL_COURSE,GET_CHAPTERLIST,GET_LESSONLIST} from "./constants"
// 定义获取所有课程的reducer
const  initChapterList = {
  allCourseList:[],
  chapterList:[],
}
export function chapterList(prevState=initChapterList,action){
  switch(action.type){
    case GET_ALL_COURSE:
      return {
        ...prevState,
        allCourseList:action.data
      }
    case GET_CHAPTERLIST:
      action.data.res.items.forEach(item=>item.children = [])
      return {
        ...prevState,
        chapterList:action.data.res.items
      }
    case GET_LESSONLIST:
      // 将获取到的课时数据根据章节id存到对应章节的children中   chapterList数组中每一个元素独有一个children属性的数组
      const newItems = [...prevState.chapterList]
      newItems.forEach(item=>{
        if(item._id === action.data.chapterId ){
          item.children = action.data.res
        }
      })
      return {
        ...prevState,
        chapterList:newItems
      }
    default :
      return prevState
  }
}