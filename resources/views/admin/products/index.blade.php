@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Products', 'url' => url('/admin/products')],
        ]])
        <div class="row">
            <div class="col-12">
                <h1>Products list</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-table"></i> Products</div>
            <div class="card-body">
                <div class="table-responsive">
                    <div id="dataTable_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="dataTables_length" id="dataTable_length">
                                    <label>Show <select name="paginate_amount" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter" onchange="location.href=$(this).val()">
                                            <?php $availableLimits = [10, 25, 50, 100]; ?>
                                            @foreach($availableLimits as $availableLimit)
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['items_limit'=>$availableLimit]))}}"
                                                {{ request()->input('items_limit') == $availableLimit ? ' selected="selected" ' : '' }}>{{$availableLimit}}</option>
                                            @endforeach
                                        </select> entries</label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div id="dataTable_filter" class="dataTables_filter">
                                    <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="dataTable"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered table-hover dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                    <thead>
                                    <tr role="row">
                                        <th class="sorting_asc" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="">Id</th>
                                        <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Name+Slug: activate to sort column descending" style="">Name+Slug</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Category" style="">Category
                                            <select name="filter_category" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter" onchange="location.href=$(this).val()">
                                                <option value="">*</option>
                                                @foreach($categories as $category)
                                                    <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_category'=>$category->id]))}}"
                                                    {{ request()->input('filter_category') == $category->id ? ' selected="selected" ' : '' }}>{{$category->name}}</option>
                                                @endforeach
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Brand" style="">Brand
                                            <select name="filter_brand" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter" onchange="location.href=$(this).val()">
                                                <option value="">*</option>
                                                @foreach($brands as $brand)
                                                    <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_brand'=>$brand->id]))}}"
                                                    {{ request()->input('filter_brand') == $brand->id ? ' selected="selected" ' : '' }}>{{$brand->name}}</option>
                                                @endforeach
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Img</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Active
                                            <select name="filter_active" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter" onchange="location.href=$(this).val()">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_active'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_active'=>'1']))}}"
                                                {{ request()->input('filter_active') == '1' ? ' selected="selected" ' : '' }}>1</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_active'=>'0']))}}"
                                                {{ request()->input('filter_active') == '0' ? ' selected="selected" ' : '' }}>0</option>
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">In&nbsp;stock
                                            <select name="filter_in_stock" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter" onchange="location.href=$(this).val()">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_in_stock'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_in_stock'=>'1']))}}"
                                                {{ request()->input('filter_in_stock') == '1' ? ' selected="selected" ' : '' }}>1</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_in_stock'=>'0']))}}"
                                                {{ request()->input('filter_in_stock') == '0' ? ' selected="selected" ' : '' }}>0</option>
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Parsed
                                            <select name="filter_parsed" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter" onchange="location.href=$(this).val()">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_parsed'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_parsed'=>'1']))}}"
                                                {{ request()->input('filter_parsed') == '1' ? ' selected="selected" ' : '' }}>1</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_parsed'=>'0']))}}"
                                                {{ request()->input('filter_parsed') == '0' ? ' selected="selected" ' : '' }}>0</option>
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Price</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Actions</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <th rowspan="1" colspan="1">Id</th>
                                        <th rowspan="1" colspan="1">Name+Slug</th>
                                        <th rowspan="1" colspan="1">Category</th>
                                        <th rowspan="1" colspan="1">Brand</th>
                                        <th rowspan="1" colspan="1">Img</th>
                                        <th rowspan="1" colspan="1">Active</th>
                                        <th rowspan="1" colspan="1">In stock</th>
                                        <th rowspan="1" colspan="1">Parsed</th>
                                        <th rowspan="1" colspan="1">Price</th>
                                        <th rowspan="1" colspan="1">Actions</th>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    <?php
                                            $odd = true;
                                    ?>
                                    @foreach($products as $product)

                                        <tr role="row" class="{{ $odd ? 'odd' : 'even' }}">
                                            <td class="">{{$product->id}}</td>
                                            <td>{{$product->name}}<br /><small>{{$product->slug}}</small></td>
                                            <td>{{$product->category->name}}</td>
                                            <td>{{$product->brand->name}}</td>
                                            <td><img src="{{$product->img}}" /></td>
                                            <td>{{$product->active}}</td>
                                            <td>{{$product->in_stock}}</td>
                                            <td>{{$product->parsed}}</td>
                                            <td>{!! implode('<br />', array_map(function($v){
                                                return $v['price'];
                                            }, $product->prices->toArray())) !!}</td>
                                            <td>
                                                <a class="btn btn-outline-warning btn-block" href="#" role="button">Edit</a><br />
                                                <a class="btn btn-outline-primary btn-block" target="_blank" href="#" role="button">Open on site</a>
                                            </td>
                                        </tr>
                                        <?php $odd = !$odd; ?>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-5">
                                <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                            </div>
                            <div class="col-sm-12 col-md-7">
                                <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                    {{ $products->appends(request()->except('page'))->links('admin.shared.pagination') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection