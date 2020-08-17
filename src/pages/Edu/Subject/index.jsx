import React, { Component } from "react";
import {connect} from "react-redux"
import {getSubjectList,getSecSubjectList} from "./redux"
import {Button,Table} from "antd"
import { PlusOutlined,FormOutlined,DeleteOutlined } from '@ant-design/icons'
import "./index.less"

const columns = [
  { title: '分类课程', dataIndex: 'title', key: 'name' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    width:200,
    render: () => <>
      <Button icon={<FormOutlined />} type="primary" style={{marginRight:20,width:50}}></Button>
      <Button icon={<DeleteOutlined />} type="danger" style={{width:50}}></Button>
    </>,
  },
];



@connect(state=>({subjectList:state.subjectList}),{getSubjectList,getSecSubjectList})
 class Subject extends Component {

   page = 1
  componentDidMount(){
    this.props.getSubjectList(1,5)
  }
  handle=(page,pageSize)=>{
    this.props.getSubjectList(page,pageSize)
   }
  handleShowSizeChange=(page,pageSize)=>{ //page :当前页 pageSize:每页的条目数
    this.page = page 
    this.props.getSubjectList(page,pageSize)
   }
   handleShowExpand=(expanded, record)=>{
      if(expanded){
       this.props.getSecSubjectList(record._id)
      }
   }
  render() {
    return <div className="subject">
       <Button type="primary" icon={<PlusOutlined />} className="subject-btn">
          新建
      </Button>
      <Table
    columns={columns}
    expandable={{
      // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      // rowExpandable: record => record.name !== 'Not Expandable',
      onExpand:this.handleShowExpand
    }}
    dataSource={this.props.subjectList.items}
    rowKey="_id"
    pagination={{
      total:this.props.subjectList.total,
      defaultPageSize:5,
      showSizeChanger:true,
      pageSizeOptions:['5','8','10'],
      showQuickJumper:true,
      onChange:this.handle,
      onShowSizeChange:this.handleShowSizeChange,
      current:this.page
    }}
  />,
    </div>;
  }
}
export default Subject