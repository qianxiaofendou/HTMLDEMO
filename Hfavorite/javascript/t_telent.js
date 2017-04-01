//腾讯首页使用方式
if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
	try {
		if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			window.location.href = "http://xw.qq.com/index.htm";
		} else if (/iPad/i.test(navigator.userAgent)) { //window.location.href="http://www.qq.com/pad/"
		} else {
			window.location.href = "http://xw.qq.com/simple/s/index/"
		}
	} catch(e) {}
}

//QQ邮箱使用方式
function isMobile() {
	return navigator.userAgent.match(/Mobile|iPhone|iPad|Android/i) || Math.min(screen.height, screen.width) <= 480;
}


  var browser={
          versions:function(){
              var u = navigator.userAgent, app = navigator.appVersion;
              return {
                  trident: u.indexOf('Trident') > -1, //IE内核
                  presto: u.indexOf('Presto') > -1, //opera内核
                  webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                  gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                  mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                  android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                  iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                  iPad: u.indexOf('iPad') > -1, //是否iPad
                  webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                  weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                  qq: u.match(/\sQQ/i) == " qq" //是否QQ
              };
          }(),
          language:(navigator.browserLanguage || navigator.language).toLowerCase()
      } ;

//腾讯关于cookies的操作
function setCookie(C, E) {
  var A = setCookie.arguments;
  var F = setCookie.arguments.length;
  var B = (F > 2) ? A[2] : null;
  if (B != null) {
    var D = new Date();
    D.setTime(D.getTime() + (B * 1000 * 3600 * 24))
  }
  document.cookie = C + "=" + escape(E) + ((B == null) ? "": ("; expires=" + D.toGMTString()))
}
function setCookieExpire(C, E) {
  var A = setCookieExpire.arguments;
  var F = setCookieExpire.arguments.length;
  var B = (F > 2) ? A[2] : null;
  if (B != null) {
    var D = B
  }
  document.cookie = C + "=" + escape(E) + ((B == null) ? "": ("; expires=" + D.toGMTString()))
}
function deleteCookie(A) {
  var B = new Date();
  B.setTime(0);
  setCookie(A, "", B)
}
function getCookie(A) {
  var C = function(F) {
    if (!F) {
      return F
    }
    for (; F != unescape(F);) {
      F = unescape(F)
    }
    for (var E = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], G = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], D = 0; D < E.length; D++) {
      F = F.replace(new RegExp(E[D], "gi"), G[D])
    }
    return F
  };
  var B;
  return C((B = document.cookie.match(RegExp("(^|;\\s*)" + A + "=([^;]*)(;|$)"))) ? unescape(B[2]) : "")
}      