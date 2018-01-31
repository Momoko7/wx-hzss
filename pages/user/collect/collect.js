// pages/user/collect/collect.js
const app = getApp()
var wxRequest = require('../../../utils/wxRequest')
import config from '../../../utils/config'
Page({
    data: {

    },

    onLoad: function (options) {
        var token = app.globalData.token
        var getcollectactivity = config.getcollectactivity
        var _this = this
        wxRequest.getRequest(getcollectactivity,{
            token:token
        }).then(res=>{
            console.log(res)
            var imgBaseUrl = config.imgBaseUrl
            let {data:resRow} = res
            var collectList = resRow.map(item=>{
                console.log(item)
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
            _this.setData({
                collectList:collectList
            })
        })
    },
})