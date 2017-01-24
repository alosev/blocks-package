var gulp = require('gulp'); // сам gulp
var sass = require('gulp-sass'); // sass
var pug = require('gulp-pug'); // jade/pug
var autoprefixer = require('gulp-autoprefixer'); // автопрефекс
var spritesmith = require('gulp.spritesmith'); // спрайты


gulp.task('pug', function(){
    gulp.src('src/jade/*.+(jade|pug)')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('dist'));
    gulp.src('src/blocks/**/index.+(jade|pug)')
        .pipe(pug({pretty: true, basedir: './'}))
        .pipe(gulp.dest('dist/blocks'));
});

gulp.task('sass', function(){
    gulp.src('src/sass/*.+(sass|scss)')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 10 version', 'ie 9']}))
        .pipe(gulp.dest('dist/css'));
    gulp.src('src/blocks/**/*.+(sass|scss)')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 10 version', 'ie 9']}))
        .pipe(gulp.dest('dist/blocks'));
});

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('src/blocks/**/*.js')
        .pipe(gulp.dest('dist/blocks'));
});

gulp.task('images', function() {
    gulp.src('src/images/*.+(png|jpg|jpeg|gif)')
        .pipe(gulp.dest('dist/images'));
    gulp.src('src/blocks/**/*.+(png|jpg|jpeg|gif)')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('src/images/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_variables.scss',
            cssFormat: 'scss',
            algorithm: 'binary-tree',
            cssTemplate: 'custom.scss.handlebars',
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name
            }
        }));
    spriteData.img.pipe(gulp.dest('src/images/'));
    spriteData.css.pipe(gulp.dest('src/sass/sprite/'));
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.+(sass|scss)', ['sass']); // Отслеживаем файлы sass
    gulp.watch('src/**/*.+(jade|pug)', ['pug']); // Отслеживаем файлы pug
    gulp.watch('src/**/*.js', ['js']); // Отслеживаем файлы js
    gulp.watch('src/**/*.+(png|jpg|jpeg|gif)', ['images']); // Отслеживаем файлы png/jpeg
    gulp.watch('src/fonts/**/*.*', ['fonts']); // Отслеживаем файлы шрифтов
    gulp.watch('src/images/sprite/*.png', ['sprite']); // Отслеживаем файлы sprite/png
});

gulp.task('default', ['watch']);