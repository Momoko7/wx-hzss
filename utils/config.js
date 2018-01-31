// /*上传路径*/
//http://192.168.5.20:8092/app/hzss/getchengintro
var urlBase = "http://192.168.5.20:8092"   //接口 IP+端口
var imgUrlBase = "http://192.168.5.20:8095"   //图片 IP+端口
var urlApi = `${urlBase}/app/hzss`         //Api
export default {
    getOpenidUrl: 'https://api.weixin.qq.com/sns/jscode2session',
    imgBaseUrl:`${imgUrlBase}/`,
    //通过code获取token
    getCode:`${urlApi}/getCode`,
    //图片上传
    upload:`${urlBase}/app/files/upload`,
    //上传头像和昵称
    updatedhzappuser:`${urlApi}/updatedhzappuser`,
    //程老师资料
    getchengintro:`${urlApi}/getchengintro`,
    //获取课程列表
    getactivitylist:`${urlApi}/getactivitylist`,
    //根据id查询课程详情
    getactivityByid:`${urlApi}/getactivityByid`,
    //收藏课程 post
    postcollec:`${urlApi}/postcollec`,
    //取消收藏 post
    deletecollect:`${urlApi}/deletecollect`,
    //获取我的收藏id列表
    getcollectlist:`${urlApi}/getcollectlist`,
    //获取收藏活动列表
    getcollectactivity:`${urlApi}/getcollectactivity`,
    //获取讲师团信息
    getlecturers:`${urlApi}/getlecturers`,
    //获取往期活动
    getactivityByhots:`${urlApi}/getactivityByhots`,
    //发布感想
    postthoughts:`${urlApi}/postthoughts`,
    //查询感想列表 分页
    getThoughtsByhot:`${urlApi}/getThoughtsByhot`,
    //查询感想详情
    getthoughtsByid:`${urlApi}/getthoughtsByid`,

    //活动报名
    postactivityuser:`${urlApi}/postactivityuser`,

    //活动报名查询
    getactivityuser:`${urlApi}/getactivityuser`,
    //同盟汇信息
    gettongintro:`${urlApi}/gettongintro`,
    //分页查询合伙人
    getpartnersByhot:`${urlApi}/getpartnersByhot`,
    //获取轮播图 首页id=4 合伙id=5
    getadvertisings:`${urlApi}/getadvertisings`,

}