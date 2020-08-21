// 函数组件引入useEffect函数模拟函数组件的生命周期
import React, {useEffect} from "react";
import { Form, Select, Button } from "antd";
// 使用connect修饰器
import {connect} from "react-redux"
// 引入action 
import {getAllCourseList,getChapterList} from "../redux"
import "./index.less";


const { Option } = Select;



function SearchForm(props) {
  const page = 1
  const [form] = Form.useForm();
  const resetForm = () => {
    form.resetFields();
  };
  // 使用useEffect函数模拟类组件的生命周期, 在页面挂载完之后发请求拿到课程数据在searchFrom组件中展示
  useEffect(()=>{

    props.getAllCourseList()
  },[])
  // 提交表单且数据验证成功后回调事件  点击提交后拿到章节数据存到redux中
 const  onFinish=(values)=>{
  // console.log(values) //values 的值是选中的课程的id sourseId
  props.getChapterList(values.courseId)
 }
  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {props.cuorseList.map(item=>{return <Option value={item._id} key={item._id}>{item.title}</Option>})}
        
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(state=>({cuorseList:state.chapterList.allCourseList}),{getAllCourseList,getChapterList})(SearchForm);
