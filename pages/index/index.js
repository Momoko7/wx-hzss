//index.js
//获取应用实例
const app = getApp()
const {extend,Tab} = require('../../zanui/index')
var wxApi = require('../../utils/wxApi')
var wxRequest = require('../../utils/wxRequest')
import config from '../../utils/config'
Page(extend({},Tab,{
    data: {
        imgUrls: [],
        tab:{
            list:[{
                id:'1',
                title:'即将开始'
            },{
                id:'2',
                title:'精彩感想'
            }],
            selectedId:'1',
        },
    },
    handleZanTabChange(e) {
        var selectedId = e.selectedId;
        this.setData({
            ['tab.selectedId']:selectedId,
        })
    },
    //事件处理函数
    onLoad: function () {
        var _this = this;
        _this.initInfo()
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        //1.获取code
        var wxLogin = wxApi.wxLogin()
        wxLogin().then(res => {
            //2.获取成功 通过code获取token
            var getCode = config.getCode
            return wxRequest.getRequest(getCode,{code:res.code})
        }).
        then(res => {
            //3.将token设置为全局变量
            var token = res.data
            _this.setData({
                token:token
            })
            app.globalData.token = token
            var wxGetUserInfo = wxApi.wxGetUserInfo()
            return wxGetUserInfo()
        }).
        then(res => {
            app.globalData.userInfo = res.userInfo
            var updatedhzappuser = config.updatedhzappuser
            wxRequest.postRequest(updatedhzappuser,{
                token:_this.data.token,
                name:res.userInfo.nickName,
                photo:res.userInfo.avatarUrl
            })
            /**/
            var getadvertisings = config.getadvertisings
            wxRequest.getRequest(getadvertisings,{id:4}).then(res=>{
                console.log(res.data.photo)
                var imgStr = res.data.photo || ''
                var imgArr = imgStr.split(',')
                var imgUrls = imgArr.map(item=>{
                    return config.imgBaseUrl + item
                })
                _this.setData({
                    imgUrls:imgUrls
                })
            })
        })
        .finally(function (res) {
            wx.hideToast()
        })
    },
    initInfo(){
        var _this = this
        /*首页初始化*/
        //获取课程列表
        var getactivitylist = config.getactivitylist
        wxRequest.getRequest(getactivitylist,{page:1}).then(res=>{
            let {rows:newArr} = res.data
            let imgBaseUrl = config.imgBaseUrl
            let courseRows = newArr.map(item=>{
                item.img = imgBaseUrl + item.photo
                if(item.type==1){
                    item.typeinfo = item.time
                }else if(item.type==2){
                    item.typeinfo = '活动进行中'
                }else {
                    item.typeinfo = '活动已结束'
                }
                return item
            })
            _this.setData({
                courseRows:courseRows
            })
        })
    }
}))
