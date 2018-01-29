// pages/index/cheng/cheng.js
import config from "../../../utils/config"
import wxRequest from "../../../utils/wxRequest"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        var getchengintro = config.getchengintro
        wx.showToast({
            title: '加载中..',
            icon: 'loading',
            duration: 10000
        })
        wxRequest.getRequest(getchengintro).then(
            res => {
                console.log(res)
                let {name,photo,userintro,message,type} = res.data
                var reg = /\n/
                userintro = userintro.split(reg)
                message = message.split(reg)
                photo = config.imgBaseUrl + photo
                _this.setData({
                    name:name,
                    photo:photo,
                    userintro:userintro,
                    message:message,
                    type:type
                })
            },

        ).finally(function (res) {
            wx.hideToast()
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})