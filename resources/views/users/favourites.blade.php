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
                                ['url' => route('users_profile'),'name'=>'Профиль'],
                                ['url' => route('users_favourites'),'name'=>'Избранное'],
                            ]])

                            <div class="content clearfix">
                                <div class="view view-list-photos view-list-photos-horizontal view-list-products">

                                    <div class="view-content">

                                        @if (sizeof($products ?? []))
                                            @foreach($products as $product)
                                                @include('catalogue.listitem', ['product' => $product, 'categoriesList' => $categoriesList])
                                            @endforeach
                                        @else
                                            <p>В вашем списке избранного пока ничего нету. Попробуйте добавить что-то из популярных товаров:</p>
                                        @endif

                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        @if (!sizeof($products ?? []))
            @include('shared.mostViewed')
        @endif
    </div>
@endsection