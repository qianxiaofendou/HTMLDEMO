define(["jquery","js/lib/c_3.js"],function($,c3){
	//var $ = Zepto;
	c3.hello();
	return{
		a:function(){
			console.log($);
			//console.log(require(zepto));
		},
		c:function(){
			$("#c2").html('我(c_2.js)的定义方式是：define(["zepto"],function(zepto){');
		}
	};
	
	
	
});
