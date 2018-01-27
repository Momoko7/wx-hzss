
// pages/user/postidea/postidea.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadImgs:[],
        isshow:true,
        candel:false,
        canpost:true
    },

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
        let {length:textLen} = e.detail.value.text
        let {length:imgNum} = _this.data.uploadImgs
        if(textLen || imgNum){
            wx.showModal({
                title: '提示',
                content: '确认发表？',
                success: res=>{
                    if (res.confirm) {
                        _this.setData({
                            canpost:false
                        })
                        setTimeout(function () {
                            _this.setData({
                                canpost:true
                            })
                        },2000)
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