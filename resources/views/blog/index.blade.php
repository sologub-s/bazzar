@extends('layouts.app')

@section('contentleft')

    <div class="grid-12 region region-content" id="region-content">
        <div class="region-inner region-content-inner">
            <a id="main-content"></a>
            @if($tags)
                @include('blog.tagcloud')
            @endif
            <div class="tabs clearfix"></div>
            <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
                <div class="region-inner region-content-bottom-first-inner">
                    <section class="block block-views">
                        <div class="block-inner clearfix">
                            @include('shared.breadcrumbs', ['breadcrumbs' => array_merge(
                                [['url' => route('blog'),'name'=>'Блог']],
                                $breadcrumbs ?? []
                            )])

                            <div class="content clearfix">
                                <div class="view view-list-posts">

                                    <div class="view-content">

                                        @if (sizeof($posts) ?? [])
                                            @foreach($posts as $post)
                                                @include('blog.listitem', ['post' => $post])
                                            @endforeach
                                        @endif

                                    </div>

                                    {{ $posts->appends(request()->except('page'))->links('shared.pagination') }}

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
@endsection