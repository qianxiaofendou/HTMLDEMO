
define(function(require, exports,module) {
	
   //var $ = require('zepto'),$=Zepto; 
   var $ = require('$'),$ = jQuery; 
   console.log($);

  exports.hello=function(){
  	//alert("dd");
  	
  	$("#ad").html("我跑起来啦！");
  	var mm = $("div").next();
  	console.log(mm.html());
  	console.log(module.id);
  }
});