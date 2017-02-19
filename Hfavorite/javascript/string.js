//计算字符串长度
String.prototype.strLen = function() {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len ++;
    }
    return len;
}

//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function(){
    var chars = new Array();
    for (var i = 0; i < this.length; i++){
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
    }
    String.prototype.charsArray = chars;
    return chars;
}

//判断某个字符是否是汉字
String.prototype.isCHS = function(i){
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
        return true;
    else
        return false;
}

//截取字符串（从start字节到end字节）
String.prototype.subCHString = function(start, end){
    var len = 0;
    var str = "";
    this.strToChars();
    for (var i = 0; i < this.length; i++) {
        if(this.charsArray[i][1])
            len += 2;
        else
            len++;
        if (end < len)
            return str;
        else if (start < len)
            str += this.charsArray[i][0];
    }
    return str;
}

//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function(start, length){
    return this.subCHString(start, start + length);
}




String.prototype.include = function(t) { return this.indexOf(t) >= 0 ? true : false; };
String.prototype.trim = function(){ var r = /^\s+|\s+$/g;return this.replace(r,'');};
String.prototype.unescHtml = function(){ var i,e={'&lt;':'<','&gt;':'>','&amp;':'&','&quot;':'"'},t=this; for(i in e) t=t.replace(new RegExp(i,'g'),e[i]); return t;};
String.prototype.escHtml = function(){ var i,e={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'},t=this; for(i in e) t=t.replace(new RegExp(i,'g'),e[i]); return t;};
String.prototype.escAttr = function(){var t = this; t = t.replace('"',"&quot;");return t;};
String.prototype.encodeURI = function(){var t = this;return encodeURIComponent(t);};
String.prototype.decodeURI = function(){var t = this;var t1 = decodeURIComponent(t); while(t != t1){t=t1;t1=decodeURIComponent(t);}return t;};
String.prototype.format = function(){var t=this;for(var i=0;i<arguments.length;i++){t = t.replace('{' + (i) + '}',arguments[i]);}return t;};
String.prototype.isEmail = function(){return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this);};
String.prototype.startWith = function(str){var t=this;return t.indexOf(str) == 0;};
String.prototype.endWith = function(str){var t = this;return t.substring(t.length-str.length,t.length) == str;};
String.prototype.isUrl = function(){var reg = /^http:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;var tmpStr = this;return url.test(tmpStr);};
  