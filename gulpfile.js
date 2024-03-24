var gulp = require("gulp");
var fs = require('fs')


//move as views e cria pasta dbs para dentro da build
gulp.task("prepare-app", function () {
    return gulp.src("./src/views/**/*.ejs").pipe(gulp.dest("./build/views"));
}, 'createDBfolder');

gulp.task("createDBfolder", () => {
    const dir = '/build/dbs'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
})