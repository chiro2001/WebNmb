cordova.define("TalkingData.TalkingData", function(require, exports, module) { /*  
    Javascript interface of Cordova plugin for TalkingData Analytics SDK 
*/

var TalkingData = {

    // 初始化 TalkingData Analytics SDK
    // appKey    : TalkingData appid, https://www.talkingdata.com/app/document_web/index.jsp?statistics
    // channelId : 渠道号
    init:function(appKey, channelId) {
        cordova.exec(null, null, "TalkingData", "init", [appKey, channelId]);
    },

    AccountType: {
        ANONYMOUS   : 0,
        REGISTERED  : 1,
        SINA_WEIBO  : 2,
        QQ          : 3,
        QQ_WEIBO    : 4,
        ND91        : 5,
        WEIXIN      : 6,
        TYPE1       : 11,
        TYPE2       : 12,
        TYPE3       : 13,
        TYPE4       : 14,
        TYPE5       : 15,
        TYPE6       : 16,
        TYPE7       : 17,
        TYPE8       : 18,
        TYPE9       : 19,
        TYPE10      : 20
    },

    // 注册事件
    // accountId : 帐户ID
    // type      : 帐户类型
    // name      : 帐户昵称
    onRegister:function(accountId, type, name) {
        cordova.exec(null, null, "TalkingData", "onRegister", [accountId, type, name]);
    },

    // 登录事件
    // accountId : 帐户ID
    // type      : 帐户类型
    // name      : 帐户昵称
    onLogin:function(accountId, type, name) {
        cordova.exec(null, null, "TalkingData", "onLogin", [accountId, type, name]);
    },

    // 触发自定义事件
    // eventId   : 自定义事件的 eventId
    onEvent:function(eventId) {
        cordova.exec(null, null, "TalkingData", "onEvent", [eventId]);
    },

    // 触发自定义事件
    // eventId   : 自定义事件的 eventId
    // eventLabel: 自定义事件的事件标签
    onEventWithLabel:function(eventId, eventLabel) {
        cordova.exec(null, null, "TalkingData", "onEventWithLabel", [eventId, eventLabel]);
    },

    // 触发自定义事件
    // eventId   : 自定义事件的 eventId
    // eventLabel: 自定义事件的事件标签
    // eventData : 自定义事件的数据，Json 对象格式
    onEventWithParameters:function(eventId, eventLabel, eventData) {
        var eventDataJson = JSON.stringify(eventData);
        cordova.exec(null, null, "TalkingData", "onEventWithParameters", [eventId, eventLabel, eventDataJson]);
    },

   
    // 设置位置经纬度
    // latitude  : 纬度
    // longitude : 经度
    setLocation:function(latitude, longitude) {
        cordova.exec(null, null, "TalkingData", "setLocation", [latitude, longitude]);
    },

    // 获取 TalkingData Device Id，并将其作为参数传入 JS 的回调函数
    // callBack  : 处理 deviceId 的回调函数
    getDeviceId:function(callBack) {
        cordova.exec(callBack, null, "TalkingData", "getDeviceId", []);
    },

    // 设置是否记录并上报程序异常信息
    // enabled   : true or false
    setExceptionReportEnability:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setExceptionReportEnability", [enabled]);
    },

    // 设置是否记录并上传 iOS 平台的 signal
    // enabled   : true or false
    setSignalReportEnability:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setSignalReportEnability", [enabled]);
    },

    // 设置是否在控制台（iOS）/LogCat（Android）中打印运行时日志
    // enabled   : true or false
    setLogEnability:function(enabled) {
        cordova.exec(null, null, "TalkingData", "setLogEnability", [enabled]);
    }
};

module.exports = TalkingData;

});
