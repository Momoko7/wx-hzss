//index.js
//获取应用实例
const app = getApp()
const {extend,Tab} = require('../../zanui/index')
import {url} from "../../utils/config"
Page(extend({},Tab,{
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        tab:{
            list:[{
                id:'1',
                title:'即将开始'
            },{
                id:'2',
                title:'精彩感想'
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
    //事件处理函数
    onLoad: function () {

    },
}))
