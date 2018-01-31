// pages/index/partner/partner.js
import config from "../../../utils/config";
var wxRequest = require('../../../utils/wxRequest')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        imgBaseUrl:config.imgBaseUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this
        var getadvertisings = config.getadvertisings
        wxRequest.getRequest(getadvertisings,{id:5}).then(res=>{
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
    },
    onShow: function () {
        var _this = this
        this.getInfo(1).then(res=>{
            console.log(res.data)
            _this.setData({
                showList:res.data.rows
            })
        })
    },
    getInfo(page){
        var getpartnersByhot = config.getpartnersByhot
        return wxRequest.getRequest(getpartnersByhot,{
            page:page
        })
    },
    onReachBottom: function () {

    },

})