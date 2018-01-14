@extends('layouts.app')

@section('contentleft')
    <div class="grid-12 region region-content" id="region-content">
        <div class="region-inner region-content-inner">
            <a id="main-content"></a>
            <div class="tabs clearfix"></div>
            <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
                <div class="region-inner region-content-bottom-first-inner">
                    <section class="block block-views">
                        <div class="block-inner clearfix">
                            @include('shared.breadcrumbs', ['breadcrumbs' => array_merge(
                                [['url' => route('catalogue'),'name'=>'Каталог']],
                                $breadcrumbs ?? []
                            )])

                            <div class="content clearfix">
                                <div class="view view-list-photos view-list-photos-horizontal view-list-subcategories">

                                    <div class="view-content">

                                        @if (sizeof($categories) ?? [])
                                            @foreach($categories as $category)
                                                <?php
                                                    $url = sizeof($category['categories']) ? route('catalogue_products', [$cats.'/'.$category['id']]) : route('catalogue_products', [$cats.'/'.$category['id']]);
                                                ?>
                                                <div class="views-row">
                                                    <div class="views-field views-field-field-image">
                                                        <div class="field-content">
                                                            <a href="{{ $url }}"><img src="{{ $category['img'] }}" alt="" /></a>
                                                        </div>
                                                        <div class="field-layer">
                                                            <h3>{{ $category['name'] }}</h3>
                                                        </div>
                                                    </div>
                                                    <div class="views-field views-field-body">
                                                        @if(sizeof($category['categories']))
                                                            <?php $countSubcats = 0; ?>
                                                            @foreach($category['categories'] as $subcategory)
                                                                <?php $countSubcats++; ?>
                                                                <a href="{{ $url.'/'.$subcategory['id'] }}">{{ $subcategory['name'] }}</a>
                                                                <?php
                                                                    if($countSubcats >= 3) {
                                                                        break;
                                                                    }
                                                                ?>
                                                            @endforeach
                                                            <strong><a href="{{ $url }}">Ещё...</a></strong>
                                                        @else
                                                            <strong><a href="{{ $url }}">К списку товаров >></a></strong>
                                                        @endif
                                                    </div>
                                                </div>
                                            @endforeach
                                        @endif

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