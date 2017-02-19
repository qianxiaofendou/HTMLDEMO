
/*
* 获取浏览器型号分辨率、cookie、url解析、getScript
* author:chengds 
* date:2014/10/14
*/
(function(){    
    
    if(typeof ifeng=="undefined") ifeng={};
    ifeng.client = {};

    ifeng.client.info = {
        get: function () {
            var _this = ifeng.client;
            return _this.device.get() + ',' + _this.system.get() + ',' + _this.browser.get() + ',' + _this.screen.get();
        }
    };

    ifeng.client.screen = {
        get: function () {
            var _width = '', _height = '';

            try {
                _width = window.screen.width;
                _height = window.screen.height;
            } catch (e) {

            }

            return _width + '*' + _height;
        }
    };

    ifeng.client.system = {
        get: function () {
            var system = {}, platform = '', result = 'Win', ua = navigator.userAgent;

            platform = navigator.platform;
            system.win = platform.indexOf('Win') === 0;
            system.mac = platform.indexOf('Mac') === 0;
            system.x11 = (platform === 'X11') || (platform.indexOf('Linux') === 0);

            if (system.win) {
                if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                    if (RegExp['$1'] === 'NT') {
                        switch (RegExp['$2']) {
                            case '5.0':
                                result = 'windows_' + '2000';
                                break;
                            case '5.1':
                                result = 'windows_' + 'XP';
                                break;
                            case '6.0':
                                result = 'windows_' + 'Vista';
                                break;
                            case '6.1':
                                result = 'windows_' + '7';
                                break;
                            case '6.2':
                                result = 'windows_' + '8';
                                break;
                            default:
                                result = 'windows_' + 'NT';
                                break;
                        }
                    } else if (RegExp['$1'] === '9x') {
                        result = 'windows_' + 'ME';
                    } else if (ua.match(/(Windows Phone)\s+([\d.]+)/)) {
                        result = 'WP_' + ua.match(/(Windows Phone)\s+([\d.]+)/)[2];
                    } else {
                        result = RegExp['$1'] === 'Ph' ? 'WP' : 'windows_' + RegExp['$2'];
                    }
                }

                //@TODO 强制修正HTC手机的platform属性是windows的错误.
                if (ua.match(/(Android)\s+([\d.]+)/)) {
                    result = 'Android_' + ua.match(/(Android)\s+([\d.]+)/)[2];
                }

            } else if (system.mac) {
                result = ua.match(/(iPad).*OS\s([\d_]+)/) || ua.match(/(iPhone\sOS)\s([\d_]+)/) ? 'iOS' : 'Mac';
            } else if (system.x11) {
                // @TODO 修复Linux的匹配错误问题.
                result = ua.match(/(Android)\s+([\d.]+)/) ? 'Android_' + ua.match(/(Android)\s+([\d.]+)/)[2] : 'Linux';
            } else if (ua.match(/Windows Phone/)) {
                result = 'WP';
            } else if (ua.match(/(iPad).*OS\s([\d_]+)/) || ua.match(/(iPhone\sOS)\s([\d_]+)/)) {
                result = 'iOS_' + (ua.match(/(iPad).*OS\s([\d_]+)/) ? ua.match(/(iPad).*OS\s([\d_]+)/)[2] : ua.match(/(iPhone\sOS)\s([\d_]+)/)[2]);
            } else if (ua.match(/(Android)\s+([\d.]+)/)) {
                result = 'Android_' + ua.match(/(Android)\s+([\d.]+)/)[2];
            }

            return result;

        }
    };


    ifeng.client.device = {
        get: function () {
            var _device = 'PC', ua = navigator.userAgent;

            var iPad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var iPhone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
            var Android = ua.match(/(Android)\s+([\d.]+)/);
            var WP = ua.match(/(Windows Phone)\s+([\d.]+)/);

            if (iPad) {
                _device = 'iPad';
            }

            if (iPhone) {
                _device = 'iPhone';
            }

            if (Android) {
                if (!ua.toLowerCase().match(/mobile/)) {
                    _device = 'Pad';
                } else if (ua.match(/chrome\/([\d.]+)/) && ua.toLowerCase().match(/mobile/)) {
                    _device = 'Phone';
                } else if (ua.toLowerCase().match(/firefox\/([\d.]+)/) && ua.toLowerCase().match(/mobile/)) {
                    _device = 'Phone';
                } else {
                    _device = 'Phone';
                }

            }

            if (WP) {
                _device = 'Phone';
            }

            return _device;
        }
    };

    ifeng.client.browser = {
        get: function () {

            var userAgent = navigator.userAgent.toLowerCase();
            var _version, _browserVersion, browser = {};

            try {
                _browserVersion = userAgent.match(/(?:firefox|opera|safari|chrome|msie|micromessenger)[\/: ]([\d.]+)/);

                if (_browserVersion) {
                    _browserVersion = _browserVersion[1];
                } else {
                    _browserVersion = '0';
                }

                /* 获得浏览器的名称及版本信息 */
                browser = {
                    version: _browserVersion,
                    safari: /version.+safari/.test(userAgent) || /safari[\/ ]+([\d.]+)/.test(userAgent),
                    chrome: /chrome\/([\d.]+)/.test(userAgent) || /crios\/([\d.]+)/.test(userAgent),
                    firefox: /firefox/.test(userAgent),
                    ie: /msie/.test(userAgent) || /trident/.test(userAgent),
                    opera: /opera/.test(userAgent),

                    uc: /ucbrowser\/([\d.]+)/.test(userAgent),
                    au: /maxthon/.test(userAgent),
                    lb: /lbbrowser/.test(userAgent),
                    qq: /qqbrowser/.test(userAgent),
                    sg: /se 2.+x/.test(userAgent),
                    wx: /micromessenger/.test(userAgent)
                };

                _version = browser.version.split('.')[0];

                if (browser.uc) {
                    _version = userAgent.match(/ucbrowser\/([\d.]+)/)[1] ? userAgent.match(/ucbrowser\/([\d.]+)/)[1] : _version;
                    return 'UC_' + _version;
                }

                if (browser.au) {
                    _version = userAgent.match(/maxthon\/([\d.]+)/)[1] ? userAgent.match(/maxthon\/([\d.]+)/)[1] : _version;
                    return 'AU_' + _version;
                }

                if (browser.lb) {
                    return 'LB_' + _version;
                }

                if (browser.qq) {
                    _version = userAgent.match(/qqbrowser\/([\d.]+)/)[1] ? userAgent.match(/qqbrowser\/([\d.]+)/)[1] : _version;
                    return 'QQ_' + _version;
                }

                if (browser.sg) {
                    return 'SG_' + _version;
                }

                if (browser.firefox) {
                    return 'FF_' + _version;
                }

                if (browser.opera) {
                    return 'OP_' + _version;
                }

                if (browser.chrome) {
                    return 'CM_' + _version;
                }

                if (browser.wx) {
                    return 'WX_' + _version;
                }

                if (browser.safari) {

                    if (userAgent.match(/android/)) {
                        return 'WK_' + userAgent.match(/webkit\/([\d.]+)/)[1];
                    } else {

                        try {
                            if (userAgent.match(/(?:version)[\/: ]([\d.]+)/)) {
                                _version = userAgent.match(/(?:version)[\/: ]([\d.]+)/)[1];
                            }
                        } catch (exs) {

                        }

                        return 'SF_' + _version;
                    }

                }

                if (browser.ie) {

                    if (userAgent.indexOf('rv:11') > -1) {
                        _version = '11';
                    }

                    return 'IE_' + _version;
                }
            } catch (ex) {
                return 'unkonw';
            }

            return 'unkonw';
        }

    };

    ifeng.cookieUtil={
        get:function(name){
          var arg = name + "=";
          var alen = arg.length;
          var clen = document.cookie.length;
          var i = 0;
          var j = 0;
          while(i < clen){
            j = i + alen;
            if (document.cookie.substring(i, j) == arg)
              return this.getCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if(i == 0)
              break;
          }
          return null;
        },
        getCookieVal:function(offset){
           var endstr = document.cookie.indexOf(";", offset);
           if(endstr == -1){
             endstr = document.cookie.length;
           }
           return decodeURIComponent(document.cookie.substring(offset, endstr));
        },
        setCookie:function(name,value,Days) { 
            if(typeof Days=="undefined") Days=0; 
            var exp = new Date(); 
            if(Days>0) {
                exp.setTime(exp.getTime() + Days*24*60*60*1000); 
                document.cookie = name + "="+ escape (value) + ";domain=.ifeng.com;path=/;expires=" + exp.toGMTString(); 
            }else{
                document.cookie = name + "="+ escape (value) + ";domain=.ifeng.com;path=/"; 
            }

        },
        getMid:function(){
            var mid = this.get("if_mid");
            if(mid==null){
                /*
                //从url参数获取
                mid = ifeng.util.getRequest()["mid"];
                if(!mid){
                    mid = ifeng.util.uuid();
                }
                */
                mid = ifeng.util.uuid();
                this.setCookie("if_mid",mid,365);
            }
            return mid;
        },  
        getCh:function (){
            var request = ifeng.util.getRequest();
            var chFromCookie = this.get("ch");
            if(!chFromCookie){
                var chFromRequest = request["ch"];
                if(chFromRequest){
                    this.setCookie("ch",chFromRequest,0);
                    return chFromRequest;
                }
                return "";
            }
            return chFromCookie;
        }
    }
    
    if(!ifeng.util) ifeng.util={};
    ifeng.util.getRequest = function() {
       var url = location.search; //获取url中"?"符后的字串
       var theRequest = {};
       if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
             theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          }
       }
       return theRequest;
    };
    ifeng.util.getScript = function(src,callback){
        var head=document.getElementsByTagName("head")[0];
        var js=document.createElement("script");
        js.setAttribute("src",src);
        js.onload=js.onreadystatechange=function(){
          if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){
            head.removeChild(js);
            if(callback) callback();
          }
        }
        head.appendChild(js);
    };
    
    ifeng.util.uuid = function(){
        var  t = new Date().getTime() + (Math.round((1 << 12) * Math.random()) << 24);
        var  code = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZXX";
        var  sb = "";
        var  ch1 = code.charAt(parseInt(t & 0x003F));
        t = t >> 6;
        var ch2 = code.charAt(parseInt(t & 0x003F));
        t = t >> 6;
        var ch3 = code.charAt(parseInt (t & 0x003F));
        t = t >> 6;
        var ch4 = code.charAt(parseInt(t & 0x003F));
        t = t >> 6;
        var ch5 = code.charAt(parseInt(t & 0x003F));
        t = t >> 6;
        var ch6 = code.charAt(parseInt(t & 0x003F));
        sb+=ch6+ch5+ch4+ch3+ch2+ch1;
        return sb;

    }
})();