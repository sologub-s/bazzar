<div class="views-row">
    <div class="views-left">
        @if ($post->image)
        <div class="views-image">
            <div class="field-content">
                <a href="{{ route('blog_post', [$post->slug]) }}"><img src="{{ $post->image }}" alt="" /></a>
            </div>
        </div>
        @endif
    </div>
    <div class="views-right">
        <div class="views-title">
            <h2><a href="{{ route('blog_post', [$post->slug]) }}">{{ $post->name }}</a></h2>
        </div>
        <span class="views-created">
            <small>{{ $post->created_at }}</small>
        </span>
        @if($post->tags)
        <span class="views-tags">
            @foreach($post->tags as $i => $tag)
                <a href="{{ route('blog_tag', $tag->slug) }}">#{{ $tag->name }}</a>
                @if ($i < sizeof($post->tags)-1)
                    ,
                @endif
            @endforeach
        </span>
        @endif
        <div class="views-body">
            @if($post->content)
                <div class="field-content" style="text-overflow: ellipsis;">
                    <p>{{ str_limit(strip_tags($post->content), $limit = 500, $end = '...') }}</p>
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
            </span> &nbsp;&nbsp;
            <span class="views-comment-count">
                <span class="field-content">
                    <a href="{{ route('blog_post', [$post->slug]) }}"><i class="fa fa-comments-o"></i> <span class="fb-comments-count" data-href="{{ route('blog_post', [$post->slug]) }}"></span></a>
                </span>
            </span>
        </div>
    </div>
</div>