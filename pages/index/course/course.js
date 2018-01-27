// pages/index/course/course.js
const { extend, Tab } = require('../../../zanui/index');
Page(extend({}, Tab,{

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        isOver:true,
        collected:false,
        tab:{
            list:[{
                id:'1',
                title:' 课 程  介 绍 '
            },/*{
                id:'2',
                title:'评价'
            }*/],
            selectedId:'1',
        },
    },
    callClick(){
        wx.showModal({
          title: '提示',
          content: '拨打 1222666322？',
          success: res=>{
            if (res.confirm) {
                wx.makePhoneCall({
                    phoneNumber: '18702810836', //仅为示例，并非真实的电话号码
                    success(){
                        console.log('chengg')
                    },
                    fail(){
                        console.log('falll')
                    }
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
        console.log(selectedId)
        this.setData({
            ['tab.selectedId']:selectedId,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(Tab)
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