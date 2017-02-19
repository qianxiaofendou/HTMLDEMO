/**
 * 参考腾讯http://aq.qq.com/v2/js/common.js?v=2.9页面
 * http://127.0.0.1:8020/HTMLDEMO/zepto_test.html?uname=kkk&pwd=aaa
 * var pram_str = getUrlParam("uname");
 * pram_str = 'kkk';
 * @param {Object} C
 */
function getUrlParam(C) {
	var B = location.href;
	var D = B.substring(B.indexOf("?") + 1, B.length).split("&");
	var A = {};
	for (i = 0; j = D[i]; i++) {
		A[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
	}
	var E = A[C.toLowerCase()];
	if (typeof(E) == "undefined") {
		return ""
	} else {
		return E
	}
}

function trimStr(A) {
	return A.replace(/^\s+|\s+$/g, "")
}


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


/*
 *兼容IE6的居中定位
 */
function setCenter(){
	$("#login_alert").css("position","absolute");
	var FrameMarginTop =  document.documentElement.scrollTop - document.getElementById("login_alert").offsetHeight/2 + "px";
	var FrameMarginLeft = document.documentElement.scrollLeft  - document.getElementById("login_alert").offsetWidth/2 + "px";
	$("#login_alert").css({"marginTop":FrameMarginTop,"marginLeft":FrameMarginLeft});
}
