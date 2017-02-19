define(function(require,exports,module){
	
	exports.hello = function(){
		var a = "你好哈，亲！^-^ 简单包装CommonJS来定义模块：define(function(require, exports, module)";
		//var c = require("swiper");  //用来加载其他已定义模块
		console.log("此模块的id是："+module.id);
		
		/**
		 * 调用配置文件中config{}里面的定义
		 */
		// console.log(module.config().c_1);   
		h(a);
	}
	
	function h(h){
		console.log(h);
	}
	
});
