@extends('layouts.app')

@section('contentleft')

    <style>



    </style>

    <div class="grid-12 region region-content" id="region-content">
        <div class="region-inner region-content-inner">
            <a id="main-content"></a>
            <div class="tabs clearfix"></div>
            <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
                <div class="region-inner region-content-bottom-first-inner">
                    <section class="block block-views">
                        <div class="block-inner clearfix">
                            @include('shared.breadcrumbs', ['breadcrumbs' => array_merge(
                                [['url' => route('blog'),'name'=>'Блог']],
                                [['url' => route('blog_post', $post->slug),'name'=>$post->name]],
                                $breadcrumbs ?? []
                            )])

                            <div class="content clearfix">
                                <div class="view view-list-posts view-list-post">

                                    <div class="view-content">

                                        <div class="views-row">
                                            <div class="views-right">
                                                <div class="views-title">
                                                    <h2><a href="{{ route('blog_post', [$post->slug]) }}">{{ $post->name }}</a></h2>
                                                </div>
                                                <span class="views-created">
                                                    <small>{{ $post->created_at }}</small>
                                                </span>
                                                <div class="views-body">
                                                    @if($post->content)
                                                        <div class="field-content" style="text-overflow: ellipsis;">
                                                            <p>{!! $post->content !!}</p>
                                                        </div>
                                                    @endif
                                                </div>
                                                <div class="views-rightblock">
                                                    <span class="views-social">
                                                        <span class="field-content">
                                                            <!-- AddToAny BEGIN -->
                                                            <div class="a2a_kit a2a_kit_size_20 a2a_default_style" data-a2a-url="{{ route('blog_post', [$post->slug]) }}" data-a2a-title="{{ $post->name }}">
                                                                <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                                                                <a class="a2a_button_facebook"></a>
                                                                <a class="a2a_button_twitter"></a>
                                                                <a class="a2a_button_google_plus"></a>
                                                            </div>
                                                            <div class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-url="{{ route('blog_post', [$post->slug]) }}" data-a2a-title="{{ $post->name }}">
                                                                <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                                                                <a class="a2a_button_facebook"></a>
                                                                <a class="a2a_button_twitter"></a>
                                                                <a class="a2a_button_google_plus"></a>
                                                            </div>
                                                            <script>
                                                                var a2a_config = a2a_config || {};
                                                                a2a_config.locale = "ru";
                                                            </script>
                                                            <!-- AddToAny END -->
                                                        </span>
                                                    </span>

                                                </div>
                                            </div>

                                            <div class="fb-comments" data-href="{{ route('blog_post', $post->slug) }}" data-width="100%" data-numposts="20"></div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
@endsection