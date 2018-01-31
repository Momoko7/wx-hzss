// pages/idealist/index.js
import config from '../../utils/config'
var wxRequest = require('../../utils/wxRequest')
Page({
    data: {
        ideaList:[],
        page:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        wx.showToast({
          title: '加载中',
            icon:'loading',
        duration:10000
        })
        this.getList(1).then(res=>{
            this.setData({
                ideaList:res
            })
        }).finally(()=>{
            wx.hideToast()
        })
    },
    getList:function (page) {
        var getThoughtsByhot = config.getThoughtsByhot
        return wxRequest.getRequest(getThoughtsByhot,{
            page:page
        }).then(res=>{
            return res.data.rows
        })
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
        var _this = this
        var page = _this.data.page + 1
        this.getList(page).then(res=>{
            if (res.length){
                wx.showToast({
                    title: '加载中',
                    icon:'loading',
                    duration:10000
                })
                var newRow = _this.data.ideaList.concat(res)
                _this.setData({
                    ideaList:newRow,
                    page:page
                })
            }else {
                _this.setData({
                    page:page-1
                })
            }
        }).finally(()=>{
            wx.hideToast()
        })
    },

})