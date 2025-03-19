const { src, dest, series, watch } = require('gulp');
const minifyJs = require('gulp-uglify');
const concat = require('gulp-concat');

const bundleAndMinifyJs = () => {
  return src([
    'src/**.js',
    '!src/index.js'
  ])
    .pipe(minifyJs())
    .pipe(concat('bundle.js'))
    .pipe(dest('./build/'));
};

const build = () => {
  return bundleAndMinifyJs()
};
exports.build = build;

const dev = () => {
  watch([
    'src/**.js',
    '!src/index.js'
  ],
    series(bundleAndMinifyJs)
  );
};
exports.dev = dev;
// exports.default = series(build,dev);
