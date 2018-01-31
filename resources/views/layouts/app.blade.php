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
                                {!! $contentblocks['logo-img']['content'] ?? '' !!}
                            </div>
                            <hgroup class="site-name-slogan">

                                <h1 class="site-name"><a href="/" title="Главная" class="active">{!! $contentblocks['site-name']['content'] ?? '' !!}</a></h1>
                                <h6 class="site-slogan">{!! $contentblocks['site-slogan']['content'] ?? '' !!}</h6>
                            </hgroup>
                        </div>
                        <div class="block block-block block-13 block-block-13 odd block-without-title" id="block-block-13">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <div style="text-align: right;">
                                        {!! $contentblocks['header-728x90']['content'] ?? '' !!}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @if(sizeof($menu))
        <div id="zone-menu-wrapper" class="zone-wrapper zone-menu-wrapper clearfix">
            <div id="zone-menu" class="zone zone-menu clearfix container-16">
                <div class="grid-16">
                    <div data-mediasize="800" class="responsive-menu">
                        <span class="toggler jsToggler">☰ Menu</span>
                        <ul class="">

                            @foreach($menu as $item)
                                @if($item->custom_type == 'main')
                                    <li class="@if(request()->route()->getName() == 'mainpage') active @endif"><a href="{{ route('mainpage') }}" title="">Главная</a></li>
                                @endif
                                @if($item->custom_type == 'catalogue')
                                    <li class="@if(str_is('catalogue*', request()->route()->getName())) active @endif"><a href="{{ route('catalogue') }}" title="">Каталог</a>
                                        <span class="jsToggler"><i class="fa fa-caret-left" aria-hidden="true"></i></span>
                                        <ul>
                                            @foreach($categoriesTree as $category)
                                                <li><a href="{{ route('catalogue_products', $category['id']) }}">{{ $category['name'] }}</a></li>
                                            @endforeach
                                        </ul>
                                    </li>
                                @endif
                                @if($item->custom_type == 'blog')
                                    <li class="@if(str_is('blog*', request()->route()->getName())) active @endif"><a href="{{ route('blog') }}" title="">Блог</a></li>
                                @endif
                                @if($item->custom_type == 'contacts')
                                    <li><a href="{{ @route('contacts') }}" title="">Контакты</a></li>
                                @endif
                                @if(!$item->custom_type)
                                    <li><a href="{{ $item->href }}" target="{{ $item->target }}">{{ $item->name }}</a>
                                        @if(sizeof($item->menulinks))
                                            <span class="jsToggler"><i class="fa fa-caret-left" aria-hidden="true"></i></span>
                                            <ul>
                                                @foreach($item->menulinks as $subitem)
                                                    <li><a href="{{ $subitem->href }}" target="{{ $subitem->target }}">{{ $subitem->name }}</a></li>
                                                @endforeach
                                            </ul>
                                        @endif
                                    </li>
                                @endif
                            @endforeach

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        @endif
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

                        @include('shared.right-banner')
                        @include('shared.top-products')


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
                                    <!--
                                    <ul class="menu">
                                        <li class="first leaf"><a href="/" title="" class="active">Home</a></li>
                                        <li class="leaf"><a href="/topic/business" title="">Business</a></li>
                                        <li class="leaf"><a href="/topic/culture" title="">Culture</a></li>
                                        <li class="leaf"><a href="/topic/health" title="">Health</a></li>
                                        <li class="leaf"><a href="/topic/sport" title="">Sport</a></li>
                                        <li class="leaf"><a href="/topic/technology" title="">Technology</a></li>
                                        <li class="last leaf"><a href="/sitemap" title="">Sitemap</a></li>
                                    </ul>
                                    -->
                                    {!! $contentblocks['bottom-text-1']['content'] ?? '' !!}
                                </div>
                            </div>
                        </div>
                        <div class="block block-block block-8 block-block-8 even block-without-title" id="block-block-8">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <div>{!! $contentblocks['bottom-text-2']['content'] ?? '' !!}</div>
                                </div>
                            </div>
                        </div>
                        <div class="block block-block block-social-icons block-7 block-block-7 odd block-without-title" id="block-block-7">
                            <div class="block-inner clearfix">

                                <div class="content clearfix">
                                    <div>
                                        {!! $contentblocks['bottom-text-3']['content'] ?? '' !!}
                                    </div>
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