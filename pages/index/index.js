//index.js
//获取应用实例
const app = getApp()
const {extend,Tab} = require('../../zanui/index')
var wxApi = require('../../utils/wxApi')
var wxRequest = require('../../utils/wxRequest')
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
        this.setData({
            ['tab.selectedId']:selectedId,
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
        console.log('s1')
        //1.获取code
        var wxLogin = wxApi.wxLogin()
        wxLogin().then(res => {
            console.log('s2')
            var getOpenidUrl = config.getOpenidUrl;
            var params = {
                appid: "wx4edf1039098a45cd",
                secret: "ff3f0d8017b20b5e0ee5df4599608f94",
                js_code: res.code,
                grant_type: "authorization_code"
            }
            //2.获取openid
            return wxRequest.getRequest(getOpenidUrl, params)
        }).
        then(res => {
            console.log('s3')
            /*在这里授权*/
            var wxGetUserInfo = wxApi.wxGetUserInfo()
            return wxGetUserInfo()
        }).
        then(res => {
            console.log('s4')
            _this.setData({
                userInfo: res.userInfo
            })
            app.globalData.userInfo = res.userInfo
        }).
        then(res => {
            var getactivitylist = config.getactivitylist
            return wxRequest.getRequest(getactivitylist,{
                page:1
            })
        }).
        then(res => {
            let {rows:newArr} = res.data
            let imgBaseUrl = config.imgBaseUrl
            let courseRows = newArr.map(item=>{
                item.img = imgBaseUrl + item.photo
                item.img = imgBaseUrl + item.photo
                return item
            })
            courseRows.imgUrl = imgBaseUrl + newArr.photo
            _this.setData({
                courseRows:courseRows
            })
        })
        .finally(function (res) {
            wx.hideToast()
        })
    },
}))
