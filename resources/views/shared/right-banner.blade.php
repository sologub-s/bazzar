@if ($contentblocks['right-banner-1'] ?? false || $contentblocks['right-banner-2'] ?? false)
<section class="block block-views block-right-banner">
    <div class="block-inner clearfix">
        {!! $contentblocks['right-banner-1']['content'] ?? '' !!}
        {!! $contentblocks['right-banner-2']['content'] ?? '' !!}
    </div>
</section>
@endif