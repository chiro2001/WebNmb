cordova.define("com.cordova.plugins.cookiemaster.cookieMaster", function(require, exports, module) { var cookieMaster = {

    getCookieValue: function(url, cookieName, successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'getCookieValue',
                    [url, cookieName]
        );
    },
    setCookieValue: function (url, cookieName, cookieValue, successCallback, errorCallback) {
        successCallback = successCallback || function () {
           // console.log('New Cookie has been set');
        };
        errorCallback = errorCallback || function (err) {
            console.error('Something went wrong setting the new cookie: ', err);
        };
        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'setCookieValue',
                    [url, cookieName, cookieValue]
        );
    },
    setCookieOption: function(option, successCallback, errorCallback) {
        //ios
        cordova.exec(successCallback,
                     errorCallback,
                     'CookieMaster', 'setCookieOption', 
                     [option]
         );
    },
    clear: function(successCallback, errorCallback) {
        successCallback = successCallback || function () {
           // console.log('Cookie has been removed');
        };
        errorCallback = errorCallback || function (err) {
            console.error('Something went wrong removing the new cookie: ', err);
        };

        cordova.exec(successCallback,
                    errorCallback,
                    'CookieMaster', 'clearCookies',
                    []
        );
    }
};
module.exports = cookieMaster;

});
