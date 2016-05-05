'use strict';
let aws = require('./env.json');
let gzip = require('gulp-gzip');
let s3 = require('gulp-s3-ls');
let gulp = require('gulp');


gulp.task('s3', () => {
    const opts = {
        gzippedOnly: true,
        headers: {
            'Cache-Control': 'max-age=315360000, no-transform, public',
            'x-amz-acl': 'public-read'
        }
    };

    return gulp.src([
            'public/**',
            '!**/.DS_Store',
            '!**/thumbs.db',
            '!**/.htaccess'
        ])
        .pipe(gzip())
        .pipe(s3(aws, opts));
});
