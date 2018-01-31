// pages/idealist/detail/detail.js
import config from '../../../utils/config'
var wxRequest = require('../../../utils/wxRequest')
Page({

    /**
     * 页面的初始数据
     */
    data: {
      imgsUrl:[
          '/static/cheng.jpg',
          '/static/jst.jpg',
          '/static/jst.jpg'
      ]
    },

    //自定义函数
    imgClick(){
      var _this = this
      wx.previewImage({
        urls: _this.data.imgsUrl
      })
    },
    onLoad: function (options) {
        var _this = this
        var getthoughtsByid = config.getthoughtsByid
        var imgBaseUrl = config.imgBaseUrl
        wxRequest.getRequest(getthoughtsByid,{
            id:options.id
        }).then(res=>{
            var imgArr = res.data.photo.split(',')
            imgArr = imgArr.map(item=>{
                return imgBaseUrl+item
            })
            _this.setData({
                info:res.data,
                imgArr:imgArr
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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