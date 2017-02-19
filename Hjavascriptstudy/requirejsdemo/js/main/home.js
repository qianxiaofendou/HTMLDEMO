requirejs(
    ["./js/config.js"], function (config) {
        requirejs(['home2']);
        //console.log(config);
    });

define('home2',['jquery','bootstrap'],function($,bs){
	console.log('1.',$);
	//向div里面添加内容，同时添加一个样式（为了测试html5的classList,可以使用jquery的attr哈）
	$(".testT").html("requirejs配置成功啦！").get(0).classList.add("ddd");
});


requirejs(['./js/lib/c_1.js','./js/lib/c_2.js'],function(h,h2){
   h.hello();h2.c();
});