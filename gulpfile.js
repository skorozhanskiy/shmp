// Основные модули
import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

// Глобальная переменная
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp,
  gulp,
  plugins: plugins,
};

// Импорт задач
import { copy } from './gulp/task/copy.js';
import { reset } from './gulp/task/reset.js';
import { html } from './gulp/task/html.js';
import { server } from './gulp/task/server.js';
import { copycss } from './gulp/task/css.js';
import { scss } from './gulp/task/scss.js';
import { js } from './gulp/task/js.js';
import { images } from './gulp/task/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/task/fonts.js';
import { svgSprive } from './gulp/task/svgSprive.js';
import { zip } from './gulp/task/zip.js';
// import { ftp } from "./gulp/task/ftp.js";

function watcher() {
  gulp.watch(path.watch.assets, copy, copycss);
  gulp.watch(path.watch.html, html); // для отправки файлов на сервер изменить строку на   	gulp.watch(path.watch.html, gulp.series(html,ftp)); так же нужно будет сделать со всеми файлами
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, copycss, html, scss, js, images));

// Построение сценариев выполнения задач
// const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher)); // сервер выключен
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // сервер включен
const build = gulp.series(reset, mainTasks); //Задачи для продакшина
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks); // изменить если есть сервер const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
// export { deployFTP }

// Сценарий по умолчанию без сервера
// gulp.task('default', dev);

// Сценарий по умолчанию с запуском сервера
gulp.task('default', dev);
