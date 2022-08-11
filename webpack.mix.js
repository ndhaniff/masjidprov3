const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.extract(['react', '@mui/lab', '@mui/material', 'bootstrap', 'axios', 'tailwind.css'])
mix.js('resources/js/app.js', 'public/js')
    .react()
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
    ]);

mix.webpackConfig(require('./webpack.config'));
mix.disableNotifications()
if (mix.inProduction()) {
    mix.version();
}