const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const reactify = require('reactify');

gulp.task('js', function() {
	var bundler = browserify({
		paths: [__dirname + "/htdocs/jsx", __dirname + "/htdocs/js"],
		entries: ['./htdocs/jsx/app.jsx'], // Only need initial file, browserify finds the deps
		transform: [reactify], // We want to convert JSX to normal javascript
		debug: true, // Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
	});

	return bundler.bundle().pipe(source('app.js')).pipe(gulp.dest('./htdocs/js/'));
});

gulp.task('watch', function() {
	gulp.watch('htdocs/jsx/**/*.jsx', ['js']);
});
