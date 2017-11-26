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
    .copy( 'resources/assets/images', 'public/images', false )

    .js('resources/assets/js/app.js', 'public/js')

    //.sass('resources/assets/sass/app.scss', 'public/css')

    .styles([
        'resources/assets/css/system.base.css',
        'resources/assets/css/system.menus.css',
        'resources/assets/css/system.messages.css',
        'resources/assets/css/system.theme.css',

        'resources/assets/css/jquery.ui.core.min.css',
        'resources/assets/css/jquery.ui.theme.min.css',
        'resources/assets/css/jquery.ui.accordion.min.css',
        'resources/assets/css/jquery.ui.tabs.min.css',
        'resources/assets/css/simplenews.css',
        'resources/assets/css/comment.css',
        'resources/assets/css/field.css',
        'resources/assets/css/node.css',
        'resources/assets/css/search.css',
        'resources/assets/css/user.css',
        'resources/assets/css/views.css',

        'resources/assets/css/colorbox_style.css',
        'resources/assets/css/ctools.css',
        'resources/assets/css/nice_menus.css',
        'resources/assets/css/nice_menus_default.css',
        'resources/assets/css/jcarousel-default.css',
        'resources/assets/css/flexslider_img.css',
        'resources/assets/css/flexslider.css',
        'resources/assets/css/responsive_menus_simple.css',

        'resources/assets/css/alpha-reset.css',
        'resources/assets/css/alpha-mobile.css',
        'resources/assets/css/alpha-alpha.css',
        'resources/assets/css/formalize.css',
        'resources/assets/css/quatro-reset.css',
        'resources/assets/css/global.css',

        'resources/assets/css/purple-style.css',

        'resources/assets/css/style.css'
    ], 'public/css/style.css')

    .styles([
            'resources/assets/css/ie9_not_mobile/quatro-alpha-default-normal.css',
            'resources/assets/css/ie9_not_mobile/alpha-default-normal-16.css',
    ], 'public/css/ie9_not_mobile/style.css')

    .styles([
            'resources/assets/css/gte_ie9_980/quatro-alpha-default-normal.css',
            'resources/assets/css/gte_ie9_980/alpha-default-normal-16.css',
    ], 'public/css/gte_ie9_980/style.css')

    .styles([
            'resources/assets/css/gte_ie9_1220/quatro-alpha-default-wide.css',
            'resources/assets/css/gte_ie9_1220/alpha-default-wide-16.css',
    ], 'public/css/gte_ie9_1220/style.css')

;