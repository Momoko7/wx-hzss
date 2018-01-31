// pages/index/team/team.js
import config from '../../../utils/config'
var wxRequest = require('../../../utils/wxRequest')
Page({

  data: {
  
  },

  onLoad: function (options) {
      var getlecturers = config.getlecturers
      var imgBaseUrl = config.imgBaseUrl
      var _this = this
    wxRequest.getRequest(getlecturers).then(
        res=>{
            var imgStr = res.data.photo
            var imgArr = imgStr.split(',')
            var imgs = imgArr.map(item=>{
                return imgBaseUrl+item
            })
            _this.setData({
                imgs:imgs
            })
        }
    )
  },

})