@extends('layouts.app')

@section('contentleft')
    <div id="messages" class="grid-16"><div class="messages error">
            <h2 class="element-invisible">Сообщение об ошибке</h2>
            <ul>
                <li>Поле "Ваш email-адрес" обязательно для заполнения.</li>
                <li>Поле "Тема" обязательно для заполнения.</li>
                <li>Поле "Сообщение" обязательно для заполнения.</li>
            </ul>
        </div>
    </div>
<div class="grid-12 region region-content" id="region-content">
    <div class="region-inner region-content-inner">
        <a id="main-content"></a>
        <div class="tabs clearfix"></div>
        <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
            <div class="region-inner region-content-bottom-first-inner">

                {{-- @include('shared.buisiness') --}}
                @include('shared.recent')
                <!--
                <div class="block block-block full-width block-transparent block-12 block-block-12 even block-without-title" id="block-block-12">
                    <div class="block-inner clearfix">

                        <div class="content clearfix">
                            <div style="text-align: center;">
                                <img src="http://placehold.it/728x90" /></div>
                        </div>
                    </div>
                </div>
                <section class="block block-views block-purple one-half block-topic-health-block-2 block-views-topic-health-block-2 odd" id="block-views-topic-health-block-2">
                    <div class="block-inner clearfix">
                        <h2 class="block-title"><a href="/topic/health" class="block-title-link">Health</a></h2>

                        <div class="content clearfix">
                            <div class="view view-topic-health view-id-topic_health view-display-id-block_2 block-topic-news view-dom-id-e9a339bf85de26203f9a20dbc56173aa">

                                <div class="view-content">
                                    <div class="views-row views-row-1 views-row-odd views-row-first views-row-last cufont-text">

                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/health/closed-nature-reduces-medical-bill">Closed to nature reduces medical bill</a></span> </div>
                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/health/closed-nature-reduces-medical-bill"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/yoga-241613_1000.jpg?itok=yTh08Dgl" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Etiam urna eros, fringilla sed molestie eu; vulputate id elit. Vivamus adipiscing mattis nisl; vel venenatis dolor auctor nec. Ut mollis tellus et...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="attachment attachment-after">
                                    <div class="view view-topic-health view-id-topic_health view-display-id-attachment_1">

                                        <div class="view-content">
                                            <div class="views-row views-row-1 views-row-odd views-row-first">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/health/too-much-fries-will-kill-you-health-science">Too much fries will kill you, by Health Science</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                            </div>
                                            <div class="views-row views-row-2 views-row-even">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/health/keeping-your-babies-warm-winter">Keeping your babies warm in the winter</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                            </div>
                                            <div class="views-row views-row-3 views-row-odd">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/health/secret-ingredients-patoa-chef-manhattan">Secret ingredients from Patoa Chef of Manhattan</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                            </div>
                                            <div class="views-row views-row-4 views-row-even views-row-last">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/health/your-living-room-your-face-your-health">Your living room, your face, your health</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section class="block block-views block-yellow one-half last block-topic-travel-block-1 block-views-topic-travel-block-1 even" id="block-views-topic-travel-block-1">
                    <div class="block-inner clearfix">
                        <h2 class="block-title"><a href="/topic/travel" class="block-title-link">Travel</a></h2>

                        <div class="content clearfix">
                            <div class="view view-topic-travel view-id-topic_travel view-display-id-block_1 block-topic-news view-dom-id-2707cbf82c8b90e2854f833a02279043">

                                <div class="view-content">
                                    <div class="views-row views-row-1 views-row-odd views-row-first views-row-last cufont-text">

                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/travel/under-tuscany-sun-golden-field">Under the Tuscany sun, on a golden field</a></span> </div>
                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/travel/under-tuscany-sun-golden-field"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/TuscanyHay.jpg?itok=Jgi8Tltr" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Phasellus vel orci metus. Praesent enim mi, interdum et consectetur eget; elem entum nec orci. Class aptent taciti soci osqu ad litora torquent...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="attachment attachment-after">
                                    <div class="view view-topic-travel view-id-topic_travel view-display-id-attachment_1">

                                        <div class="view-content">
                                            <div class="views-row views-row-1 views-row-odd views-row-first">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/travel/interesting-journey-masan-lake">An interesting journey to Masan Lake</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 19, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                            </div>
                                            <div class="views-row views-row-2 views-row-even">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/travel/japan-blossom-place-you-should-not-miss">Japan in blossom, a place you should not miss</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 1</span> </span>
                                            </div>
                                            <div class="views-row views-row-3 views-row-odd">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/travel/rome-colosseum-finished-renovation-tourists">Rome Colosseum finished renovation for tourists</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                            </div>
                                            <div class="views-row views-row-4 views-row-even views-row-last">

                                                <div class="views-field views-field-title"> <span class="field-content"><a href="/travel/charming-paris-lively-spring">Charming Paris in a lively spring</a></span> </div>
                                                <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                                <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section class="block block-views full-width block-grey block-video-block block-views-video-block odd" id="block-views-video-block">
                    <div class="block-inner clearfix">
                        <h2 class="block-title">Latest Videos</h2>

                        <div class="content clearfix">
                            <div class="view view-video view-id-video view-display-id-block view-dom-id-3dfca64fc5096209bbe9dc1762c64a98">

                                <div class="view-content">
                                    <ul class="jcarousel jcarousel-view--video--block jcarousel-dom-1 jcarousel-skin-default">
                                        <li class="jcarousel-item-1 odd" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/pellentesque-habitant-morbi"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-vimeo/112233728.jpg?itok=2WmHl4di" width="280" height="200" alt="Wetness" /></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="jcarousel-item-2 even" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/aliquet-mattis-nisi"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-vimeo/116213129.jpg?itok=yMagaSjh" width="280" height="200" alt="“An Episode,” by Palaxy Tracks" /></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="jcarousel-item-3 odd" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/class-aptent-taciti-sociosqu-ad"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-vimeo/118471437.jpg?itok=7h-wVR1M" width="280" height="200" alt="Le Gouffre" /></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="jcarousel-item-4 even" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/example-youtube-video-article"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-youtube/8sgZsL4FyNk.jpg?itok=22qu2lSs" width="280" height="200" alt="Unboxing: Monster Hunter 4 Ultimate" /></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="jcarousel-item-5 odd" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/maecenas-dapibus-luctus-nibh"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-vimeo/116746233.jpg?itok=a0of_I3n" width="280" height="200" alt="Dji. Death Sails" /></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="jcarousel-item-6 even" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/vivamus-interdum-purus-eu-turpis"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-vimeo/118014639.jpg?itok=n80_QBTe" width="280" height="200" alt="GO Cuba" /></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="jcarousel-item-7 odd" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/dellentesque-vitae-massa-nisi"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-youtube/wOTWkcy2GiE.jpg?itok=K2qNMGEA" width="280" height="200" alt="GTA 5 WRACKING BALL! - GTA 5 Online Mini Game Mode! - Grand Theft Auto V" /></a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="jcarousel-item-8 even" style="display: none;">
                                            <div class="views-field views-field-field-media">
                                                <div class="field-content">
                                                    <a href="/video/duis-sollicitudin-leo-euismod"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/video_list/public/media-youtube/KHHqPTQDIlo.jpg?itok=AS0q1uOC" width="280" height="200" alt="Jimmy Fallon, The Roots, and Music Superstars Sing &quot;We Are The Champions&quot; (A Cappella)" /></a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section class="block block-views block-blue one-half  block-topic-technology-block-2 block-views-topic-technology-block-2 even" id="block-views-topic-technology-block-2">
                    <div class="block-inner clearfix">
                        <h2 class="block-title"><a href="/topic/technology" class="block-title-link">Technology</a></h2>

                        <div class="content clearfix">
                            <div class="view view-topic-technology view-id-topic_technology view-display-id-block_2 block-topic-news block-topic-news-list view-dom-id-50cd4594d38a88a4c9fd62e4cb42b1ce">

                                <div class="view-content">
                                    <div class="views-row views-row-1 views-row-odd views-row-first cufont-text">

                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/technology/will-windows-surface-tablet-be-ipad-killer"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/windows-10-start-screen.jpg?itok=WJ80Uvcp" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/technology/will-windows-surface-tablet-be-ipad-killer">Will Windows Surface tablet be an iPad killer?</a></span> </div>
                                        <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> июл 02, 2012</span> </span> &nbsp;&nbsp;
                                        <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Vestibulum a felis vel leo pretium mattis id et metus. Fusce sodales...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="views-row views-row-2 views-row-even cufont-text">

                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/technology/end-nuclear-power-plant-sholine-city"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/technology_04.jpg?itok=XmJHoJ8j" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/technology/end-nuclear-power-plant-sholine-city">The end of the nuclear power plant in Sholine city</a></span> </div>
                                        <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 19, 2011</span> </span> &nbsp;&nbsp;
                                        <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 3</span> </span>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Cras libero ipsum, interdum rutrum suscipit vel, luctus non dolor....</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="views-row views-row-3 views-row-odd views-row-last cufont-text">

                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/technology/security-hole-web-browser-transfer-protocol-discovered-nasa"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/technology_01.jpg?itok=pfXZvJAJ" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/technology/security-hole-web-browser-transfer-protocol-discovered-nasa">Security hole in web browser transfer protocol discovered by NASA</a></span> </div>
                                        <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                        <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Vivamus accumsan fermentum lobortis! Morbi pellentesque, elit eu ornare...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section class="block block-views block-orange one-half last block-topic-sport-block-1 block-views-topic-sport-block-1 odd" id="block-views-topic-sport-block-1">
                    <div class="block-inner clearfix">
                        <h2 class="block-title"><a href="/topic/sport" class="block-title-link">Sport</a></h2>

                        <div class="content clearfix">
                            <div class="view view-topic-sport view-id-topic_sport view-display-id-block_1 block-topic-news block-topic-news-list view-dom-id-bb328e216064ba2d7d6dc9a79e6bf26f">

                                <div class="view-content">
                                    <div class="views-row views-row-1 views-row-odd views-row-first cufont-text">

                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/sport/euro-2012-started-expects-great-games-come"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/euro2012_launch.jpg?itok=ns50B4kT" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/sport/euro-2012-started-expects-great-games-come">The Euro 2012 started, expects great games to come</a></span> </div>
                                        <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> июл 02, 2012</span> </span> &nbsp;&nbsp;
                                        <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Suspendisse est elit, rutrum a tincidunt in, aliquam quis lorem. Duis...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="views-row views-row-2 views-row-even cufont-text">

                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/sport/can-human-surpass-ultimate-speed-limit"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/sport9.jpg?itok=yIjwYdex" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/sport/can-human-surpass-ultimate-speed-limit">Can human surpass the ultimate speed limit</a></span> </div>
                                        <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                        <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Nullam aliquam tincidunt ultricies. Vestibulum mollis sagittis euismod?...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="views-row views-row-3 views-row-odd views-row-last cufont-text">

                                        <div class="views-field views-field-field-image">
                                            <div class="field-content">
                                                <a href="/sport/wimbledon-coming-all-transparent-white"><img typeof="foaf:Image" src="https://bazzar.com.ua/sites/default/files/styles/medium/public/articles/wimbledon-2012-federer.jpg?itok=2UumkwRH" width="220" height="220" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="views-field views-field-title"> <span class="field-content"><a href="/sport/wimbledon-coming-all-transparent-white">The Wimbledon is coming. All in transparent white.</a></span> </div>
                                        <span class="views-field views-field-created">        <span class="field-content"><i class="fa fa-clock-o"></i> сен 13, 2011</span> </span> &nbsp;&nbsp;
                                        <span class="views-field views-field-comment-count">        <span class="field-content"><i class="fa fa-comments-o"></i> 0</span> </span>
                                        <div class="views-field views-field-body">
                                            <div class="field-content">
                                                <p>Etiam ut nisl ante. Sed nec neque justo. Vivamus aliquam nunc vitae libero...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                -->
            </div>
        </div>
    </div>
</div>
@endsection