import {
  GET_SUBJECT_LIST,GET_SEC_SUBJECT_LIST
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细subject数据
};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item=>{return item.children=[]})
      return action.data;
    case GET_SEC_SUBJECT_LIST:
      // console.log(action.data)
     const SecList = action.data.items
    //  console.log(SecList)
     const FisList = prevState.items
     SecList.length && FisList.forEach(item=>{
      if(SecList[0].parentId === item._id){
        item.children = SecList
      }
     })
      return {
        ...prevState,
        items:FisList
      }
    default:
      return prevState;
  }
}
