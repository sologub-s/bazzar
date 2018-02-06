@extends('layouts.app')

@section('contentleft')
    <div class="grid-12 region region-content" id="region-content">
        <div class="region-inner region-content-inner">
            <a id="main-content"></a>
            <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
                <div class="region-inner region-content-bottom-first-inner">
                    <section class="block block-views">
                        <div class="block-inner clearfix">
                            <h2 class="block-title">Сравнение</h2>
                            <div class="content clearfix">
                                <div class="view view-list-tags">

                                    <?php
                                        $propertiesList = [];
                                        foreach ($compareProducts as $product) {
                                            $properties = json_decode($product->addon()->first()->properties_json ?? null, true);
                                            if (!sizeof($properties)) {
                                                continue;
                                            }
                                            foreach($properties as $propertyGroup) {
                                                foreach ($propertyGroup['properties'] as $property) {
                                                    $propertiesList[] = trim($property['name'],' \?');
                                                }
                                            }
                                        }
                                        $propertiesList = array_unique($propertiesList);
                                        natsort($propertiesList);
                                        $propertiesList = array_values($propertiesList);

                                    ?>

                                    <div class="view-content">

                                        @if (@count($compareProducts))
                                        <div class="compare container">
                                            <div class="characteristics compare">
                                                <table class="mt-4">
                                                    <thead>
                                                    <tr>
                                                        @foreach(array_merge(['Товар'], $propertiesList) as $property)
                                                            <th>{{ $property }}</th>
                                                        @endforeach
                                                    </tr>
                                                    </thead>
                                                    @foreach($compareProducts as $product)
                                                        <?php
                                                        $flatProperties = [];
                                                        $properties = json_decode($product->addon()->first()->properties_json ?? null, true);
                                                        foreach($properties ?? [] as $propertyGroup) {
                                                            foreach($properties as $propertyGroup) {
                                                                foreach ($propertyGroup['properties'] as $property) {
                                                                    $flatProperties[trim($property['name'],' \?')] = trim($property['value'],' \?');
                                                                }
                                                            }
                                                        }
                                                        ?>
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <a href="{{ route('catalogue_theproduct', [$product->createCats($categoriesList), $product->slug]) }}" target="_blank">
                                                                    <img src="{{ $product->mainImage() }}" alt="" />
                                                                {{ $product->name }}
                                                                </a>
                                                                <a href="#" class="remove jsRemoveCompare" data-product_id="{{ $product->id }}"><i class="fa fa-times"></i></a>
                                                            </td>
                                                            @foreach($propertiesList as $property)
                                                                <td>{{ $flatProperties[$property] ?? '&ndash;' }}</td>
                                                            @endforeach
                                                        </tr>
                                                        </tbody>
                                                    @endforeach
                                                </table>
                                            </div>
                                        </div>
                                        @else
                                            <p>Вы ещё ничего не добавили в сравнение</p>
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