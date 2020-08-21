import React, { Component } from "react";
import {connect} from 'react-redux'
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import {getAllLessonList} from "./redux"
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SearchForm from "./SearchForm";
import "./index.less";
dayjs.extend(relativeTime);

@connect( state=>({chapterList:state.chapterList.chapterList}),
{getAllLessonList}
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
  };

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  // 点击展开按钮获取lesson数据
  getLessonList=(expanded,record)=>{
    // console.log(expanded,record) 
    if(expanded){
      this.props.getAllLessonList(record._id)
    }
  }

  // 跳转到新增课时
  handleGoAddLesson=(data)=>()=>{
    this.props.history.push("/edu/chapter/addlesson",data)
  }
  render() {
    const {chapterList:{items}} = this.props
    const { previewVisible, previewImage, selectedRowKeys } = this.state;
    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        // 注意：如果不写dataIndex的时候，render指向的函数接收的数据，肯定是一行数据，但是如果dataIndx写值了，那么render指向的函数接收的数据就是一行数据中的指定了某一个属性的值
        // 比如 上面的dataIndex的值是free 那个render指向函数接收的数据就是一行数据中free属性的值
        render: (isFree) => {
          // 如果是章节数据 isFree是undefined
          // 如果是课时数据 isFree 返回的是布尔值
          // return isFree === true ? "是" : isFree === false ? "否" : "";
          if(isFree === true){
            return (<><span>是</span></>)
          }else{
            if(isFree === false){
              return (<><span>否</span></>)
            }else{
              return (<></>)
            }
          }
          // 显示是否免费的逻辑 当渲染的是章节数据是，章节数据里边没有isFree属性，所以render指向函数接收到的参数是undefined  isFree为undefined  判断isFree为假 为假则走第二次判断 课时数据的isFree 的真假 如果为假 则显示空字符串，所以章节数据一开始不会显示是否选项
          // 当渲染的是课时数据时，课时数据中是有isFree属性的先判断isFree的真假，如果为 true则显示是，如果为false 则走第二次判断，isFree的值为false判等时为真则显示‘否’
        },
      },
      {
        title: "视屏",
        // dataIndex: "",
        render:record =>{
          if(record.free){
            return <Button>视频</Button>
          }
          return null
        }
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
            return (
              <div>
                <Tooltip title="新增课时">
                  <Button type="primary" onClick={this.handleGoAddLesson(data)}>
                    <PlusOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="更新章节">
                  <Button type="primary" style={{ margin: "0 10px" }}>
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="删除章节">
                  <Button type="danger">
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </div>
            );
        },
      },
    ];
//#region 
    // const data = [
    //   {
    //     id: "111",
    //     title: "第一章节",
    //     children: [
    //       {
    //         id: "1",
    //         title: "第一课时",
    //         free: false,
    //         videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
    //       },
    //       {
    //         id: "2",
    //         title: "第二课时",
    //         free: true,
    //         videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
    //       },
    //       {
    //         id: "3",
    //         title: "第三课时",
    //         free: true,
    //         videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
    //       },
    //     ],
    //   },
    //   {
    //     id: "222",
    //     title: "第二章节",
    //     children: [
    //       {
    //         id: "4",
    //         title: "第一课时",
    //         free: false,
    //         videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
    //       },
    //       {
    //         id: "5",
    //         title: "第二课时",
    //         free: true,
    //         videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
    //       },
    //       {
    //         id: "6",
    //         title: "第三课时",
    //         free: true,
    //         videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
    //       },
    //     ],
    //   },
    //   {
    //     id: "333",
    //     title: "第三章节",
    //     children: [
    //       {
    //         id: "1192252824606289921",
    //         title: "第一课时",
    //         free: false,
    //         videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
    //       },
    //       {
    //         id: "1192628092797730818",
    //         title: "第二课时",
    //         free: true,
    //         videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
    //       },
    //       {
    //         id: "1192632495013380097",
    //         title: "第三课时",
    //         free: true,
    //         videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
    //       },
    //     ],
    //   },
    // ];
//#endregion
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList}
            rowKey="_id"
            expandable={{
              onExpand:this.getLessonList
             }
            }
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Chapter;
