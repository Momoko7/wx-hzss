// pages/index/course/course.js
const { extend, Tab,Field } = require('../../../zanui/index');
const app = getApp()
var wxApi = require('../../../utils/wxApi')
var wxRequest = require('../../../utils/wxRequest')
import config from '../../../utils/config'
var WxParse = require('../../../wxParse/wxParse.js')
Page(extend({}, Tab,Field,{
    data: {
        isOver:true,
        collected:false,
        tab:{
            list:[{
                id:'1',
                title:' 课 程 介 绍 '
            },/*{
                id:'2',
                title:'评价'
            }*/],
            selectedId:'1',
        },
        isShow:false
    },
    onLoad: function (options) {
        var token = app.globalData.token
        var _this = this
        var id = options.id
        var getactivityByid = config.getactivityByid  //获取课程详情
        var getcollectlist = config.getcollectlist    //获取收藏id列表
        wx.showToast({
            title: '加载中',
            icon:'loading',
            duration:10000
        })
        wxRequest.getRequest(getactivityByid,{id:id})
            .then(
                res=>{
                    let {data:info} = res
                    info.videoUrl = config.imgBaseUrl+info.video
                    _this.setData({
                        info:info
                    })
                    var message = info.message
                    WxParse.wxParse('message', 'html', message, _this);
                    if (token){
                        wxRequest.getRequest(getcollectlist,{
                            token:token
                        }).then(res=>{
                            res.data.map(item=>{
                                if (item.pid == id){
                                    _this.setData({
                                        collected:true
                                    })
                                }
                            })
                        })
                    }
                }
        ).finally(res=>{
            wx.hideToast()
        })
    },
    /*咨询*/
    callClick(){
        var phone = this.data.info.phone
        wx.showModal({
            title: '提示',
            content: `拨打电话：${phone}`,
            success: res=>{
                if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber: phone,
                    })
                }
            }
        })
    },
    /*报名*/
    bmClick(){
        var _this = this
        var getactivityuser = config.getactivityuser
        var token = app.globalData.token || ''
        var id = this.data.info.id
        if (token){
            wxRequest.getRequest(getactivityuser,{
                token:token,
                id:id
            }).then(res=>{
                if (res.data == 2){
                    //未报名
                    _this.setData({
                        isShow:true
                    })
                }else {
                    //已报名
                    wx.showModal({
                      title: '提示',
                      content: '你已经提交过报名信息哦！',
                        showCancel:false,
                    })
                }
            })
        }else {
            _this.toLogin()
        }
    },
    closeClick(){
        this.setData({
            isShow:false
        })
    },
    // 输入框失焦时触发
    handleZanFieldBlur({ componentId, detail}) {
        var _this = this
        if (componentId == 1){
            _this.setData({
                username:detail.value
            })
        }
        if (componentId == 2){
            _this.setData({
                userphone:detail.value
            })
        }
    },
    //提交
    postClick(){
        var username = this.data.username || ''
        var userphone = this.data.userphone || ''
        var token = app.globalData.token
        var _this = this
        if (username && userphone){
            wx.showModal({
                title: '提示',
                content: '确认提交报名信息？',
                success: res=>{
                    if (res.confirm) {
                        var postactivityuser = config.postactivityuser
                        wxRequest.postRequest(postactivityuser,{
                            token:token,
                            name:username,
                            phone:userphone,
                            aid:_this.data.info.id
                        }).then(res=>{
                            _this.setData({
                                isShow:false
                            })
                            if (res.statusCode == 201){
                                wx.showModal({
                                  title: '提示',
                                  content: '提交成功，请保持电话畅通，稍后工作人员会与您取得联系。',
                                    showCancel:false,
                                })
                            }
                        })
                    }
                }
            })
        }else {
            wx.showModal({
              title: '提示',
              content: '请填入完整信息！',
              success: res=>{
                if (res.confirm) {

                }
              }
            })
        }
    },
    /*点击收藏
    * 1.判断是否已登录
    * 2.判断是否已收藏
    * */
    collectClick(){
        var _this = this
        var token = app.globalData.token || ''
        var pid = _this.data.info.id
        if (token){
            if(_this.data.collected){
                var deletecollect = config.deletecollect
                wxRequest.postRequest(deletecollect,{
                    token:token,
                    pid:pid
                }).then(res=>{
                    wx.showToast({
                      title: '取消收藏'
                    })
                })
            }else {
                var postcollec = config.postcollec
                wxRequest.postRequest(postcollec,{
                    token:token,
                    pid:pid
                }).then(res=>{
                    wx.showToast({
                        title: '收藏成功'
                    })
                })
            }
            this.setData({
                collected: !_this.data.collected
            })
        }else {
            _this.toLogin()
        }
    },
    toLogin(){
        wx.showModal({
            title: '提示',
            content: '请登录后再收藏！',
            success: res=>{
                if (res.confirm) {
                    wx.switchTab({
                        url:'/pages/user/index'
                    })
                }
            }
        })
    },
    handleZanTabChange(e) {
        var selectedId = e.selectedId;
        this.setData({
            ['tab.selectedId']:selectedId,
        })
    },

}))