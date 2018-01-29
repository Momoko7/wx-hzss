// pages/user/index.js
//获取应用实例
const app = getApp()
var wxApi = require('../../utils/wxApi')
var wxRequest = require('../../utils/wxRequest')
import config from '../../utils/config'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        loginStatus:false
    },

    /*点击授权*/
    authorizeClick(){
        var _this = this
        wx.openSetting({
            success:data=>{
                if (data.authSetting["scope.userInfo"] == true) {
                    wx.showToast({
                        title: '授权中',
                        icon:'loading',
                        duration:10000
                    })
                    var wxLogin = wxApi.wxLogin()
                    wxLogin().then(res=>{
                        var wxGetUserInfo = wxApi.wxGetUserInfo()
                        return wxGetUserInfo()
                    }).then(res=>{
                        console.log(res)
                        _this.setData({
                            userInfo:res.userInfo,
                            loginStatus:true
                        })
                    }).finally(res=>{
                        wx.hideToast()
                    })
                }else {

                }
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.globalData)
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

    /*自定义函数*/
    toOrder(){
        wx.navigateTo({
            url: './myorder/myorder'
        })
    },
    toCollect(){
        wx.navigateTo({
            url: './collect/collect'
        })
    },
    toPost(){
        wx.navigateTo({
            url: './postidea/postidea'
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})