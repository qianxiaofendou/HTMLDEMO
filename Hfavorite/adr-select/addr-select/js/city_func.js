function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}
var residency_hukou_flag=0;	// 居住地 / 户口所在地   开关
// var residency = {
// 	// 居住地输出
// 	Show : function(){
// 		var k=0;
// 		var Div=new Array('maincity','allProv');
// 		while(k<=1){
// 			var output='<h4>主要城市：</h4>';
// 			var arr=maincity,area;
// 			if(k==1){
// 				output='<h4>主要城市：</h4>';
// 				arr=allprov;
// 			}
// 			for (var i in arr){
// 				area=arr[i][0];
// 				output+='<dl><dt>'+area+'</dt><dd>';
// 				for (var j in arr[i][1] ){
// 					id=arr[i][1][j];
// 					if(k==0){
// 						output+='<li onclick="residency.Chk(\''+id+'\')">'+ja[id]+'</li>';
// 					}else{
// 						if(area=='其它') output+='<li onclick="residency.Chk(\''+id+'\')">'+ja[id]+'</li>';
// 						else output+='<li onclick="residency.SubLayer(\''+id+'\')">'+ja[id]+'</li>';
// 					}
// 				}
// 				output+='</dd></dl>';
// 			}
// 			$('#'+Div[k]).html(output);
// 			k++;
// 		}
// 		$('#drag').width('650px');
// 		// 鼠标悬停变色
// 		$('#residencyAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass()});
// 		// 点击弹出子菜单
// 		$('#allProv li').click(function(e){$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
// 	},
// 	// 所有省份 下拉 城市菜单
// 	SubLayer : function(id){
// 		var output='<div id="sub_city">',width,ischecked,key;
// 		var arr=getAreaIDs(id);
// 			width=Math.ceil(Math.sqrt(arr.length-1))*60;
// 		output+='<ul style="width:'+width+'px"><h4 onclick="residency.Chk(\''+id+'\')"><a href="javascript:">'+ja[id]+'</a></h4>';
// 		for (var i=1;i<arr.length;i++){
// 			key=arr[i];
// 			output+='<li><a href="javascript:" onclick="residency.Chk(\''+key+'\')">'+ja[key]+'</a></li>';
// 		}
// 		output=output+'</ul></div>';
// 		$("#sublist").html(output).show();
// 	},


// 	Chk : function(id){
// 		if(residency_hukou_flag==0){
// 			$('#btn_residency').val(ja[id]);
// 			$('#residency').val(id);
// 		}else{
// 			$('#btn_hukou').val(ja[id]);
// 			$('#hukou').val(id);
// 		}
// 		$("#sublist").hide().empty();
// 		boxAlpha();
// 	}
// }
	
// function residencySelect(){
// 	residency_hukou_flag=0;
// 	var dragHtml ='<div id="residencyAlpha">';		//居住地
// 		dragHtml+='		<div id="maincity"></div>';	//主要城市
// 		dragHtml+='		<div id="allProv"></div>';	//所有省市
// 		dragHtml+='</div>';
// 	$('#drag_h').html('<b>请选择居住地</b><span onclick="boxAlpha()">关闭</span>');
// 	$('#drag_con').html(dragHtml);
// 	residency.Show();
// 	boxAlpha();
// 	draglayer();
// }
// function hukouSelect(){
// 	residency_hukou_flag=1;
// 	var dragHtml ='<div id="residencyAlpha">';		//居住地
// 		dragHtml+='		<div id="maincity"></div>';	//主要城市
// 		dragHtml+='		<div id="allProv"></div>';	//所有省市
// 		dragHtml+='</div>';
// 	$('#drag_h').html('<b>请选择户口所在地</b><span onclick="boxAlpha()">关闭</span>');
// 	$('#drag_con').html(dragHtml);
// 	residency.Show();
// 	boxAlpha();
// 	draglayer();
// }


/* **************************************************************************** */

var jobArea_Arr = new Array();
//var jobArea_Arr = new Array('0100','0200','2402');

