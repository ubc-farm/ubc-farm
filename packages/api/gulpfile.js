const gulp = require('gulp'),
	//rev = require('gulp-rev'),
	
	postcss = require('gulp-postcss'),
	cssimport = require('postcss-import'),
	cssvars = require('postcss-css-variables'),
	
	imagemin = require('gulp-imagemin'),
	
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify')
	
const path = require('path');
const outputPath = 'static' //process.env.WWW_STATIC || 'static';
//const manifestPath = process.env.REV_MANIFEST;
//const manifestFolder = path.dirname(manifestPath);

/** 
 * Compile CSS with postcss-import and postcss-css-variables,
 * then output to the static folder.
 */
gulp.task('styles', () => {
	return gulp.src([
		'./styles/**.css',
		'!./styles/utils/*.css'
	], {base: './styles'})
		.pipe(postcss([cssimport(), cssvars()]))
		.pipe(gulp.dest(path.join(outputPath, 'css')))
})

/**
 * Minify JavaScript files then put in js static folder
 */
gulp.task('main-js', () => {
	return gulp.src([
		'./frontend/**.js',
		'!./frontend/typings/**',
		'!./frontend/demo/**',
		'!./frontend/workers/sw.js'
	], {base: './frontend'})
		.pipe(uglify())
		.pipe(gulp.dest(path.join(outputPath, 'js')))
})

/** Minify sw.js and put it in root */
gulp.task('sw', () => {
	return gulp.src('./frontend/workers/sw.js')
		.pipe(uglify())
		.pipe(gulp.dest(path.join(outputPath, 'root')))
})

/** Run all frontend script related tasks */
gulp.task('scripts', ['main-js', 'sw']);
	
/** Minify images and copy to static */
gulp.task('images', () => {
	return gulp.src('./assets/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest(path.join(outputPath, 'assets/images')))
})

/** Copy misc assets to root folder */
gulp.task('misc-assets', () => {
	return gulp.src('./assets/misc/**', {buffer: false})
		.pipe(gulp.dest(path.join(outputPath, 'root')))
})

/** Copy other assets to static folder */
gulp.task('other-assets', () => {
	return gulp.src([
		'./assets/**',
		'!./assets/images/**',
		'!./assets/misc/**'
	])
		.pipe(gulp.dest(path.join(outputPath, 'assets')))
})

/** Run all asset related tasks */
gulp.task('assets', ['images', 'misc-assets', 'other-assets']);

gulp.task('watch', () => {
	gulp.watch([
		'./frontend/**.js',
		'!./frontend/typings/**',
		'!./frontend/demo/**',
		'!./frontend/workers/sw.js'
	], ['main-js']);
	gulp.watch('./frontend/workers/sw.js', ['sw']);
	gulp.watch('./assets/images/**', ['images']);
	gulp.watch('./assets/misc/**', ['misc-assets']);
	gulp.watch([
		'./assets/**',
		'!./assets/images/**',
		'!./assets/misc/**'
	], ['other-assets']);
})