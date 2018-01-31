// pages/user/postidea/postidea.js
import config from '../../../utils/config'
const app = getApp()
var wxRequest = require('../../../utils/wxRequest')
var Promise = require('../../../plugins/es6-promise')
Page({
    data: {
        uploadImgs:[],
        isshow:true,
        candel:false,
        canpost:true
    },
    // 添加图片
    addImgClick:function () {
        var _this = this
        var count = 9 - _this.data.uploadImgs.length
        if (count>0){
            wx.chooseImage({
                sizeType:'compressed',
                count:count,
                success: res => {
                    var arr = res.tempFilePaths;
                    var newArr = _this.data.uploadImgs.concat(arr);
                    _this.setData({
                        uploadImgs:newArr
                    })
                }
            });
        }else {
            wx.showToast({
              title: '最多上传九张图,长按可取消。',
                icon:'none'
            })
        }
    },
    //图片预览
    imgClick(e){
        var _this = this
        console.log(e)
        console.log(e.currentTarget)
        let idx = e.currentTarget.id
        let current = _this.data.uploadImgs[idx]
        wx.previewImage({
            current: current,           // 当前显示图片的http链接
            urls: _this.data.uploadImgs // 需要预览的图片http链接列表
        })
    },
    postClick(e){
        var _this = this
        var token = app.globalData.token
        let {length:textLen} = e.detail.value.text
        let {length:imgNum} = _this.data.uploadImgs
        if (_this.data.canpost){
            if(textLen || imgNum){
                wx.showModal({
                    title: '提示',
                    content: '确认发表？',
                    success: res=>{
                        if (res.confirm) {
                            _this.setData({
                                canpost:false
                            })
                            wx.showToast({
                              title: '正在上传',
                                icon:'loading',
                                duration:50000,
                            })
                            var upload = config.upload             //上传图片url
                            var postthoughts = config.postthoughts //上传感想url
                            // var upImgArr = []
                            //上传图片
                            if(imgNum){
                                /*定义*/
                                const uploadFie = url => {
                                    return new Promise((resolve,reject) => {
                                        wx.uploadFile({
                                            url:upload,
                                            filePath:url,
                                            name:'uploadFile',
                                            success(res){
                                                resolve(res.data)
                                            },
                                            fail(res){
                                                reject(res)
                                            }
                                        })
                                    })
                                }
                                let upImgArrP = this.data.uploadImgs.map(item => uploadFie((item)))
                                Promise.all(upImgArrP).then(resulte => {
                                    var upimgStr = JSON.stringify(resulte)
                                    console.log(upimgStr)
                                    wxRequest.postRequest(postthoughts,{
                                        token:token,
                                        photo:upimgStr,
                                        message:e.detail.value.text
                                    })
                                }).finally(()=>{
                                    wx.hideToast()
                                    wx.showToast({
                                        title: '发表成功',
                                        success:()=>{
                                            wx.switchTab({
                                                url:'/pages/user/index'
                                            })
                                        }
                                    })
                                })
                                /*-------------------*/
                                /*var upImgArr = _this.data.uploadImgs.map(item=>{
                                    wx.uploadFile({
                                        url: upload,
                                        filePath: item,
                                        name: 'uploadFile',
                                        success:res=>{
                                            return res.data
                                        }
                                    })
                                })
                                function A(callback,value) {
                                    callback(value)
                                }
                                function B(value) {
                                    console.log(value)
                                }
                                A(B,upImgArr)*/
                            }else {
                                wxRequest.postRequest(postthoughts, {
                                    token: token,
                                    message: e.detail.value.text
                                }).finally(res=>{
                                    wx.hideToast()
                                    wx.showToast({
                                        title: '发表成功',
                                        success:()=>{
                                            wx.switchTab({
                                                url:'/pages/user/index'
                                            })
                                        }
                                    })
                                })
                            }
                        }
                    }
                })
            }else {
                wx.showModal({
                    title:'提示',
                    content:'内容为空！',
                    showCancel:false,
                })
            }
        }

    },
    longpressImg(e){
        console.log(e)
        wx.vibrateShort()
        var _this = this
        _this.setData({
            candel:true
        })
    },
    deleteImg(e){
        console.log(e)
        var _this = this
        console.log(_this.data.uploadImgs)
        wx.showModal({
            title: '确认取消上传此图？',
            content: '',
            success: res=>{
                if (res.confirm) {
                    var idx = e.currentTarget.id
                    _this.data.uploadImgs.splice(idx,1)
                    _this.setData({
                        uploadImgs:_this.data.uploadImgs,
                    })
                }
            }
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
})