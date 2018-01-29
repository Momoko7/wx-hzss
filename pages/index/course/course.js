// pages/index/course/course.js
const { extend, Tab } = require('../../../zanui/index');

var wxApi = require('../../../utils/wxApi')
var wxRequest = require('../../../utils/wxRequest')
import config from '../../../utils/config'

Page(extend({}, Tab,{
    data: {
        isOver:true,
        collected:false,
        tab:{
            list:[{
                id:'1',
                title:' 课 程 介 绍 '
            },/*{
                id:'2',
                title:'评价'
            }*/],
            selectedId:'1',
        },
    },
    onLoad: function (options) {
        var _this = this
        var id = options.id
        var getactivityByid = config.getactivityByid
        wx.showToast({
            title: '加载中',
            icon:'loading',
            duration:10000
        })
        wxRequest.getRequest(getactivityByid,{id:id}).then(
            res=>{
                console.log(res.data)
                let {data:info} = res
                info.videoUrl = config.imgBaseUrl+info.video
                _this.setData({
                    info:info
                })
            }
        ).finally(res=>{
            wx.hideToast()
        })
    },
    callClick(){
        var phone = this.info.phone
        wx.showModal({
          title: '提示',
          content: `拨打电话：${phone}`,
          success: res=>{
            if (res.confirm) {
                wx.makePhoneCall({
                    phoneNumber: phone,
                })
            }
          }
        })
    },
    collectClick(){
      var _this = this
      console.log(_this.data.collected)
      this.setData({
        collected: !_this.data.collected
      })
    },
    handleZanTabChange(e) {
        // componentId 即为在模板中传入的 componentId
        // 用于在一个页面上使用多个 tab 时，进行区分
        // selectId 表示被选中 tab 项的 id
        var selectedId = e.selectedId;
        this.setData({
            ['tab.selectedId']:selectedId,
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
}))