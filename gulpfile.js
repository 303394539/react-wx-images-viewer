const gulp = require('gulp');
const clean = require('gulp-clean');

const babel = require('gulp-babel');
const terser = require('gulp-terser');

gulp.task('publish:clean', () => {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

// 编译 js 文件
gulp.task('publish:js', ['publish:clean'], () => {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe(babel({
      presets: ['es2015', 'stage-1', 'react'],
    }))
    .pipe(
      terser({
        compress: {
          drop_console: true,
        },
      }),
    )
    .pipe(gulp.dest('dist'));
});

// 发布 css 文件
gulp.task('publish:css', ['publish:clean'], () => {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('dist'));
});

// 打包发布 npm
gulp.task('default', ['publish:clean', 'publish:js', 'publish:css']);
