function _filmtime2(_time) {
    var timeStr = "";
    var hour = 0;
    var minute = 0;
    var second = 0;
    if (_time <= 0) {
        return "00:00";
    } else {
        minute = _time / 60;
        if (minute < 60) {
            second = _time % 60;
            timeStr = _unitFormat(minute) + ":" + _unitFormat(second);
        } else {
            hour = minute / 60;
            if (hour > 99) {
                return "99:59:59";
            }
            minute = minute % 60;
            second = _time - _unitFormat(hour) * 3600 - _unitFormat(minute) * 60;
            timeStr = _unitFormat(hour) + ":" + _unitFormat(minute) + ":" + _unitFormat(second);


        }
    }
    return timeStr;
}


function _unitFormat(i) {
    var retStr = "";
    if (i >= 0 && i < 10)
        retStr = "0" + parseInt(i);
    else
        retStr = "" + parseInt(i);
    return retStr;
}

function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bBtn = true;
        for (var attr in json) {
            var iCur = 0;
            if (attr == 'opacity') {
                iCur = Math.round(getStyle(obj, attr) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iCur != json[attr]) {
                bBtn = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bBtn) {
            clearInterval(obj.timer);
            if (fn) {
                fn.call(obj);
            }
        }
    }, 30);
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!aClass[0]) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] == sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            return;
        }
    }
}

function bindEvent(obj, events, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(events, fn, false);
    } else {
        obj.attachEvent('on' + events, fn);
    }
}

function posTop(obj) {
    var iTop = 0;
    while (obj) {
        iTop += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return iTop;
}

function gBack() {
    window.history.go(-1);
}

function mtip() {
    var dheight = window.innerHeight || document.documentElement.clientHeight;
    var dwidth = window.innerWidth || document.documentElement.clientWidth;
    var fade2 = document.getElementById('tipMsg');
    $("#tipMsg").show().fadeOut(3500);
    fade2.style.left = String(Math.round((dwidth - fade2.offsetWidth) / 2)) + "px";
    //fade2.style.top=String(Math.round((dheight-fade2.offsetHeight)/2))+"px";

}


function htip(msg, id) {
    var dheight = window.innerHeight || document.documentElement.clientHeight;
    var dwidth = window.innerWidth || document.documentElement.clientWidth;
    var fade2 = document.getElementById(id);
    $("#" + id).html(msg);
    $("#" + id).show().fadeOut(3500);
    fade2.style.left = String(Math.round((dwidth - fade2.offsetWidth) / 2)) + "px";
    //fade2.style.top=String(Math.round((dheight-fade2.offsetHeight)/2))+"px";
}
var happy = {
    USPhone: function(val) {
        return /^\(?(\d{3})\)?\d{3}\d{5}$/.test(val);
    },

    YDPhone: function(val) {
        return /1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/.test(val);
    },

    // matches mm/dd/yyyy (requires leading 0's (which may be a bit silly, what do you think?)
    date: function(val) {
        return /^(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01])\/(?:\d{4})/.test(val);
    },

    email: function(val) {
        return /^(?:\w+\.?\+?)*\w+@(?:\w+\.)+\w+$/.test(val);
    },

    minLength: function(val, length) {
        return val.length >= length;
    },

    maxLength: function(val, length) {
        return val.length <= length;
    },

    equal: function(val1, val2) {
        return (val1 == val2);
    }
};

/**
*时间格式:2016/05/06 15:40:22
*/
function getDateDiff(d1, d2) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now1 = new Date(d1).getTime();
    var now2 = new Date(d2).getTime();
    var diffValue = now2 - now1;
    if (diffValue < 0) { //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = parseInt(diffValue / month);
    var weekC = parseInt(diffValue / (7 * day));
    var dayC = parseInt(diffValue / day);
    var hourC = parseInt(diffValue / hour);
    var minC = parseInt(diffValue / minute);

    if (dayC >= 1 && dayC <= 7) {
        result = parseInt(dayC) + "天前发布";
    } else if (dayC > 7) {
        result = "一周前发布";
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前发布";
    } else if (hourC < 1) {
        result = "刚刚发布";
    } else result = "刚刚发表";
    return result;
}

/**
 * 检查数组元素是否有重复
 * 有重复返回true
 * @param arr 数组
 * var cc = [1,2,5,6,7,8,0,9];
 * alert(checkArrayItemsIsDuplicate(cc));
 */
function checkArrayItemsIsDuplicate(arr) {
    var map = {}, i, size;

    for (i = 0, size = arr.length; i < size; i++){
        if (map[arr[i]]){
            return true;
        }
        map[arr[i]] = true;
    }

    return false;
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var a = setCookie.arguments;
    var b = setCookie.arguments.length;
    var c = (b>2):a[2]:null;
    if(c != null){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        
    }
    //var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ((c==null)?"":(";expires="+d.toUTCString()));
    //document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie
function clearCookie(name) {
    setCookie(name, "", -1);
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

function trimStr(A) {
    return A.replace(/^\s+|\s+$/g, "")
}