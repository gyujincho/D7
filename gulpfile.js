var gulp = require("gulp");
var webpack = require("webpack-stream");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var nodemon = require("gulp-nodemon");
var eslint = require("gulp-eslint");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");

var paths = {
  include: {
    server: ["server/**/*.js"],
    client: ["client/**/*.js", "client/**/*.html", "client/**/*.css"]
  },
  exclude: {
    server: ["!node_modules/**"],
    client: ["!client/bundle.js", "!client/helpers/*.js"]
  }
};

gulp.task("babel", () => {
  gulp.src(paths.include.server)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

gulp.task("webpack", () => {
  return gulp.src("./client/index.js")
  .pipe(webpack(require("./webpack.config.js")))
  .pipe(gulp.dest("./client/"));
});

gulp.task("sass", () => {
  return gulp.src("client/assets/scss/*.scss")
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest("client/assets/css"));
});

gulp.task("eslint", () => {
  return gulp.src(paths.include.server.concat(paths.include.client.slice(0, 1)).concat(paths.exclude.server).concat(paths.exclude.client))
  .pipe(eslint({
    rules: {
      quotes: [1, "double"],
      semi: [1, "always"],
      indent: ["error", 2]
    },
    parser: "babel-eslint"
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(paths.include.server.concat(paths.exclude.server), ["babel"]);
  gulp.watch(paths.include.client.concat(paths.exclude.client), ["webpack"]);
  gulp.watch(paths.include.server.concat(paths.exclude.server), ["eslint"]);
  gulp.watch("client/assets/scss/*.scss", ["sass"]);
});

gulp.task("start", () => {
  nodemon({
    script: "build/server.js",
    watch: ["**/*"]
  });
});

gulp.task("default", ["eslint", "babel", "webpack", "sass", "watch", "start"]);
