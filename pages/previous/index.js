// pages/previous/index.js
import config from '../../utils/config'
var wxRequest = require('../../utils/wxRequest')
Page({

    data: {
        page:1
    },
    onShow: function () {
        this.getCourse(1).then(res => {
            this.setData({
                courseRows:res
            })
        })
    },
    onReachBottom(){
        var page = this.data.page + 1
        this.getCourse(page).then(res => {
            var resRow = res || []
            if (resRow.length > 0){
                wx.showToast({
                    title: '加载更多',
                    icon:'loading',
                    duration:500
                })
                var newRow = this.data.courseRows.concat(resRow)
                this.setData({
                    courseRows:newRow,
                    page:page
                })
            }
        })
    },
    getCourse(page){
        var getactivityByhots = config.getactivityByhots
        return wxRequest.getRequest(getactivityByhots,{page:page}).then(
            res=>{
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
                return courseRows
            }
        )
    }
})