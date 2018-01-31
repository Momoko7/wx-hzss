// pages/user/index.js
//获取应用实例
const app = getApp()
var wxApi = require('../../utils/wxApi')
var wxRequest = require('../../utils/wxRequest')
import config from '../../utils/config'

Page({
    data: {
        userInfo: {},
        loginStatus:false
    },
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                loginStatus:true
            })
        }else {
            this.setData({
                loginStatus:false
            })
        }
    },
    /*点击登录*/
    authorizeClick(){
        this.getAuthorize()
    },
    /*自定义函数*/
    //登录
    getAuthorize(){
        var _this = this
        wx.openSetting({
            success:data=>{
                if (data.authSetting["scope.userInfo"] == true) {
                    wx.showToast({
                        title: '登录中',
                        icon:'loading',
                        duration:10000
                    })
                    var wxLogin = wxApi.wxLogin()
                    wxLogin().then(res=>{
                        var wxGetUserInfo = wxApi.wxGetUserInfo()
                        return wxGetUserInfo()
                    }).then(res=>{
                        _this.setData({
                            userInfo:res.userInfo,
                            loginStatus:true
                        })
                        app.globalData.userInfo = res.userInfo
                        var token = app.globalData.token
                        var updatedhzappuser = config.updatedhzappuser
                        wxRequest.postRequest(updatedhzappuser,{
                            token:token,
                            name:res.userInfo.nickName,
                            photo:res.userInfo.avatarUrl
                        })
                    }).finally(res=>{
                        wx.hideToast()
                    })
                }else {

                }
            },
        })
    },
    toOrder(){
        wx.navigateTo({
            url: './myorder/myorder'
        })
    },
    toCollect(){
        this.data.loginStatus ?
            wx.navigateTo({
                url: './collect/collect'
            }) :
            wx.showModal({
                title: '提示',
                content: '请登录！',
                success: res=>{
                    if (res.confirm) {
                        this.getAuthorize()
                    }
                }
            })
    },
    toPost(){
        this.data.loginStatus ?
            wx.navigateTo({
                url: './postidea/postidea'
            }) :
            wx.showModal({
                title: '提示',
                content: '请登录！',
                success: res=>{
                    if (res.confirm) {
                        this.getAuthorize()
                    }
                }
            })

    },
})