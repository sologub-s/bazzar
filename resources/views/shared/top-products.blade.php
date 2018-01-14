<section class="block block-views block-latest-news-block-1 block-views-latest-news-block-1 even" id="block-views-latest-news-block-1">
    <div class="block-inner clearfix">
        <h2 class="block-title">Самые популярные</h2>

        <div class="content clearfix">
            <div class="view view-latest-news view-id-latest_news view-display-id-block_1 block-most-read view-dom-id-547339b34001a376573eedc6511030f6">

                <div class="view-content">

                    @if (sizeof($mostViewed) ?? [])
                        @foreach($mostViewed as $product)
                            <div class="views-row">
                                <div class="views-field views-field-field-image">
                                    <div class="field-content">
                                        <a href="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}">
                                            <img typeof="foaf:Image" src="{{ $product->mainImage() }}" width="100" alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="views-field views-field-title">
                                    <span class="field-content">
                                        <a href="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}">{{ $product->name }}</a>
                                    </span>
                                </div>
                            </div>
                        @endforeach
                    @endif

                </div>

            </div>
        </div>
    </div>
</section>