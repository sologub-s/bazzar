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
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-pencil-square-o"></i> {{ $product->name }}</div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="col-lg-6">
                        <fieldset disabled>
                            <div class="form-group">
                                <label for="control_name">Name</label>
                                <input type="name" class="form-control" id="control_name" aria-describedby="control_name_help" placeholder="Enter product name" value="{{ $product->name }}">
                                <small id="control_name_help" class="form-text text-muted disabled">Автоматическое поле</small>
                            </div>
                        </fieldset>

                        <fieldset disabled>
                            <div class="form-group">
                                <label for="control_slug">Slug</label>
                                <input type="slug" class="form-control" id="control_slug" aria-describedby="control_slug_help" placeholder="Enter product slug" value="{{ $product->slug }}">
                                <small id="control_slug_help" class="form-text text-muted disabled">Автоматическое поле</small>
                            </div>
                        </fieldset>

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
                                    <input type="checkbox" class="form-check-input" {{ $product->parsed == 1 ? 'checked' : '' }} name="parsed">
                                    Отпаршен
                                </label>
                            </div>
                        </fieldset>

                        <fieldset disabled>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input" {{ $product->in_stock == 1 ? 'checked' : '' }} name="in_stock">
                                    В наличии
                                </label>
                            </div>
                        </fieldset>

                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" {{ $product->active == 1 ? 'checked' : '' }} name="active">
                                Активен
                            </label>
                        </div>

                        <div class="form-group">
                            <label for="control_description">Описание</label>
                            <textarea class="form-control" id="control_textarea" rows="3">{{ $product->description }}</textarea>
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
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Сохранить</button>
                        </div>
                    </div>

                </form>
            </div>
            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection