var gulp = require("gulp");
var minifyCSS = require("gulp-csso");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var pump = require("pump");

var diretorioAlvo = "../build";

// Imagens:

gulp.task("imagens", function ()
{
    return gulp.src("imagens/*")
        .pipe(gulp.dest(diretorioAlvo + "/imagens"));
});

// Fontes:

gulp.task("fontes", function ()
{
    return gulp.src("fontes/**")
        .pipe(gulp.dest(diretorioAlvo + "/fontes"));
});

// Página index:

gulp.task("pagina-index-html", function ()
{
    return gulp.src("index.html")
        .pipe(gulp.dest(diretorioAlvo));
});

gulp.task("pagina-index-css", function ()
{
    return gulp.src([ "base.css", "index.css" ])
        .pipe(concat("index.css"))
        .pipe(minifyCSS({ restructure: true, sourceMap: false, debug: false }))
        .pipe(gulp.dest(diretorioAlvo));
});

gulp.task("pagina-index-js", function (cb)
{
    pump([
        gulp.src([ "base.js", "index.js" ]),
        concat("index.js"),
        gulp.dest(diretorioAlvo),
        uglify(),
        gulp.dest(diretorioAlvo)
    ], cb);
});

gulp.task("pagina-index", [
    "pagina-index-html",
    "pagina-index-css",
    "pagina-index-js"
]);

// Página index.logado:

gulp.task("pagina-index.logado-html", function ()
{
    return gulp.src("index.logado.html")
        .pipe(gulp.dest(diretorioAlvo));
});

gulp.task("pagina-index.logado-css", function ()
{
    return gulp.src([ "base.css", "index.logado.css" ])
        .pipe(concat("index.logado.css"))
        .pipe(minifyCSS({ restructure: true, sourceMap: false, debug: false }))
        .pipe(gulp.dest(diretorioAlvo));
});

gulp.task("pagina-index.logado-js", function (cb)
{
    pump([
        gulp.src([ "base.js", "index.logado.js" ]),
        concat("index.logado.js"),
        gulp.dest(diretorioAlvo),
        uglify(),
        gulp.dest(diretorioAlvo)
    ], cb);
});

gulp.task("pagina-index.logado", [
    "pagina-index.logado-html",
    "pagina-index.logado-css",
    "pagina-index.logado-js"
]);

// Página minhaConta:

gulp.task("pagina-minhaConta-html", function ()
{
    return gulp.src("paginas/minhaConta/minhaConta.html")
        .pipe(gulp.dest(diretorioAlvo + "/paginas/minhaConta"));
});

gulp.task("pagina-minhaConta-css", function ()
{
    return gulp.src([ "base.css", "paginas/minhaConta/minhaConta.css" ])
        .pipe(concat("minhaConta.css"))
        .pipe(minifyCSS({ restructure: true, sourceMap: false, debug: false }))
        .pipe(gulp.dest(diretorioAlvo + "/paginas/minhaConta"));
});

gulp.task("pagina-minhaConta-js", function (cb)
{
    pump([
        gulp.src([ "base.js", "paginas/minhaConta/minhaConta.js" ]),
        concat("minhaConta.js"),
        gulp.dest(diretorioAlvo + "/paginas/minhaConta"),
        uglify(),
        gulp.dest(diretorioAlvo + "/paginas/minhaConta")
    ], cb);
});

gulp.task("pagina-minhaConta", [
    "pagina-minhaConta-html",
    "pagina-minhaConta-css",
    "pagina-minhaConta-js"
]);

// Página gerenciarTimes:

gulp.task("pagina-gerenciarTimes-html", function ()
{
    return gulp.src("paginas/gerenciarTimes/gerenciarTimes.html")
        .pipe(gulp.dest(diretorioAlvo + "/paginas/gerenciarTimes"));
});

gulp.task("pagina-gerenciarTimes-css", function ()
{
    return gulp.src([ "base.css", "paginas/gerenciarTimes/gerenciarTimes.css" ])
        .pipe(concat("gerenciarTimes.css"))
        .pipe(minifyCSS({ restructure: true, sourceMap: false, debug: false }))
        .pipe(gulp.dest(diretorioAlvo + "/paginas/gerenciarTimes"));
});

gulp.task("pagina-gerenciarTimes-js", function (cb)
{
    pump([
        gulp.src([ "base.js", "paginas/gerenciarTimes/gerenciarTimes.js" ]),
        concat("gerenciarTimes.js"),
        gulp.dest(diretorioAlvo + "/paginas/gerenciarTimes"),
        uglify(),
        gulp.dest(diretorioAlvo + "/paginas/gerenciarTimes")
    ], cb);
});

gulp.task("pagina-gerenciarTimes", [
    "pagina-gerenciarTimes-html",
    "pagina-gerenciarTimes-css",
    "pagina-gerenciarTimes-js"
]);

// Página sairDaConta:

gulp.task("pagina-sairDaConta-html", function ()
{
    return gulp.src("paginas/sairDaConta/sairDaConta.html")
        .pipe(gulp.dest(diretorioAlvo + "/paginas/sairDaConta"));
});

gulp.task("pagina-sairDaConta-css", function ()
{
    return gulp.src([ "base.css", "paginas/sairDaConta/sairDaConta.css" ])
        .pipe(concat("sairDaConta.css"))
        .pipe(minifyCSS({ restructure: true, sourceMap: false, debug: false }))
        .pipe(gulp.dest(diretorioAlvo + "/paginas/sairDaConta"));
});

gulp.task("pagina-sairDaConta-js", function (cb)
{
    pump([
        gulp.src([ "base.js", "paginas/sairDaConta/sairDaConta.js" ]),
        concat("sairDaConta.js"),
        gulp.dest(diretorioAlvo + "/paginas/sairDaConta"),
        uglify(),
        gulp.dest(diretorioAlvo + "/paginas/sairDaConta")
    ], cb);
});

gulp.task("pagina-sairDaConta", [
    "pagina-sairDaConta-html",
    "pagina-sairDaConta-css",
    "pagina-sairDaConta-js"
]);

// Página 404:

gulp.task("pagina-404-html", function ()
{
    return gulp.src("paginas/404/404.html")
        .pipe(gulp.dest(diretorioAlvo + "/paginas/404"));
});

gulp.task("pagina-404-css", function ()
{
    return gulp.src([ "base.css", "paginas/404/404.css" ])
        .pipe(concat("404.css"))
        .pipe(minifyCSS({ restructure: true, sourceMap: false, debug: false }))
        .pipe(gulp.dest(diretorioAlvo + "/paginas/404"));
});

gulp.task("pagina-404-js", function (cb)
{
    pump([
        gulp.src([ "base.js", "paginas/404/404.js" ]),
        concat("404.js"),
        gulp.dest(diretorioAlvo + "/paginas/404"),
        uglify(),
        gulp.dest(diretorioAlvo + "/paginas/404")
    ], cb);
});

gulp.task("pagina-404", [
    "pagina-404-html",
    "pagina-404-css",
    "pagina-404-js"
]);

// Terceiros:

gulp.task("terceiros", function ()
{
    return gulp.src("terceiros/**")
        .pipe(gulp.dest(diretorioAlvo + "/terceiros"));
});

gulp.task("paginas", [
    "pagina-index",
    "pagina-index.logado",
    "pagina-minhaConta",
    "pagina-gerenciarTimes",
    "pagina-sairDaConta",
    "pagina-404"
]);

gulp.task("tudo", [ "imagens", "fontes", "paginas", "terceiros" ]);

gulp.task("default", [ "tudo" ]);
