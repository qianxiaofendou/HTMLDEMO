//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),  //使用此模块可以自动调用package.json里面安装的gup相关插件
    $ = gulpLoadPlugins();


	gulp.task('cityes6', function() {
		gulp.src([
		"./js/city_arr.js",
		"./js/city_func.js"
		])
		.pipe($.concat('common.js'))          //合并后的文件名
		.pipe($.jshint())                     //js语法检查
		.pipe($.babel({presets:['es2015']}))  //由于js里面使用了es6的语法，需要转换为es5
		.pipe($.uglify())                     //压缩js代码
		.pipe(gulp.dest('./dist/scripts'))
	});

    //创建监听  控制台执行命令gulp watch 即可
	gulp.task('watch', ['cityes6'], function() {
	    gulp.watch(['./js/city_func.js'], ['cityes6']);
	});