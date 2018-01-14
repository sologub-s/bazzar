let mix = require('laravel-mix');

let ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;

mix.webpackConfig( {
    plugins: [
        new ImageminPlugin( {
//            disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: '95-100',
            },
            test: /\.(jpe?g|png|gif|svg)$/i,
        } ),
    ],
} )

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

mix
    .options({
        processCssUrls: false
    })
    .copy( 'resources/assets/images', 'public/images', false )
    .copy('node_modules/font-awesome/fonts', 'public/fonts', false)

    .babel([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/swiper/dist/js/swiper.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',

        'resources/assets/js/app.js'
    ], 'public/js/script.js')

    .sass('resources/assets/sass/bootstrap-btn.scss', './../resources/assets/css')
    .sass('resources/assets/sass/custom.scss', './../resources/assets/css')

    .styles([
        'resources/assets/css/system.base.css',
        'resources/assets/css/system.messages.css',
        'resources/assets/css/formalize.css',
        'resources/assets/css/quatro-reset.css',
        'resources/assets/css/global.css',
        'resources/assets/css/purple-style.css',
        'node_modules/swiper/dist/css/swiper.css',
        'resources/assets/css/bootstrap-btn.css',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
        'node_modules/animate.css/animate.css',
        'node_modules/font-awesome/css/font-awesome.css',

        'resources/assets/css/custom.css'
    ], 'public/css/style.css')

;