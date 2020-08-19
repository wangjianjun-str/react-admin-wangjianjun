import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT,
  DELETE_SUBJECT,
} from "./constants";

const initUserList = {
  total: 0, // 总数
  items: [], // 详细subject数据
};

export default function subjectList(prevState = initUserList, action) {
  switch (action.type) {
   
    case GET_SUBJECT_LIST:

      action.data.items.forEach(item=>{
        return item.children = []
      })
      return action.data;
    case GET_SEC_SUBJECT_LIST:
      const FisList = prevState.items
      const SecList = action.data.items

      SecList.length && FisList.forEach(item=>{
        if(SecList[0].parentId === item._id){
          item.children= SecList
        }
      })
      return {
        ...prevState,
        items:FisList
      }
    case UPDATE_SUBJECT:
      console.log(22222)
      prevState.items.forEach(item=>{
        // 遍历一级列表，修改title属性
        if(item._id === action.data.id){
          item.title = action.data.title
          return
        }
        // 遍历二级级列表，修改title属性
        item.children.forEach(Secitem=>{
          if(Secitem._id === action.data.id){
            Secitem.title = action.data.title
            return 
            }
          })
      })

      return {
        ...prevState
      }
    
    // 删除课程分类
    case DELETE_SUBJECT:
      const FirstList = [...prevState.items]
      FirstList.forEach((item,index)=>{
        if(item._id === action.data){
          FirstList.splice(index,1)
          return
        }
        item.children.forEach((SecItem,index)=>{
          if(SecItem._id === action.data){
            item.children.splice(index,1)
            return
          }
        })
      })
      return {
        ...prevState,
        items:FirstList
      }
    default:
      return prevState;
  }
}
