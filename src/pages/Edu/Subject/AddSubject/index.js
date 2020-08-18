import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {reqSubjectList,reqAddSubjectList} from "@api/edu/subject"
import { Card,Form,Input,Select,Option,Button, Divider, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

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
export default class AddSubject extends Component {
  page=1
  state={
    total:0,
    items:[]
  }
 async componentDidMount(){
   const res = await reqSubjectList(this.page++,5)
   console.log(res)
    this.setState(res)
  }
  handleGetAddSubject=async()=>{
    const res = await reqSubjectList(this.page++,5)
   const newItems = [...this.state.items,...res.items]
   this.setState({
     items:newItems
   })
  }
  //提交表单且数据验证成功后回调事件
  onFinish=async (values)=>{
    // console.log(values)
    await reqAddSubjectList(values.subjectname,values.parentid)
    message.success("保存成功")
    this.props.history.push("/edu/subject/list")
  }
  render() {
    console.log(this.state)
    return (<Card title={
      <>
        <Link to="/edu/subject/list">
          <ArrowLeftOutlined />
        </Link>
        <span style={{marginLeft:20}}>新增课程</span>
      </>
    }>
       <Form
        {...layout}
        name='subject'
        onFinish={this.onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='课程分类名称'
          name='subjectname'
          rules={[
            {
              required: true,
              message: '请输入课程分类!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='父级分类id'
          name='parentid'
          rules={[
            {
              required: true,
              message: '请选择分类id'
            }
          ]}
        >
          <Select dropdownRender={menu=>
              <div>
                {menu}
                <Divider></Divider>
                {this.state.total > this.state.items.length? <Button type="link" onClick={this.handleGetAddSubject}>请求更多数据</Button> : <span style={{color:"red",marginLeft:20}}>没有更多数据了</span>}
              </div>
          }>
              <Select.Option  value={1} key={0}>
                {'一级菜单'}
              </Select.Option>
        {this.state.items.map(item=>(<Select.Option value={item._id} key={item._id}>{item.title}</Select.Option>))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
      
    )
  }
}

