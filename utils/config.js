// /*上传路径*/
//http://192.168.5.20:8092/app/hzss/getchengintro
var urlBase = "http://192.168.5.20:8092"   //IP+端口
var urlApi = `${urlBase}/app/hzss`         //Api
export default {
    //程老师资料
    getchengintro:`${urlApi}/getchengintro`,
    getOpenidUrl: 'https://api.weixin.qq.com/sns/jscode2session',
}