import {
  reqSubjectList,
  reqSecSubjectList,
  reqUpdateSubjectList,
  delSubjectList,
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT,
  DELETE_SUBJECT,
} from "./constants";


// 删除课程分类
const delSubjectListSync = (data) => ({
  type: DELETE_SUBJECT,
  data,
});

export const deleteSubjectList = (id) => {
  return (dispatch) => {
    return delSubjectList(id).then((response) => {
      dispatch(delSubjectListSync(id));
      return response.total;
    });
  };
};





// 更新课程分类数据
const updateSubjectListSync = (data) => ({
  type: UPDATE_SUBJECT,
  data,
});

export const updateSubjectList = (id,title) => {
  return (dispatch) => {
    return reqUpdateSubjectList(id,title).then((response) => {
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
      console.log(response)
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
