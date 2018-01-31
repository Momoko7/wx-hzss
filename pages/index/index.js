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
        kcPage:1,
        gxPage:1,
        courseRows:[],
        ideaRows:[]
    },

    handleZanTabChange(e) {
        var selectedId = e.selectedId;
        this.setData({
            ['tab.selectedId']:selectedId,
        })
    },

    onShow: function () {
        var _this = this
        _this.getCourse(1).then(res=>{
            _this.setData({
                courseRows:res
            })
        })
        _this.getIdea(1).then(res => {
            _this.setData({
                ideaRows:res
            })
        })
    },
    //事件处理函数
    onLoad: function () {
        var _this = this;
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })

        //加载轮播图
        var getadvertisings = config.getadvertisings
        wxRequest.getRequest(getadvertisings,{id:4}).then(res=>{
            var imgStr = res.data.photo || ''
            var imgArr = imgStr.split(',')
            var imgUrls = imgArr.map(item=>{
                return config.imgBaseUrl + item
            })
            _this.setData({
                imgUrls:imgUrls
            })
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
        })
        .finally(function (res) {
            wx.hideToast()
        })
    },

    /*获取课程列表*/
    getCourse(page){
        var getactivitylist = config.getactivitylist
        return wxRequest.getRequest(getactivitylist,{page:page}).then(res=>{
            if(res.data.rows.length>0){
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
                return courseRows
            }
        })
    },

    /*获取感想列表*/
    getIdea(page){
        var _this = this
        var getThoughtsByhot = config.getThoughtsByhot
        return wxRequest.getRequest(getThoughtsByhot,{
            page:page
        }).then(res=>{
            if (res.data.rows.length > 0){
                var newRow = _this.data.ideaRows.concat(res.data.rows)
                _this.setData({
                    ideaRows:newRow
                })
            }else {
                _this.setData({
                    gxPage:page-1
                })
            }
            return res.data.rows
        })
    },

    //触底事件
    onReachBottom(){
        var _this = this
        if(this.data.tab.selectedId == 1){
            //课程
            var page = _this.data.kcPage + 1
            _this.getCourse(page).then(res=>{
                var resRows = res || []
                if(resRows.length > 0){
                    wx.showToast({
                      title: '加载更多',
                        icon:'loading',
                        duration:500
                    })
                    var newRows = _this.data.courseRows.concat(resRows)
                    _this.setData({
                        courseRows:newRows,
                        kcPage:page
                    })
                }
            })
        }else {
            //感想
            var page = _this.data.gxPage + 1
            _this.getIdea(page).then(res=>{
                var resRows = res || []
                if (resRows.length > 0){
                    wx.showToast({
                        title: '加载更多',
                        icon:'loading',
                        duration:500
                    })
                    var newRows = _this.data.ideaRows.concat(resRows)
                    _this.setData({
                        ideaRows:newRows,
                        gxPage:page
                    })
                }
            })
        }
    }
}))
