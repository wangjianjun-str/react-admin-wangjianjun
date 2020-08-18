import {
  reqSubjectList,
  reqSecSubjectList,
  updataSubjectList,
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT,
} from "./constants";

// 
const updateSubjectListSync = (data) => ({
  type: UPDATE_SUBJECT,
  data,
});

export const updateSubjectList = (id,title) => {
  return (dispatch) => {
    return updataSubjectList(id,title).then((response) => {
      dispatch(updateSubjectListSync({id,title}));
      return response.total;
    });
  };
};



/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page,limit) => {
  return (dispatch) => {
    return reqSubjectList(page,limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.total;
    });
  };
};


const getSecSubjectListSync = (list) => ({
  type: GET_SEC_SUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqSecSubjectList(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response.total;
    });
  };
};
