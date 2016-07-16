const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

const paths = {
  sass: './styles/**/*.scss'
}

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('styles'))
})

gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass'])
})