window.jobArea = {
	// 请选择地区
	init : function(){
		var _str='',_id='';
		if (jobArea_Arr.length>0){
			for (var i in jobArea_Arr){
				_str+=','+ja[jobArea_Arr[i]];
				_id+=','+jobArea_Arr[i];
			}
			// $('#btn_jobArea').val(_str.substring(1));
			$('#jobAreaID').val(_id.substring(1));

		}
	},
	Show : function(data){
		var k=0,output='',output2='',arr,area,select_ed;
		var Div		= new Array('maincity2','allProv2');
		var Title	= new Array('<h4 class="country-title">中国</h4>','<h4 class="country-title">国外</h4>');
		var LoopArr	= new Array(allprov,maincity);
		//北京、上海、天津、重庆、香港、澳门、台湾无下拉框
		var singleProv ='100005000,100009000,100001000,100031000,100034000,100025000,100006000';
        
        if(data && data.length>0){
        	jobArea_Arr = data.split(",");
        	//初始化已有数据 表单域
			$('#jobAreaID').val(data);

        }

		for(var i in jobArea_Arr){
			output2+='<li class="jobArea'+jobArea_Arr[i]+' chkON" onclick="jobArea.Chk(\''+jobArea_Arr[i]+'\')">'+ja[jobArea_Arr[i]]+'</li>';
		}
		//初始化 数据 用户可见
		$('#jobAreSelected dd').html(output2);

		if(jobArea_Arr.length>12){
           $('#jobAreSelected').height('auto');
		}else{
			$('#jobAreSelected').height("50px");
		}

		while(k<=1){
			output	= Title[k];
			//output	= '';
			arr		= LoopArr[k]
			for (var i in arr){
				area=arr[i][0];
				if(k==0){					
					output+='<dl><dt>'+area+'</dt><dd>';
				}else{
					output+='<dl style="display:none;"><dd>';					
				}
				for (var j in arr[i][1] ){
					let id=arr[i][1][j];
					let isSelect = '';
					if(jobArea_Arr && jobArea_Arr.length > 0){
						if(jobArea_Arr.includes(id)) isSelect = ' chkON';
					}
					if(k==0){
						//select_ed=in_array(id,jobArea_Arr)?' chkON':'';
						//output+='<li class="jobArea'+id+select_ed+'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
						if(singleProv.indexOf(id)!=-1) output+='<li class="jobArea'+id+ '' + isSelect + '" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
						else output+='<li style="position:relative;" id="'+ id + '" class="' + isSelect +'" onclick="jobArea.SubLayer2(\''+id+'\')">'+ja[id]+'<span></span><div style="display:none;position:absolute;z-index:6000;background-color:#fff;box-shadow: 0 6px 12px rgba(0,0,0,.175);">'+jobArea.SubLayer(id)+'</div></li>';
					}else{
                        output+='<li class="jobArea'+id + '' + isSelect +'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
					}
				}
				output+='</dd></dl>';
			}
			
			$('#'+Div[k]).html(output);
			k++;
		}

		//国外数据初始化隐藏状态
		$('#allProv2 h4').on('click',function(){
			$(this).next().toggle();
		});
		$('#drag').width('505px');
		// 鼠标悬停变色
		//$('#jobAreaAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
		// 点击弹出子菜单
		$('#maincity2 li').click(function(e){            
			//$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()});
			//$("#sublist").hover(function(){$(this).show()},function(){$(this).hide()});
			$(this).children("div").hover(function(){$(this).show()},function(){$(this).hide()});

		})

		$('#maincity2 dl').each(function(index,item){
			if($(item).children('dd').children('li').length && $(item).children('dd').children('li').length>5){
                $(item).css('height','65px');
                $(item).find('dd').css('marginLeft','80px');
			}
			
		})
        var _this = this;
		$('#maincity2 dl ul').each(function(index,item){
           var tmp_main = $(item).find('h4>a').hasClass('chkON');
           if(tmp_main){
           	  // $(item).parent().parent().prev('span').text('all');
           }else{
              var sub_child_num = $(item).find('a.chkON').length || 0;
              var current_child_num = $(item).children('li').length || 0;
              if(sub_child_num > 0){
              	_this.CitySelected($(item).parent().parent().prev('span'),'1',sub_child_num+'/'+current_child_num);
              }
           }
           tmp_main = false;
		})
	},
	CitySelected:function(dom,type,msg){
		if(!type) return;
		if(type == '1'){
			if(dom.hasClass('subchildselected')){
				dom.text(msg);
			}else{
				dom.addClass('subchildselected').text(msg);
			}
		}else if(type == '2'){
			if(dom.hasClass('subchildselected')){
				dom.removeClass('subchildselected');
			}
			dom.empty();
		}
	},
	SubLayer2:function(id){
       $("#"+id+" div").show();
	},
	// 所有省份 下拉 城市菜单
	SubLayer : function(id){
		$('#maincity2 li>div').hide();
		var output='<div id="sub_jobArea">',
		    width,
		    select_ed,
		    key;
		    select_ed=in_array(id,jobArea_Arr)?' chkON':'';
		var arr=getAreaIDs(id);
			width=Math.ceil(Math.sqrt(arr.length-1))*60;
		    output+='<ul style="width:'+width+'px"><h4 onclick="jobArea.Chk(\''+id+'\')">';
		    output+='<a href="javascript:" class="jobArea' + id + select_ed +'">'+ja[id]+'</a></h4>';

		for (var i=1;i<arr.length;i++){
			key=arr[i];
			select_ed=in_array(key,jobArea_Arr)?' chkON':'';
			output+='<li><a href="javascript:" class="jobArea' + key + select_ed +'" onclick="jobArea.Chk(\''+key+'\')">'+ja[key]+'</a></li>';
		}
		output=output+'</ul></div>';
		return output;
		//$("#sublist").html(output).show();
		// $("#"+id+" div").html(output).show();
	},


	Chk : function(id){
		var _this = this;
		//北京、上海、天津、重庆、香港、澳门、台湾无下拉框
		var singleProv ='100005000,100009000,100001000,100031000,100034000,100025000,100006000';
		if(!in_array(id,jobArea_Arr)){
			var subArea,myid,isSub;
			var $maincity2 = $("#maincity2 .jobArea"+id).parent().parent().parent().parent().parent();
			if(id.substr(6)=='000'){	// 选中父类清除子类
				isSub = false;
				subArea=getAreaIDs(id);
				for(var i in subArea){
					if(in_array(subArea[i],jobArea_Arr)) this.del(subArea[i]);
				}
				if(!singleProv.includes(id)){					
					if($maincity2){
                       $maincity2.addClass('chkON');						
					}
				}
			}else{	// 选中子类清除父类
				isSub = true;
				myid=id.substr(0,6)+'000';
				if(in_array(myid,jobArea_Arr)) this.del(myid);
				if(!singleProv.includes(myid)){
					if($maincity2){
                       $maincity2.removeClass('chkON');                       
					}
				}
			};
				jobArea_Arr[jobArea_Arr.length]=id;
				var html='<li class="jobArea'+id+'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
				$('#jobAreaID').val(jobArea_Arr);
				if(jobArea_Arr.length>12){
                   // var tleng = (Math.ceil(jobArea_Arr.length/8)-1)*20+40+"px";
                   $('#jobAreSelected').height('auto');
				}else{
					$('#jobAreSelected').height("40px");
				}
				$('#jobAreSelected dd').append(html);
				$('.jobArea'+id).addClass('chkON');

				if(isSub){
					var sub_child_num = $maincity2.find('#sub_jobArea ul').find('a.chkON').length || 0;
					var current_child_num = $maincity2.find('#sub_jobArea ul').children('li').length || 0;
					if(sub_child_num>0){
						 _this.CitySelected($maincity2.children('span'),'1',sub_child_num+'/'+current_child_num);
					}else{
						_this.CitySelected($maincity2.children('span'),'2');
					}
				}else{
					_this.CitySelected($maincity2.children('span'),'2');
				}
				
				//$('#jobAreSelected li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
			
		}else{
			if(!singleProv.includes(id)){
				var $maincity2 = $("#maincity2 .jobArea"+id).parent().parent().parent().parent().parent();
				if($maincity2){
                   $maincity2.removeClass('chkON');
				}
			}		
			this.del(id);
		}
	},
	del : function(id){	
		var _this = this,isSub;
		var $maincity2 = $("#maincity2 .jobArea"+id).parent().parent().parent().parent().parent();
		if(id.substr(6)=='000'){	// 选中父类
			isSub = false;
		}else{                      //选中子类
            isSub = true;
		}		

		for (var i in jobArea_Arr){
			if(jobArea_Arr[i]==id) jobArea_Arr.splice(i,1);;
		}
		// console.log(jobArea_Arr.length);		
		$('#jobAreaID').val(jobArea_Arr);
		$('#jobAreSelected .jobArea'+id).remove();
		$('.jobArea'+id).removeClass('chkON');
		if(isSub){
			var sub_child_num = $maincity2.find('#sub_jobArea ul').find('a.chkON').length || 0;
			var current_child_num = $maincity2.find('#sub_jobArea ul').children('li').length || 0;
			if(sub_child_num>0){
				 _this.CitySelected($maincity2.children('span'),'1',sub_child_num+'/'+current_child_num);
			}else{
				 _this.CitySelected($maincity2.children('span'),'2');
			}
		}else{
			_this.CitySelected($maincity2.children('span'),'2');
		}

		if(jobArea_Arr.length>12){
           // var tleng = (Math.ceil(jobArea_Arr.length/8)-1)*20+40+"px";
           $('#jobAreSelected').height('auto');
		}else{
			$('#jobAreSelected').height("40px");
		}
	},
	// 确定
	confirm : function(){
		var areaStr='';
		for(var i in jobArea_Arr){
			areaStr+=','+ja[jobArea_Arr[i]];
		}
		areaStr=areaStr.substring(1)?areaStr.substring(1):'请选择地区'; 
		//$('#btn_jobArea').val(areaStr);
		$('#jobAreaID').val(jobArea_Arr);
		//boxAlpha();
		$('#jobAreSelected dd').empty();
	}
}

function jobAreaSelect(data){
	var dragHtml ='<div id="jobAreaAlpha">';		//地区
		dragHtml+='		<dl id="jobAreSelected"><dt>已选地点：</dt><dd></dd></dl>';
		dragHtml+='		<div id="maincity2"></div>';//主要城市
		dragHtml+='		<div id="allProv2"></div>';	//所有省市
		dragHtml+='</div>';
	$('#drag_h').html('<span onclick="jobArea.confirm()">确定</span>');
	$('#drag_con').html(dragHtml);

	jobArea.Show(data);
	//boxAlpha();
	//draglayer();
}

window.jobAreaSelect = jobAreaSelect;
