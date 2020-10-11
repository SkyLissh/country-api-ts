const gulp = require('gulp');
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const clean = require('gulp-purgecss');

const cacheBust = require('gulp-cache-bust');
const imageMin = require('gulp-imagemin');

const { init, stream, reload } = require('browser-sync');
const plumber = require('gulp-plumber');

const tsProject = ts.createProject('tsconfig.json');

gulp.task(
	'compile',
	(): NodeJS.ReadWriteStream => {
		return gulp
			.src('src/ts/**/*.ts')
			.pipe(plumber())
			.pipe(tsProject())
			.pipe(terser())
			.pipe(gulp.dest('dist/js'));
	}
);

gulp.task(
	'views',
	(): NodeJS.ReadWriteStream => {
		return gulp
			.src('src/views/pages/*.pug')
			.pipe(plumber())
			.pipe(pug())
			.pipe(cacheBust({ type: 'timestamp' }))
			.pipe(gulp.dest('dist'));
	}
);

gulp.task(
	'sass',
	(): NodeJS.ReadWriteStream => {
		return gulp
			.src('src/sass/styles.scss')
			.pipe(plumber())
			.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
			.pipe(stream())
			.pipe(gulp.dest('dist/css'));
	}
);

gulp.task(
	'clean-css',
	(): NodeJS.ReadWriteStream => {
		return gulp
			.src('dist/css/styles.css')
			.pipe(plumber())
			.pipe(clean({ content: ['dist/**/*.html'] }))
			.pipe(gulp.dest('dist/css'));
	}
);

gulp.task(
	'image-min',
	(): NodeJS.ReadWriteStream => {
		return gulp
			.src('src/images/*')
			.pipe(plumber())
			.pipe(
				imageMin([
					imageMin.gifsicle({ interlaced: true }),
					imageMin.mozjpeg({ quality: 30, progressive: true }),
					imageMin.optipng({ optimizationLevel: 1 })
				])
			)
			.pipe(gulp.dest('dist/images'));
	}
);

gulp.task('default', (): void => {
	init({
		server: 'dist'
	});
	gulp.watch('src/ts/**/*.ts', gulp.series('compile')).on('change', reload);
	gulp.watch('src/views/**/*.pug', gulp.series('views')).on('change', reload);
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});
