// pages/user/myorder/myorder.js
const { extend, Tab } = require('../../../zanui/index');
Page(extend({},Tab,{
    /**
     * 页面的初始数据
     */
    data: {
        tab: {
            list: [{
                id: '1',
                title: '代付款'
            }, {
                id: '2',
                title: '待参与'
            }, {
                id: '3',
                title: '待评论'
            },],
            selectedId: '1'
        },
    },
    handleZanTabChange(e) {
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
