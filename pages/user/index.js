// pages/user/index.js
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
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