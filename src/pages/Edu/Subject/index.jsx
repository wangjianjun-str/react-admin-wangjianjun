import React, { Component } from "react";
import {connect} from "react-redux"
import {getSubjectList,getSecSubjectList,updateSubjectList} from "./redux/index"
import {Button,Table,Input, message} from "antd"
import { PlusOutlined,FormOutlined,DeleteOutlined } from '@ant-design/icons'
// import {updataSubjectList} from "@api/edu/subject"
import "./index.less"



@connect(state=>({subjectList:state.subjectList}),{getSubjectList,getSecSubjectList,updateSubjectList})
 class Subject extends Component {
   state={
     subjectid:'',
     title:"",
   }
  page = 1
   componentDidMount(){
     this.props.getSubjectList(1,5)
   }
   handle=(page,pageSize)=>{
    this.page = page
    this.props.getSubjectList(page,pageSize)
   }
   handleShowSizeChange=(page,pageSize)=>{
    this.props.getSubjectList(page,pageSize)
   }
   handleExpanded=(expanded, record)=>{

     if(expanded){
      //  一级课程的Id就是二级课程的parentId
     this.props.getSecSubjectList(record._id)
     }
   }
  //  跳转到二级课程分类
   handleToAdd=()=>{
    this.props.history.push("/edu/subject/add")
   }
   handleUpdate=({_id,title})=>()=>{
     this.setState({
       subjectid:_id,
       title:title,
     })
     this.title = title
   }
   handleChange=(e)=>{
      this.setState({
        title:e.target.value
      })
   }
  //点击确认按钮事件处理函数
   subjectUpdateConfirm=(id,title)=>async()=>{
    //  await updataSubjectList(id,title)

    if(!title.trim()){
      message.error("请输入正确的格式")
      return 
    }
    if(title=== this.title){
      message.error("请不要输入相同的值")
      return
    }
    await this.props.updateSubjectList(id,title)
     message.success("修改成功")
    //  this.props.getSubjectList(this.page,5)
     this.setState({
       subjectid:"",
       title:'',
     })
   }
  // 点击取消按钮事件处理函数
  cancleUpdate=()=>{
    this.setState({
      subjectid:"",
      title:"",
    })
  }
  render() {
    const columns = [
      { title: '分类课程',  key: 'name' ,
       render:(record)=>{
         if(record._id === this.state.subjectid){
            return(<>
              <Input style={{width:300}} value={this.state.title} onChange={this.handleChange}></Input>
            </>)
         }
         return record.title
       }
    },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        width:200,
        render: (record) => {
          if(record._id === this.state.subjectid){
            return(<>
              <Button type="primary" style={{marginRight:10}} onClick={this.subjectUpdateConfirm(this.state.subjectid,this.state.title)}>确认</Button>
             <Button type="danger" onClick={this.cancleUpdate}>取消</Button>
             </>
            )
          }
          return(
          <>
            <Button icon={<FormOutlined />} type="primary" style={{marginRight:20,width:50}} onClick={this.handleUpdate(record)}></Button>
            <Button icon={<DeleteOutlined />} type="danger" style={{width:50}}></Button>
          </>)
        }

        
      },
    ];

    return <div className="subject">
       <Button type="primary" icon={<PlusOutlined />} className="subject-btn" onClick={this.handleToAdd}>
          新建
      </Button>
      <Table
    columns={columns}
    expandable={{
      // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      // rowExpandable: record => record.name !== 'Not Expandable',
      onExpand: this.handleExpanded
    }}
    dataSource={this.props.subjectList.items}
    rowKey="_id"
    pagination={{
      total:this.props.subjectList.total,
      defaultPageSize:5,
      showSizeChanger:true,
      pageSizeOptions:["5","7","9"],
      showQuickJumper:true,
      current:this.page,
      onChange:this.handle,
      onShowSizeChange:this.handleShowSizeChange,
    }}
  />,
    </div>;
  }
}
export default Subject