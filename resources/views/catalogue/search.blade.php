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
                            @include('shared.breadcrumbs', ['breadcrumbs' => [
                                ['url' => '#','name'=>'Поиск'],
                                ['url' => route('catalogue_search', ['search_request' => $search_request]),'name'=>'"'.$search_request.'"'],
                            ]])

                            <div class="content clearfix">
                                @include('shared.search')
                                @if ($search_request)
                                <div class="view view-list-photos view-list-photos-horizontal view-list-products">

                                    <div class="view-content">

                                        @if (sizeof($products) ?? [])
                                            @foreach($products as $product)
                                                @include('catalogue.listitem', ['product' => $product, 'categoriesList' => $categoriesList])
                                            @endforeach
                                        @else
                                            По вашему поисковому запросу ничего не найдено
                                        @endif

                                    </div>

                                    {{ $products->appends(request()->except('page'))->links('shared.pagination') }}

                                </div>
                                @else
                                    Укажите верный поисковый запрос
                                @endif
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
@endsection