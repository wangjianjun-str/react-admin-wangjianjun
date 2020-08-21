import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Card,Form,Input,Button, message,Switch,Upload} from 'antd'
import {ArrowLeftOutlined,UploadOutlined} from '@ant-design/icons'
import MyUpload from '@comps/MyUpload'
import {addLesson} from "@api/edu/lesson"
//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}
export default class AddLesson extends Component {
  // 表单提交成功且验证成功后的回调 
  onFinish=async(values)=>{

    const file = values.file
    const title = values.title
    const free = values.free
    console.log(this.props.location)
  //  { hash: ""
  //   key: "qj0ul5"
  //   pathname: "/edu/chapter/addlesson"
  //   search: ""
  //   state:{children: []
          // title: "第三章节"
          // _id: "5ee2cf0dd9dce01d50447cb8"}
  //   children: []
  //   title: "第三章节"
  //   _id: "5ee2cf0dd9dce01d50447cb8"}
    const {state:{_id:chapterId}} = this.props.location
    // const chapterId = this.props.location.state._id
   await addLesson({file,title,free,chapterId})
   message.success("课时添加成功")
   this.props.history.push("/edu/chapter/list")
  }
  render() {
    return (<Card title={
      <>
        <Link to="/edu/chapter/list">
          <ArrowLeftOutlined />
        </Link>
        <span style={{marginLeft:20}}>新增课时</span>
      </>
    }>
       <Form
        {...layout}
        name='lesson'
        onFinish={this.onFinish}
        initialValues={{"free":true}}
      >
        <Form.Item
          label='课时名称'
          name='title'
          rules={[
            {
              required: true,
              message: '请输入课时分类!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='是否免费'
          name='free'
          rules={[
            {
              required: true,
              message: '请选择是否'
            }
          ]}
          // from表单默认控制表单项的value属性 但是Switch组件控制的是checked属性 
          valuePropName="checked" //子节点子的属性设置
        >
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
        </Form.Item>
        <Form.Item  
          label='上传视频'
          name='video'
          rules={[
            {
              required: true,
              message: '请上传视频'
            }
          ]}>
          <MyUpload></MyUpload>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' onClick = {this.handleAddLesson}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
      
    )
  }
}

