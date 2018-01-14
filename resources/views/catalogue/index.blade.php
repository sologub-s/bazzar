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
                                [['url' => route('catalogue'),'name'=>'Каталог']]
                            )])

                            <div class="content clearfix">
                                <div class="view view-list-photos view-list-photos-horizontal view-list-subcategories">

                                    <div class="view-content">

                                        @if (sizeof($categoriesTree) ?? [])
                                            @foreach($categoriesTree as $topCategory)
                                                <?php
                                                $url = route('catalogue_products', [$topCategory['id']]);
                                                ?>
                                                <div class="views-row">
                                                    <div class="views-field views-field-field-image">
                                                        <div class="field-content">
                                                            <a href="{{ $url }}"><img src="{{ $topCategory['img'] }}" alt="" /></a>
                                                        </div>
                                                        <div class="field-layer">
                                                            <h3>{{ $topCategory['name'] }}</h3>
                                                        </div>
                                                    </div>
                                                    <div class="views-field views-field-body">
                                                        @if(sizeof($topCategory['children']))
                                                            <?php $countSubcats = 0; ?>
                                                            @foreach($topCategory['children'] as $subcategory)
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

    {{--
    <div class="grid-12 region region-content" id="region-content">
        <div class="region-inner region-content-inner">
            <a id="main-content"></a>
            <div class="tabs clearfix"></div>
            <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
                <div class="region-inner region-content-bottom-first-inner">
                    <section class="block block-views">

                        <div class="block-inner clearfix">
                            @include('shared.breadcrumbs', ['breadcrumbs' => [
                                ['name' => 'Каталог', 'url' => route('catalogue')],
                            ]])
                            <div class="content clearfix">
                                <div class="view view-list-categories ">
                                    <div class="view-content">
                                    @if(sizeof($categoriesTree ?? []))

                                        @foreach($categoriesTree as $topCategory)
                                            <div class="views-row">
                                                <div class="views-field views-field-title">
                                                <span class="field-content">
                                                    <a nohref>{{ $topCategory['name'] }}</a>
                                                    <div class="expander jsExpander">
                                                        <i class="fa fa-caret-left" aria-hidden="true"></i>
                                                    </div>
                                                </span>
                                                </div>
                                                <div class="views-field views-field-body">
                                                    <div class="field-content">
                                                        @if(sizeof($topCategory['children'] ?? []))
                                                            <ul>
                                                            @foreach($topCategory['children'] as $category1)
                                                                <li>
                                                                    @if(sizeof($category1['children'] ?? []))
                                                                        <span>{{ $category1['name'] }}</span>
                                                                    @else
                                                                        <a href="{{ route('catalogue_products', $topCategory['id'].'/'.$category1['id']) }}" class="padding-small">{{ $category1['name'] }}</a>
                                                                    @endif
                                                                    @if(sizeof($category1['children'] ?? []))
                                                                        <ul>
                                                                        @foreach($category1['children'] as $category2)
                                                                            <li><a href="{{ route('catalogue_products', $topCategory['id'].'/'.$category1['id'].'/'.$category2['id']) }}" class="padding-small">{{ $category2['name'] }}</a></li>
                                                                        @endforeach
                                                                        </ul>
                                                                    @endif
                                                                </li>
                                                            @endforeach
                                                            </ul>
                                                        @endif
                                                    </div>
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
    --}}
@endsection