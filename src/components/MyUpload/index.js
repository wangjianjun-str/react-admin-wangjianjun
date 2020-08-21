import React, { Component } from 'react'
import * as qiniu from 'qiniu-js'
import {nanoid} from "nanoid"
import { Button,Upload, message} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {reqUploadToken} from "@api/edu/lesson"
import nProgress from 'nprogress'

export default class MyUpload extends Component {
  constructor(){
    super()
    // 先从本地缓存中获取uploadToken 
    //如果之前存储过,赋值给存储的那个token
    // 判断当前组件实例身上是否有tokenObject如果有则证明已经上传过了
    const jsonStr = localStorage.getItem("uploadToken")
    if(jsonStr){
      this.tokenObj = JSON.parse(jsonStr)
    }
    this.tokenObj = {}
  }

  // 文件上传之前的回调函数 接收两个参数 file(上传的文件数据) 和 fileList(上传的文件列表数据)
  handleBeforeUpload=(file,fileList)=>{
    // 1.判断上传的文件的大小，大于设置的值就返回一个失败的Promise阻止文件的上传
    // 2.向服务器发请求获取Uploadtoken
  
    // console.log(file)  //当前上传文件的数据 里面有size属性
    const MAX_SIZE = 5 * 1024 * 1024
    return new Promise(async(resolve,reject)=>{
      if(file.size > MAX_SIZE){
        return reject()
      }

     
    // 判断当前组件实例身上是否有TokenObj对象 如果有就直接return 没有就发请求获取
    
     if(this.tokenObj.expires && this.tokenObj.expires > Date.now()){
       return resolve()
     }
    //  将Token的失效时间设置为有效期的截止时间（发请求的当前时间加上持续时间就是有效期的截止时间 res.expires*1000 + Date.now()）
    //  将拿到的uploadToken和有效期存到localStorage中 存一份在当前组件实例身上
      const res = await reqUploadToken()
      res.expires = res.expires * 1000 + Date.now() - 2 * 60 * 1000
      this.tokenObj = res
      const tokenObj = JSON.stringify(res)
      localStorage.setItem("uploadToken",tokenObj)
      // console.log(res)  //uploadToken 和 expires(有效期)
      return resolve()
    })
  }
// 上传是往七牛云管理上去上传的
  customRequest=({file,onProgress, onError, onSuccess})=>{
    const observer = {
      next(res){
        console.log(res)
        onProgress({percent:res.total.percent})
      },
      error(err){
        onError(err)
      },
      complete:(res)=>{
        onSuccess(res)
        this.props.onChange("http://qfejn6jmm.hn-bkt.clouddn.com/"+res.key)
      }
    }
    // console.log(value,x) 
    const key = nanoid(10)
    const token = this.tokenObj.uploadToken
    const putExtra = {
      mimeType: "video/*",
    }
    const config = {
      region: qiniu.region.z2
    };
    const observable = qiniu.upload(file, key, token, putExtra, config)
    this.subscription = observable.subscribe(observer) // 上传开始
    console.log("上传执行了")

  }
  componentWillUnmount(){
    this.subscription && this.subscription.unsubscribe() // 上传取消
  }
  render() {
    return (
        <Upload customRequest={this.customRequest} beforeUpload={this.handleBeforeUpload}>
            <Button>
              <UploadOutlined /> 上传视频
            </Button>
        </Upload>
    )
  }
}
