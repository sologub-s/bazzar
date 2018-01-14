<!DOCTYPE html>
<html lang="ru" dir="ltr" version="HTML+RDFa 1.1" xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://ogp.me/ns#" xmlns:article="http://ogp.me/ns/article#" xmlns:book="http://ogp.me/ns/book#" xmlns:profile="http://ogp.me/ns/profile#" xmlns:video="http://ogp.me/ns/video#" xmlns:product="http://ogp.me/ns/product#" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/terms/" xmlns:foaf="http://xmlns.com/foaf/0.1/" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:sioc="http://rdfs.org/sioc/ns#" xmlns:sioct="http://rdfs.org/sioc/types#" xmlns:skos="http://www.w3.org/2004/02/skos/core#" xmlns:xsd="http://www.w3.org/2001/XMLSchema#">

<head profile="http://www.w3.org/1999/xhtml/vocab">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="https://bazzar.com.ua/misc/favicon.ico" type="image/vnd.microsoft.icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <meta property="og:site_name" content="Сравнение цен в Украине" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bazzar.com.ua/" />
    <meta property="og:title" content="Сравнение цен в Украине" />
    <meta property="og:description" content="Найди то, что тебе нужно по самой оптимальной цене!!!" />
    <title>Сравнение цен в Украине | Найди то, что тебе нужно по самой оптимальной цене!!!</title>

    {{-- @include('shared.header-dev') --}}
    @include('shared.header-prod')

    <script async src="https://static.addtoany.com/menu/page.js"></script>

    <script>
        window.Laravel = {!! json_encode([
                'csrfToken' => csrf_token(),
        ]); !!}
    </script>

    <script type="text/javascript" src="/js/script.js?v=1.2"></script>


    {{--
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/jquery_update/replace/jquery/1.8/jquery.min.js?v=1.8.3"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/misc/jquery.once.js?v=1.2"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/misc/drupal.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/jquery_update/replace/ui/ui/minified/jquery.ui.core.min.js?v=1.10.2"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/jquery_update/replace/ui/ui/minified/jquery.ui.widget.min.js?v=1.10.2"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/nice_menus/js/jquery.bgiframe.js?v=2.1"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/nice_menus/js/jquery.hoverIntent.js?v=0.5"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/nice_menus/js/superfish.js?v=1.4.8"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/nice_menus/js/nice_menus.js?v=1.0"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/jquery_update/replace/ui/ui/minified/jquery.ui.accordion.min.js?v=1.10.2"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/jquery_update/replace/ui/ui/minified/jquery.ui.tabs.min.js?v=1.10.2"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/default/files/languages/ru_rfvRusY_ByZmBNfd8z1iVQ1tIIFfQxmVhFV4gKl1a7c.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/libraries/colorbox/jquery.colorbox-min.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/colorbox/js/colorbox.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/colorbox/styles/default/colorbox_style.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/floating_block/floating_block.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/jcarousel/js/jquery.jcarousel.min.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/jcarousel/js/jcarousel.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/libraries/flexslider/jquery.flexslider-min.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/modules/responsive_menus/styles/responsive_menus_simple/js/responsive_menus_simple.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/themes/omega/omega/js/jquery.formalize.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/themes/omega/omega/js/omega-mediaqueries.js?ozs3zp"></script>
    <script type="text/javascript" src="https://bazzar.com.ua/sites/all/themes/quatro/js/custom.js?ozs3zp"></script>
    --}}
    <script type="text/javascript">
        <!--//--><![CDATA[//><!--

        //--><!]]>
    </script>

    <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700,300,300italic' rel='stylesheet' type='text/css' />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,600italic,700,700italic,800,800italic,300italic,300' rel='stylesheet' type='text/css'>

</head>

<body class="html front not-logged-in page-front-page">
<div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable">Перейти к основному содержанию</a>
</div>
<div class="page clearfix" id="page">
    <header id="section-header" class="section section-header">
        <div id="zone-branding-wrapper" class="zone-wrapper zone-branding-wrapper clearfix">
            <div id="zone-branding" class="zone zone-branding clearfix container-16">
                <div class="grid-16 region region-branding" id="region-branding">
                    <div class="region-inner region-branding-inner">
                        <div class="branding-data clearfix">
                            <div class="logo-img">
                                <a href="/" rel="home" title="Сравнение цен в Украине" class="active"><img src="https://bazzar.com.ua/sites/all/themes/quatro/logo.png" alt="Сравнение цен в Украине" id="logo" /></a>
                            </div>
                            <hgroup class="site-name-slogan">

                                <h1 class="site-name"><a href="/" title="Главная" class="active">Сравнение цен в Украине</a></h1>
                                <h6 class="site-slogan">Найди то, что тебе нужно по самой оптимальной цене!!!</h6>
                            </hgroup>
                        </div>
                        <div class="block block-block block-13 block-block-13 odd block-without-title" id="block-block-13">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <!--<div style="text-align: right;"><p>	<img alt="" src="/drupal7/quatro/sites/default/files/images/ad_728x90.png" style="width: 728px; height: 90px;" /></div>
