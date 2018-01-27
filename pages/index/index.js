//index.js
//获取应用实例
const app = getApp()
const {extend,Tab} = require('../../zanui/index')
//--------------------
var util = require('../../utils/util')
var wxApi = require('../../utils/wxApi')
var wxRequest = require('../../utils/wxRequest')
//------------------
import config from '../../utils/config'
Page(extend({},Tab,{
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
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
        console.log(selectedId)
        this.setData({
            ['tab.selectedId']:selectedId,
        })
    },
    //事件处理函数
    onLoad: function () {
        var that = this;
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        //1.获取code
        var wxLogin = wxApi.wxLogin()
        wxLogin().then(res => {
            console.log('1.成功了')
            console.log(res.code)
            var url = config.getOpenidUrl;
            var params = {
                appid: "wx4edf1039098a45cd",
                secret: "ff3f0d8017b20b5e0ee5df4599608f94",
                js_code: res.code,
                grant_type: "authorization_code"
            }
            //2.获取openid
            return wxRequest.getRequest(url, params)
        }).
        then(
            res => {
                console.log('2.成功了')
                console.log(res)
                var url = app.globalData.ip + config.searchDgUrl
                var data = util.json2Form({ phoneNumber: '15971908021' })
                //3.获取绑定手机号码
                return wxRequest.postRequest(url, data)
            }, res => {
                return '2失败了'
            }).
        then(res => {
            console.log('3.成功了')
            console.log(res)
            //4.获取系统信息
            var wxGetSystemInfo = wxApi.wxGetSystemInfo()
            return wxGetSystemInfo()
        },res=>{
            console.log('3.失败了')
        }).
        then(res => {
            console.log('4.成功了')
            console.log(res)
            //5.获取用户信息
            var wxGetUserInfo = wxApi.wxGetUserInfo()
            return wxGetUserInfo()
        }).
        then(res => {
            console.log('5.成功了')
            console.log(res.userInfo)
            that.setData({
                userInfo: res.userInfo
            })
            app.globalData.userInfo = res.userInfo
        })
            .finally(function (res) {
                console.log('finally~')
                wx.hideToast()
            })
    },
}))
