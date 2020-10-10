import gulp from 'gulp';
import ts from 'gulp-typescript';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import pug from 'gulp-pug';

import sass from 'gulp-sass';
import clean from 'gulp-purgecss';

const cacheBust = require('gulp-cache-bust');
import imageMin from 'gulp-imagemin';

import { init as server, stream, reload } from 'browser-sync';
import plumber from 'gulp-plumber';

const tsProject = ts.createProject('tsconfig.json');

gulp.task(
	'compile',
	(): NodeJS.ReadWriteStream => {
		return gulp
			.src('src/ts/*.ts')
			.pipe(plumber())
			.pipe(tsProject())
			.pipe(concat('scripts-min.js'))
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
	server({
		server: 'dist'
	});
	gulp.watch('src/ts/**/*.ts', gulp.series('compile')).on('chanage', reload);
	gulp.watch('src/views/**/*.pug', gulp.series('views')).on('change', reload);
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});
