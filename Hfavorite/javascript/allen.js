;!function(){
	 "undefined" == typeof allen && (allen = {}),
	 allen.web={
	    GetRequest:function(url) {
	        //var url = location.search; //获取url中"?"符后的字串
	        var theRequest = new Object();
	        if (url.indexOf("?") != -1) {
	        	var index = url.indexOf("?");
	            var str = url.substr(index+1);
	            //alert(str);
	            strs = str.split("&");
	            for (var i = 0; i < strs.length; i++) {
	                //theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	                theRequest[strs[i].substr(0,strs[i].indexOf("="))] = strs[i].substr(strs[i].indexOf("=")+1);
	            }
	        }
	        return theRequest;
		},
	    getUrlParam:function(name) {
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		    //var r = uurl.substr(1).match(reg);  //匹配目标参数
		    console.log(r);
		    if (r != null){
		    	return decodeURI(r[2]);   //也有写法是这样的return unescape(r[2]);
		    }else{
		        return null; //返回参数值
		    }
		},
	    bindEvent:function(obj, events, fn) {
		    if(obj.addEventListener) {
		        obj.addEventListener(events, fn, false);
		    }else if(obj.attachEvent){
		        obj.attachEvent('on' + events, fn);
		    }else{
		    	obj["on" + events] = fn;
		    }
		},
		removeEvent:function(obj,events,fn){
			if(obj.removeEventListener) {
			    obj.removeEventListener(events, fn, false);
			}else if(obj.detachEvent){
			    obj.detachEvent('on' + events, fn);
			}else{
				obj["on" + events] = null;
			}
		},
		getEvent: function(event) {
			return event || window.event
		},
		getTarget: function(event) {
			return event.target || event.srcElement
		},
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},
		getRelatedTarget:function(event){
			if(event.relatedTarget){
				return event.relatedTarget;
			}else if (event.toElement){   //ie8之前
				return event.toElement;	
			}else if (event.fromElement){  //ie8之前
				return event.fromElement;
			}else{
				return null;
			}
		},
		getCharCode:function(event){
			if(typeof event.charCode == "number"){
				return event.charCode;
			}else{
				return event.keyCode;
			}
		}
	 },
	 allen.time={
	 	getDuration:function(timestr){
           if(isNaN(timestr) || !timestr){
             return '';
           }
            var hours = Math.floor(timestr / 60 / 60);
            var minutes = Math.floor(timestr / 60 % 60);
            var seconds = timestr % 60;
            return hours > 0 ? hours + ':' + this.format(minutes) + ':' + this.format(seconds) : this.format(minutes) + ':' + this.format(seconds);
        },
        format:function(n){
            return n < 10 ? '0' + n : n;
        },
        /**
		*时间格式:2016/05/06 15:40:22
		*/
		getDateDiff:function(d1, d2) {
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
	 }


}();	 