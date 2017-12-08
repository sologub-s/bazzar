@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Products', 'url' => url('/admin/products')],
            ['name' => $product->name, 'url' => url('/admin/products/'.request()->get('id'))],
        ]])
        <!--
        <div class="row">
            <div class="col-12">
                <h1>{{ $product->name }}</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
            </div>
        </div>
        -->
        @include('admin.shared.alerts')
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-pencil-square-o"></i> {{ $product->name }}</div>
            <div class="card-body">
                <form method="post" enctype="multipart/form-data" action="{{ route('admin_products_edit_handler', $product->id) }}">
                    <div class="row">
                        <div class="col-lg-6">
                        <div class="form-group">
                            <label for="control_name">Name</label>
                            <input type="name" class="form-control" id="control_name" aria-describedby="control_name_help" placeholder="Enter product name" name='name' value="{{ $product->name }}">
                            <!--<small id="control_name_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
                        </div>

                        <div class="form-group">
                            <label for="control_slug">Slug</label>
                            <input type="slug" class="form-control" id="control_slug" aria-describedby="control_slug_help" placeholder="Enter product slug" name='slug' value="{{ $product->slug }}">
                            <!--<small id="control_slug_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
                        </div>

                        <fieldset disabled>
                            <div class="form-group">
                                <label for="control_category_id">Категория</label>
                                <select class="form-control" id="control_category_id">
                                    @foreach($categories as $category)
                                        <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected="selected"' : '' }}>{{ $category->name }}</option>
                                    @endforeach;
                                </select>
                            </div>
                        </fieldset>

                        <fieldset disabled>
                            <div class="form-group">
                                <label for="control_brand_id">Бренд</label>
                                <select class="form-control" id="control_brand_id">
                                    @foreach($brands as $brand)
                                        <option value="{{ $brand->id }}" {{ $product->brand_id == $brand->id ? 'selected="selected"' : '' }}>{{ $brand->name }}</option>
                                    @endforeach;
                                </select>
                            </div>
                        </fieldset>

                        <fieldset disabled>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input jsBootstrapSwitch" {{ $product->parsed == 1 ? 'checked' : '' }} name="parsed" data-on-text="Parsed" data-off-text="Not parsed" data-on-color="success" readonly="readonly">
                                </label>
                            </div>
                        </fieldset>

                        <fieldset disabled>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input jsBootstrapSwitch" {{ $product->in_stock == 1 ? 'checked' : '' }} name="in_stock" data-on-text="In stock" data-off-text="Not in stock" data-on-color="success" readonly="readonly">
                                </label>
                            </div>
                        </fieldset>

                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input jsBootstrapSwitch" {{ $product->active == 1 ? 'checked' : '' }} name="active" data-on-text="Enabled" data-off-text="Disabled" data-on-color="success">
                            </label>
                        </div>

                        <div class="form-group">
                            <label for="control_description">Описание</label>
                            <textarea class="form-control ckeditor" id="control_textarea" rows="3" name='description'>{{ $product->description }}</textarea>
                        </div>

                        </div>
                        <div class="col-lg-6">
                                @if($product->images_json)
                                <div class="text-center">
                                    <?php $images = json_decode($product->images_json, true); ?>
                                    @foreach($images as $image)
                                            <img src="{{ $image['normal'] }}" class="img-fluid" alt="Responsive image">
                                    @endforeach
                                </div>
                                @endif
                                @if($product->properties_json)
                                    <?php
                                        $properties = json_decode($product->properties_json, true);
                                    ?>
                                    <table class="table table-bordered table-hover dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                        <tbody>
                                            @foreach($properties as $group)
                                            <?php
                                            $odd = true;
                                            ?>
                                            <tr><th colspan="2">{{ $group['group'] }}</th></tr>
                                                @foreach($group['properties'] as $property)
                                                <tr role="row" class="{{ $odd ? 'odd' : 'even' }}">
                                                    <td>{{ $property['name'] }}</td>
                                                    <td>{{ $property['value'] }}</td>
                                                </tr>
                                                <?php $odd = !$odd; ?>
                                                @endforeach
                                            @endforeach
                                        </tbody>
                                    </table>
                                @endif
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Сохранить</button>
                        </div>
                    </div>

                </form>
            </div>
            <div class="card-footer small text-muted">Updated at {{ $product->updated_at }}</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection