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

                    <div class="form-group">
                        <label for="control_category_id">Категория</label>
                        <select class="form-control" id="control_category_id">
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected="selected"' : '' }}>{{ $category->name }}</option>
                            @endforeach;
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="control_brand_id">Бренд</label>
                        <select class="form-control" id="control_brand_id">
                            @foreach($brands as $brand)
                                <option value="{{ $brand->id }}" {{ $product->brand_id == $brand->id ? 'selected="selected"' : '' }}>{{ $brand->name }}</option>
                            @endforeach;
                        </select>
                    </div>

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

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="exampleSelect1">Example select</label>
                        <select class="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleSelect2">Example multiple select</label>
                        <select multiple class="form-control" id="exampleSelect2">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea">Example textarea</label>
                        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputFile">File input</label>
                        <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                        <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                    </div>
                    <fieldset class="form-group">
                        <legend>Radio buttons</legend>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                                Option one is this and that&mdash;be sure to include why it's great
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
                                Option two can be something else and selecting it will deselect option one
                            </label>
                        </div>
                        <div class="form-check disabled">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
                                Option three is disabled
                            </label>
                        </div>
                    </fieldset>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input">
                            Check me out
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection