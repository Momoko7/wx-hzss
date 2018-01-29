// /*上传路径*/
//http://192.168.5.20:8092/app/hzss/getchengintro
var urlBase = "http://192.168.5.20:8092"   //接口 IP+端口
var imgUrlBase = "http://192.168.5.20:8095"   //图片 IP+端口
var urlApi = `${urlBase}/app/hzss`         //Api
export default {
    getOpenidUrl: 'https://api.weixin.qq.com/sns/jscode2session',
    imgBaseUrl:`${imgUrlBase}/`,
    //程老师资料
    getchengintro:`${urlApi}/getchengintro`,
    //获取课程列表
    getactivitylist:`${urlApi}/getactivitylist`,
    //根据id查询课程详情
    getactivityByid:`${urlApi}/getactivityByid`,
}