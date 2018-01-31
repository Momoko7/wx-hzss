// pages/user/collect/collect.js
const app = getApp()
var wxRequest = require('../../../utils/wxRequest')
import config from '../../../utils/config'
Page({
    data: {
        isEmpty:false
    },

    onLoad: function (options) {

    },
    onShow: function () {
        var token = app.globalData.token
        var getcollectactivity = config.getcollectactivity
        var _this = this
        wxRequest.getRequest(getcollectactivity,{
            token:token
        }).then(res=>{
            var imgBaseUrl = config.imgBaseUrl
            let {data:resRow} = res
            var collectList = resRow.map(item=>{
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
            if (collectList.length == 0){
                _this.setData({
                    isEmpty:true
                })
            }else {
                _this.setData({
                    collectList:collectList
                })
            }
        })
    }
})