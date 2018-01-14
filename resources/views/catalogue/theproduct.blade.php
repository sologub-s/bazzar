@extends('layouts.app')

@section('contentleft')

    <div class="grid-12 region region-content">
        <div class="region-inner region-content-inner">
            <div class="block">
                <div class="block-inner clearfix block-product">
                    @include('shared.breadcrumbs', ['breadcrumbs' => array_merge(
                        [['url' => route('catalogue'),'name'=>'Каталог']],
                        $breadcrumbs ?? []
                    ), 'uncompleted' => true])
                    <div class="content clearfix">
                        <h1 class="title" id="page-title">{{ $product->name }}</h1>
                        <div class="head-container">
                            <div class="images">
                                @if(Auth::user())
                                    <div class="jsToggleFavourites toggleFavourites" data-product_id="{{ $product->id }}">
                                        <i class="fa fa-star{{ isset($favourites[$product->id]) ? '' : '-o' }}" aria-hidden="true"></i>
                                    </div>
                                @endif
                                <!-- Swiper -->
                                <div class="swiper-container gallery-top">
                                    <?php $images = $product->addon()->first()->images_json ? json_decode($product->addon()->first()->images_json, true) : [['normal'=>$product->img]]; ?>
                                    <div class="swiper-wrapper">
                                        @foreach($images as $image)
                                            <div class="swiper-slide" style="background-image:url({{ $image['normal'] }})">
                                                <a data-fancybox="theproduct_{{ $product->id }}" href="{{ $image['normal'] }}"></a>
                                            </div>
                                        @endforeach
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-button-next swiper-button-white"></div>
                                    <div class="swiper-button-prev swiper-button-white"></div>
                                </div>
                                @if(sizeof($images) > 1)
                                <div class="swiper-container gallery-thumbs">
                                    <div class="swiper-wrapper">
                                        @foreach($images as $image)
                                            <div class="swiper-slide" style="background-image:url({{ $image['normal'] }})"></div>
                                        @endforeach
                                    </div>
                                </div>
                                @endif
                            </div>
                            <div class="actions">
                                <span class="field-content">
                                    <!-- AddToAny BEGIN -->
                                    <div class="a2a_kit a2a_kit_size_32 a2a_default_style float-right" data-a2a-url="{{ route('catalogue_theproduct', [$cats, $product->slug]) }}" data-a2a-title="{{ $product->name }}">
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
                                <?php $prices = json_decode($product->addon()->first()->prices_json, true); ?>
                                @if(sizeof($prices))
                                    <table class="mt-4 prices">
                                        <thead><tr><th colspan="2">Цены</th></tr></thead>
                                        <tbody>
                                        @foreach($prices as $price)
                                            <tr>
                                                <td>{{ $shops[$price['shop_id']]->name }}</td>
                                                <td><a href="{{$price['href']}}" target="_blank">Купить за<br /><span>${{$price['price']}}</span></a></td>
                                            </tr>
                                        @endforeach
                                        </tbody>
                                    </table>
                                @endif
                                <?php $properties = json_decode($product->addon()->first()->properties_json, true); ?>
                                @if(sizeof($properties))
                                    <a href="#" role="button" class="btn btn-primary show-characteristics jsShowCharacteristics mt-2">
                                        Показать характеристики <i class="fa fa-caret-down" aria-hidden="true"></i>
                                    </a>
                                    <div class="characteristics jsCharacteristics">
                                        <table class="mt-4">
                                            @foreach($properties as $property_group)
                                                <thead>
                                                <tr>
                                                    <th colspan="2">{{ $property_group['group'] }}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                @foreach($property_group['properties'] as $property)
                                                    <tr>
                                                        <td>{{ $property['name'] }}</td>
                                                        <td>{{ $property['value'] }}</td>
                                                    </tr>
                                                @endforeach
                                                </tbody>
                                            @endforeach
                                        </table>
                                        <a href="#" role="button" class="btn btn-primary show-characteristics jsHideCharacteristics mt-2">
                                            Скрыть характеристики <i class="fa fa-caret-up" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                @endif
                            </div>
                            <div class="description">
                                {!! $product->addon()->first()->description !!}
                            </div>
                            <div class="fb-comments" data-href="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}" data-width="100%" data-numposts="20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection