// pages/previous/index.js
import config from '../../utils/config'
var wxRequest = require('../../utils/wxRequest')
Page({

    data: {

    },

    onLoad: function (options) {
        var _this = this
        var getactivityByhots = config.getactivityByhots
        wxRequest.getRequest(getactivityByhots,{page:1}).then(
            res=>{
                console.log(res)
                let {rows:newArr} = res.data
                let imgBaseUrl = config.imgBaseUrl
                let courseRows = newArr.map(item=>{
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
                    courseRows:courseRows
                })
            }
        )
    },
})