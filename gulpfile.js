'use strict';

const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const babel = require('gulp-babel');
const del = require('del');

const lib = 'lib';
const dist = 'dist';
const src = './src/**/*.js';

gulp.task('clean-lib', function() {
  return del([lib]);
});

gulp.task('clean-dist', function() {
  return del([dist]);
});

gulp.task('node-lib', ['clean-lib'], function () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest(lib));
});

gulp.task('browser-dist', ['clean-dist', 'node-lib'], function() {
  gulp.src([])
    .pipe(webpackStream({
      entry: {
        ['dzhyun-vue-data']: './src/index.js',
        ['dzhyun-vue-data.min']: './src/index.js',
      },
      output: {
        filename: '[name].js',
        library: 'DzhyunVueData',
        libraryTarget: 'umd',
      },
      externals: {
        dzhyunjs: 'Dzhyun',
        vue: 'Vue',
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
          minimize: true
        }),
      ],
      devtool: 'source-map',
    }, webpack))
    .pipe(gulp.dest(dist));
});

gulp.task('default', ['node-lib', 'browser-dist']);
