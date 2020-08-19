import {GET_ALL_COURSE,GET_CHAPTERLIST,GET_LESSONLIST} from "./constants"
const initChapter = {
  allCourseList:[],
  chapterList:[]
}
export default function chapterList(prevState=initChapter,action){
  switch(action.type){
    case GET_ALL_COURSE:
      return {
        ...prevState,
        allCourseList:action.data
      }
    case GET_CHAPTERLIST:
      // 给章节中添加children属性 让页面可以展开
      action.data.items.forEach(item=>item.children = [])
      return {
        ...prevState,
        chapterList:action.data.items
      }
    case GET_LESSONLIST:
      // 将拿到的lesson数据存到章节的children里边 
      // action.data.res 拿到的就是一个数组 里边存的lesson数据
      // action.data.chapterId 拿到的就是对应章节的id
      const newItems = [...prevState.chapterList]
      newItems.forEach(item=>{
        if(action.data.chapterId === item._id){
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
  