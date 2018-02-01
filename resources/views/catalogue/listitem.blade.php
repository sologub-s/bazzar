<div class="views-row">
    <div class="views-field views-field-field-image">
        <div class="field-content">
            <a href="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}"><img src="{{ $product->mainImage() }}" alt="" /></a>
        </div>
        <div class="field-layer">
            <span>от <strong>${{ $product->price_min }}</strong></span>
            @if(Auth::user())
            <div class="jsToggleFavourites toggleFavourites" data-product_id="{{ $product->id }}">
                <i class="fa fa-star{{ isset($favourites[$product->id]) ? '' : '-o' }}" aria-hidden="true"></i>
            </div>
            @endif
        </div>
    </div>
    <div class="views-field views-field-title">
        <span class="field-content"><a href="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}">{{ $product->name }}</a></span>
    </div>
    <span class="views-field views-field-created">
                                                        <span class="field-content">
                                                            <!-- AddToAny BEGIN -->
                                                            <div class="a2a_kit a2a_kit_size_20 a2a_default_style" data-a2a-url="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}" data-a2a-title="{{ $product->name }}">
                                                                <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                                                                <a class="a2a_button_facebook"></a>
                                                                <a class="a2a_button_twitter"></a>
                                                                <a class="a2a_button_google_plus"></a>
                                                            </div>
                                                            <div class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-url="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}" data-a2a-title="{{ $product->name }}">
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
    <span class="views-field views-field-comment-count">
                                                        <span class="field-content"><i class="fa fa-comments-o"></i> <span class="fb-comments-count" data-href="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}"></span></span>
                                                    </span>
    <div class="views-field views-field-body">
        @if($product->addon()->first()->description ?? false)
            <div class="field-content" style="text-overflow: ellipsis;">
                <p>{{ strip_tags($product->addon()->first()->description) ?? '' }}</p>
            </div>
        @endif
    </div>
</div>