//(function() {
    var scripts = document.getElementsByTagName('script'),
        base;
    for (var i = 0, length = scripts.length, pos; i < length; i++) {
        pos = scripts[i].src.indexOf('lib/sea');
        if (pos != -1) {
            base = scripts[i].src.substring(0, pos);
            if (base.indexOf('http') != 0) {
                base = /^.+\//.exec(location.href)[0] + base;
            }
            break;
        }
    }
    console.log("base:"+base);
    
seajs.config({
		base:base,
		//base:"js",
		//paths:{'tj':'http://127.0.0.1:8020/HTMLDEMO/js'},
		alias:{		
			'zepto':"lib/zepto.min1.1.6.js",
			'jquery':"lib/jquery.min.js",
			 $:'lib/jquery.min.js'
		},
		preload:['$']
	
     });


//});