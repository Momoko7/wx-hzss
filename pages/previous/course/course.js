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
      tab:{
          list:[{
              id:'1',
              title:'介绍'
          },{
              id:'2',
              title:'评价'
          }],
          selectedId:'1',
      },
  },

    handleZanTabChange(e) {
        // componentId 即为在模板中传入的 componentId
        // 用于在一个页面上使用多个 tab 时，进行区分
        // selectId 表示被选中 tab 项的 id
        // console.log(componentId)
        // console.log(selectedId)
        /*console.log(e)
        this.setData({
            ['tab.selectedId']:e.selectedId
        })*/
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