<p>-->
                                    <div style="text-align: right;">
                                        <img alt="" src="http://placehold.it/728x90/6C0000/9B2B2B&amp;text=AD+728x90" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="zone-menu-wrapper" class="zone-wrapper zone-menu-wrapper clearfix">
            <div id="zone-menu" class="zone zone-menu clearfix container-16">
                <div class="grid-16">
                    <div data-mediasize="800" class="responsive-menu">
                        <span class="toggler jsToggler">☰ Menu</span>
                        <ul class="">
                            <li class="@if(request()->route()->getName() == 'mainpage') active @endif"><a href="{{ route('mainpage') }}" title="">Главная</a></li>
                            <li class="@if(str_is('catalogue*', request()->route()->getName())) active @endif"><a href="{{ route('catalogue') }}" title="">Каталог</a>
                                <span class="jsToggler"><i class="fa fa-caret-left" aria-hidden="true"></i></span>
                                <ul>
                                    @foreach($categoriesTree as $category)
                                        <li><a href="{{ route('catalogue_products', $category['id']) }}">{{ $category['name'] }}</a></li>
                                    @endforeach
                                </ul>
                            </li>
                            <li class="@if(str_is('blog*', request()->route()->getName())) active @endif"><a href="{{ route('blog') }}" title="">Блог</a></li>
                            <li><a href="/photos" title="">Photos</a></li>
                            <li><a href="/video" title="">Videos</a></li>
                            <li><a href="#">Features</a>
                                <span class="jsToggler"><i class="fa fa-caret-left" aria-hidden="true"></i></span>
                                <ul>
                                    <li><a href="/welcome-quatro">About Page</a></li>
                                    <li><a href="/users/admin" title="">Author Page</a></li>
                                    <li><a href="/travel/under-tuscany-sun-golden-field">Text Article</a></li>
                                    <li><a href="/photo/example-photo-article-juicebox">Photo Article</a></li>
                                    <li><a href="/video/example-youtube-video-article">Video Article</a></li>
                                    <li><a href="/responsive-layout">Responsive Layout</a></li>
                                    <li><a href="/access-control">Access Control</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Shortcodes</a>
                                <span class="jsToggler"><i class="fa fa-caret-left" aria-hidden="true"></i></span>
                                <ul>
                                    <li><a href="/accordions">Accordions</a></li>
                                    <li><a href="/columns" title="">Columns</a></li>
                                    <li><a href="/icons">Icons</a></li>
                                    <li><a href="/tables" title="">Tables</a></li>
                                    <li><a href="/tabs">Tabs</a></li>
                                    <li><a href="/typography">Typography</a></li>
                                </ul>
                            </li>
                            <li><a href="/contact" title="">Контакты</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="zone-submenu-wrapper" class="zone-wrapper zone-submenu-wrapper clearfix">
            <div id="zone-submenu" class="zone zone-submenu clearfix container-16">
                <div class="grid-16 region region-submenu" id="region-submenu">
                    <div class="region-inner region-submenu-inner">
                    </div>
                </div>
            </div>
        </div>
        {{-- @include('shared.zone-header-wrapper') --}}
    </header>
    <section id="section-content" class="section section-content">
        <div id="zone-content-wrapper" class="zone-wrapper zone-content-wrapper clearfix">
            <div id="zone-content" class="zone zone-content clearfix container-16">

                @yield('contentleft')

                <aside class="grid-4 region region-sidebar-second" id="">
                    <div class="region-inner region-sidebar-second-inner">

                        {{--@include('shared.twitter-timeline')--}}
                        @include('shared.search')

                        @include('shared.login-widget')

                        @if(str_is('users_*', request()->route()->getName()))
                            @include('users.aside-nav')
                        @endif

                        @if(str_is('catalogue*', request()->route()->getName()))
                            @include('catalogue.aside-nav')
                        @endif

                        @include('shared.top-products')

                        <!--
                        <section class="block block-simplenews block-120 block-simplenews-120 odd" id="block-simplenews-120">
                            <div class="block-inner clearfix">
                                <h2 class="block-title">Newsletter</h2>

                                <div class="content clearfix">
                                    <p>Stay informed on our latest news!</p>

                                    <form class="simplenews-subscribe" action="/" method="post" id="simplenews-block-form-120" accept-charset="UTF-8">
                                        <div>
                                            <div class="form-item form-type-textfield form-item-mail">
                                                <label for="edit-mail">E-mail <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                                <input type="text" id="edit-mail" name="mail" value="" size="20" maxlength="128" class="form-text required" />
                                            </div>
                                            <input type="submit" id="edit-submit" name="op" value="Subscribe" class="form-submit" />
                                            <input type="hidden" name="form_build_id" value="form-xjizbEM5oX1IOF-biDOJPhQPia9msImEqPosj_ITvKo" />
                                            <input type="hidden" name="form_id" value="simplenews_block_form_120" />
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </section>
                        <section class="block block-views block-photos-block-1 block-views-photos-block-1 even" id="block-views-photos-block-1">
                            <div class="block-inner clearfix">
                                <h2 class="block-title">Photos</h2>

                                <div class="content clearfix">
                                    <div class="view view-photos view-id-photos view-display-id-block_1 block-latest-photos view-dom-id-c66932cec7da9224b1061acd8c2980b5">

                                        <div class="view-content">
                                            <div id="flexslider-1" class="flexslider">
                                                <ul class="slides">
                                                    <li>
                                                        <div class="views-field views-field-field-images">
                                                            <div class="field-content">
                                                                <a href="/photo/example-photo-article-juicebox"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/photo_featured/public/photos/Vhzrr0QLT5mSU0r4bKTp_DSC_0011_1000.jpg?itok=pMxg4VXb" width="320" height="212" alt="" /></a>
                                                            </div>
                                                        </div>
                                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/photo/example-photo-article-juicebox">This is an example of a photo article with Juicebox</a></span> </div>
                                                    </li>
                                                    <li>
                                                        <div class="views-field views-field-field-images">
                                                            <div class="field-content">
                                                                <a href="/photo/aenean-varius-eros-dolor-aliquet-vel-ultrices-nisi-accumsan"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/photo_featured/public/photos/unsplash_52bf2bb8d2dd0_1.resized.resized.JPG?itok=CntCSIc6" width="320" height="200" alt="" /></a>
                                                            </div>
                                                        </div>
                                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/photo/aenean-varius-eros-dolor-aliquet-vel-ultrices-nisi-accumsan">Aenean varius eros in dolor aliquet, vel ultrices nisi accumsan.</a></span> </div>
                                                    </li>
                                                    <li>
                                                        <div class="views-field views-field-field-images">
                                                            <div class="field-content">
                                                                <a href="/photo/suspendisse-sed-vestibulum-neque-mauris"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/photo_featured/public/photos/blue-eyes-237438_1280.jpg?itok=nNskGofV" width="320" height="207" alt="" /></a>
                                                            </div>
                                                        </div>
                                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/photo/suspendisse-sed-vestibulum-neque-mauris">Suspendisse sed vestibulum neque mauris</a></span> </div>
                                                    </li>
                                                    <li>
                                                        <div class="views-field views-field-field-images">
                                                            <div class="field-content">
                                                                <a href="/photo/phasellus-malesuada-enim"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/photo_featured/public/photos/baby.jpg?itok=8ZlbhdN_" width="320" height="218" alt="" /></a>
                                                            </div>
                                                        </div>
                                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/photo/phasellus-malesuada-enim"> Phasellus a malesuada enim</a></span> </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                        <div class="block block-block block-transparent block-14 block-block-14 odd block-without-title" id="block-block-14">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <p><img src="http://placehold.it/300x250/666666/ffffff" /></p>
                                </div>
                            </div>
                        </div>
                        -->
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <footer id="section-footer" class="section section-footer">
        <div id="zone-footer-wrapper" class="zone-wrapper zone-footer-wrapper clearfix">
            <div id="zone-footer" class="zone zone-footer clearfix container-16">
                <div class="grid-16 region region-footer-first" id="region-footer-first">
                    <div class="region-inner region-footer-first-inner">
                        <div class="block block-menu block-menu-footer-menu block-menu-menu-footer-menu odd block-without-title" id="block-menu-menu-footer-menu">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <ul class="menu">
                                        <li class="first leaf"><a href="/" title="" class="active">Home</a></li>
                                        <li class="leaf"><a href="/topic/business" title="">Business</a></li>
                                        <li class="leaf"><a href="/topic/culture" title="">Culture</a></li>
                                        <li class="leaf"><a href="/topic/health" title="">Health</a></li>
                                        <li class="leaf"><a href="/topic/sport" title="">Sport</a></li>
                                        <li class="leaf"><a href="/topic/technology" title="">Technology</a></li>
                                        <li class="last leaf"><a href="/sitemap" title="">Sitemap</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="block block-block block-8 block-block-8 even block-without-title" id="block-block-8">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <div>Powered by Drupal and Symphony Themes.</div>
                                </div>
                            </div>
                        </div>
                        <div class="block block-block block-social-icons block-7 block-block-7 odd block-without-title" id="block-block-7">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <div>
                                        Join us on <i class="fa fa-facebook-square fa-lg" style="color:#3b5998"></i> <i class="fa fa-twitter-square fa-lg" style="color:#00aced"></i> <i class="fa fa-google-plus-square fa-lg" style="color:#dd4b39"></i> <i class="fa fa-youtube-square fa-lg" style="color:#bb0000"></i> <i class="fa fa-vimeo-square fa-lg" style="color:#aad450"></i> <i class="fa fa-pinterest-square fa-lg" style="color:#cb2027"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>
<div class="region region-page-bottom" id="region-page-bottom">
    <div class="region-inner region-page-bottom-inner">
    </div>
</div>

<div id="fb-root"></div>
<script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.11&appId=341148453027133';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

</body>

</html>