"use strict";

const {src, dest} = require("gulp"); // отвечает за чтение файлов и за запис файлов
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer"); //отвечает за префиксы css свойств
const cssbeautify = require("gulp-cssbeautify"); // на выходе получался красивый css файл
const removeComments = require('gulp-strip-css-comments'); // для удаления комментариев из css
const rename = require("gulp-rename"); //меня название файла
const sass = require('gulp-sass')(require('sass')); //канпелятор саса в css
const cssnano = require("gulp-cssnano"); //сжимает файл css
const rigger = require("gulp-rigger"); //склеивает js файлы в один
const uglify = require("gulp-uglify"); //сжатие js файла
const plumber = require("gulp-plumber"); //чтобы не ломалось если будут ошибки
const imagemin = require('gulp-image'); //зажатие и оптмизация изображений
const del = require("del"); //очищает папку от ненужного
const panini = require("panini"); //работа с html с шаблонами
const browsersync = require("browser-sync").create(); //локалка
const webp = require('gulp-webp'); //работает с webp фото
const newer = require('gulp-newer');
const Parallax = require('parallax-js');

/* Paths */
var path = {
    build: {
        html: "dist/",
        js: "dist/assets/js/",
        css: "dist/assets/css/",
        images: "dist/assets/img/"
    },
    src: {
        html: "src/*.html",
        js: "src/assets/js/*.js",
        css: "src/assets/sass/style.scss",
        images: "src/assets/img/**/*.{jpg,png,svg,gif,ico,mp4,webp}"
    },
    watch: {
        html: "src/**/*.html",
        js: "src/assets/js/**/*.js",
        css: "src/assets/sass/**/*.scss",
        images: "src/assets/img/**/*.{jpg,png,svg,gif,ico,mp4,webp}"
    },
    clean: "./dist"
}



/* Tasks */
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./dist/"
        },
        port: 3000
    });
}

function browserSyncReload(done) {
    browsersync.reload();
}

function html() { //в каждом таске мы делаем функцию фун + название таска - указываем путь, что хотим считать и отправляем в конечную папку dist
    panini.refresh();

    return src(path.src.html, { base: "src/" })
        .pipe(plumber())  //добавляем плагины - каждый pipe это обращение к плагину
        .pipe(panini({
            root:       'src/',
            layouts:    'src/layouts/',
            partials:   'src/partials/',
            helpers:    'src/helpers/',
            data:       'src/data/'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css, { base: "src/assets/sass/" })
        .pipe(plumber())  //у плагинов есть иструкция
        .pipe(sass())
        .pipe(autoprefixer({
            Browserslist: ['last 8 versions'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))//создали красивый немодифицированный css
        .pipe(cssnano({ // теперь сжимаем его
            zindex: false, //чтобы не изменял z-index
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js, {base: './src/assets/js/'})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.images)
        .pipe(imagemin())
        .pipe(webp())
        .pipe(dest(path.build.images
            ));
}

function clean() {
    return del(path.clean);
}



function watchFiles() {  //делаем слежку за файлами
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images));
const watch = gulp.parallel(build, watchFiles, browserSync);



/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
