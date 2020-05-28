var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
const imagemin = require('gulp-imagemin');

gulp.task('sass',function(){
     return gulp.src('./dev/sass/*.scss')
     .pipe(sass().on('error',sass.logError))
     .pipe(gulp.dest('./dest/css'))//注意根路徑設定 gulp 有時候會catch住就不會及時改動產生資料夾
})

gulp.task('watch', function(){//ctrl+c 停止watch
    gulp.watch('./dev/sass/*.scss',['sass'])
    gulp.watch('./dev/*.html',['move'])
})


// 壓圖
gulp.task('miniimg',function(){
    gulp.src('./dev/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images'))
  })  

//html樣板
gulp.task('fileinclude', function() {
    gulp.src(['dev/*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./dest'));//注意根路徑
  });

  
  //流程完全整合
gulp.task('default', function() {//即時更新網頁
    browserSync.init({
        server: {
            baseDir: "./dest",
            index : "index.html"
        }
    });
    gulp.watch('./dev/sass/*.scss',['sass']).on('change',reload);
    gulp.watch(['./dev/*.html','./dev/**/*.html'] ,['fileinclude']).on('change',reload);//'./**/*.html'抓APP位置的html
 });