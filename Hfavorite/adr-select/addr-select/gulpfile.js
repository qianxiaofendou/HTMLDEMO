//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),  //使用此模块可以自动调用package.json里面安装的gup相关插件
    $ = gulpLoadPlugins();

var config = {
	dist:'./dist/scripts'
}
	gulp.task('cityes6', ['clean-js'],function() {
		gulp.src([
		"./js/city_arr.js",
		"./js/city_func.js"
		])
		.pipe($.concat('common.js'))          //合并后的文件名
		.pipe($.jshint())                     //js语法检查
		.pipe($.babel({presets:['es2015']}))  //由于js里面使用了es6的语法，需要转换为es5
		.pipe($.uglify())                     //压缩js代码
		.pipe(gulp.dest(config.dist))
	});

    //创建监听  控制台执行命令gulp watch 即可
	// gulp.task('watch', ['cityes6'], function() {
	//     gulp.watch(['./js/city_func.js'], ['cityes6']);
	// });

    //清楚目录下的文件
	gulp.task('clean-js',function(){
		return gulp.src(config.dist,{read:false})
		           .pipe($.clean())
	});

   /**
    * 控制台下面执行命令gulp
    * 1、执行任务依赖 cityes6 任务
    * 2、cityes6 该任务依赖 clean-js 任务
    * 3、执行顺序 clean-js>cityes6
    */
   gulp.task('default',['cityes6']);

   //优化写法
   //注意这种写法，在你的任务依赖里面就不需要依赖clean-js任务了
   // gulp.task('default',['clean-js'],function(){
   // 	gulp.start('cityes6','你的其他任务');
   // });