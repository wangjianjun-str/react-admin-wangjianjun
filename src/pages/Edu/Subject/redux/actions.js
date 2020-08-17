import {
  reqGetSubject,reqGetSecSubject
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,GET_SEC_SUBJECT_LIST
} from "./constants";
/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});
// 获取一级课程列表
export const getSubjectList = (page,limit) => {
  return (dispatch) => {
    return reqGetSubject(page,limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.total;
    });
  };
};


// /admin/edu/subject/get/:parentId

const getSecSubjectListSync = (list) => ({
  type: GET_SEC_SUBJECT_LIST,
  data: list,
});
// 获取二级分类列表
export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response.total;
    });
  };
};


