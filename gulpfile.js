var gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("sass", function () {
  return (
    gulp
      .src("style.scss")
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(gulp.dest("styles"))
  );
});

gulp.task('watch', function() {
    gulp.watch('./style.scss', gulp.series(['sass']));
});
