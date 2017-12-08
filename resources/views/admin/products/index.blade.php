@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Products', 'url' => url('/admin/products')],
        ]])
        <div class="row">
            <div class="col-12">
                <!--
                <h1>Products list</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
                -->
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-table"></i> Products list</div>
            <div class="card-body">
                <div class="table-responsive">
                    <div id="dataTable_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        @include('admin.shared.search-and-limit')
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered table-hover dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                    <thead>
                                    <tr role="row">
                                        <th
                                                class="jsSortBy sorting{{request()->input('orderby', 'id') == 'id' && request()->input('ascdesc', 'asc') == 'asc' ? '_asc' : ''}}{{request()->input('orderby', 'id') == 'id' && request()->input('ascdesc') == 'desc' ? '_desc' : ''}}"
                                                data-sortbylinkasc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'id','ascdesc'=>'asc',]))}}"
                                                data-sortbylinkdesc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'id','ascdesc'=>'desc',]))}}"
                                        >Id</th>
                                        <th
                                                class="jsSortBy sorting{{request()->input('orderby') == 'name' && request()->input('ascdesc', 'asc') == 'asc' ? '_asc' : ''}}{{request()->input('orderby') == 'name' && request()->input('ascdesc') == 'desc' ? '_desc' : ''}}"
                                                data-sortbylinkasc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'name','ascdesc'=>'asc',]))}}"
                                                data-sortbylinkdesc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'name','ascdesc'=>'desc',]))}}"
                                        >Name+Slug</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Category" style="">Category
                                            <select name="filter_category" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_category'))}}">*</option>
                                                @foreach($categories as $category)
                                                    <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_category'=>$category->id]))}}"
                                                    {{ request()->input('filter_category') == $category->id ? ' selected="selected" ' : '' }}>{{$category->name}}</option>
                                                @endforeach
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Brand" style="">Brand
                                            <select name="filter_brand" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_brand'))}}">*</option>
                                                @foreach($brands as $brand)
                                                    <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_brand'=>$brand->id]))}}"
                                                    {{ request()->input('filter_brand') == $brand->id ? ' selected="selected" ' : '' }}>{{$brand->name}}</option>
                                                @endforeach
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Img</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Active
                                            <select name="filter_active" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_active'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_active'=>'1']))}}"
                                                {{ request()->input('filter_active') == '1' ? ' selected="selected" ' : '' }}>1</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_active'=>'0']))}}"
                                                {{ request()->input('filter_active') == '0' ? ' selected="selected" ' : '' }}>0</option>
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">In&nbsp;stock
                                            <select name="filter_in_stock" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_in_stock'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_in_stock'=>'1']))}}"
                                                {{ request()->input('filter_in_stock') == '1' ? ' selected="selected" ' : '' }}>1</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_in_stock'=>'0']))}}"
                                                {{ request()->input('filter_in_stock') == '0' ? ' selected="selected" ' : '' }}>0</option>
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Parsed
                                            <select name="filter_parsed" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
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
                                            <td class="text-center"><img src="{{$product->img}}" /></td>
                                            <td class="text-center">
                                                <button type="button" class="jsToggleProductActiveButton btn {{ $product->active ? 'btn-success active' : 'btn-outline-success' }}" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Changing..." autocomplete="off" data-id="{{$product->id}}" data-default-text="Active">
                                                    Active
                                                </button>
                                                <small class="text-danger hidden"></small>
                                            </td>
                                            <td class="text-center">{{$product->in_stock}}</td>
                                            <td class="text-center">{{$product->parsed}}</td>
                                            <td>{!! implode('<br />', array_map(function($v){
                                                return $v['price'];
                                            }, $product->prices->toArray())) !!}</td>
                                            <td>
                                                <a class="btn btn-outline-warning btn-block" href="{{ route('admin_products_edit', $product->id) }}" role="button">Edit</a><br />
                                                <a class="btn btn-outline-primary btn-block" target="_blank" href="#" role="button">Open on site</a>
                                            </td>
                                        </tr>
                                        <?php $odd = !$odd; ?>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {{ $products->appends(request()->except('page'))->links('admin.shared.pagination') }}
                    </div>
                </div>
            </div>
            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection