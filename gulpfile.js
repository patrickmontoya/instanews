const gulp = require("gulp"); // Load Gulp!
// Now that we've installed the uglify package we can require it:
const uglify = require("gulp-uglify");
const eslint = require('gulp-eslint');
  rename = require("gulp-rename");
  
  const sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano");
  
gulp.task("default", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});	

var browserSync = require('browser-sync').create();

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp
    .watch(['index.html', 'build/css/*.css', 'build/js/*.js', 'css/styles.css'])
    .on('change', browserSync.reload);
});

gulp.task('lint', function() {
 return gulp.src("./js/*.js").pipe(eslint({
   'rules':{
       'quotes': [1, 'single'],
       'semi': [1, 'always']
   }
 }))
 
 .pipe(eslint.format())
 // Brick on failure to be super strict
 .pipe(eslint.failOnError());
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/style.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});