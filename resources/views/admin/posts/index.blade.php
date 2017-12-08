@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Posts', 'url' => url('/admin/posts')],
        ]])
        <div class="row">
            <div class="col-12">
                <!--
                <h1>Posts list</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
                -->
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-table"></i> Posts list <a href="{{ route('admin_posts_add') }}" class="btn btn-primary">Add</a></div>
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
                                                class="jsSortBy sorting{{request()->input('orderby') == 'name' && request()->input('ascdesc') == 'asc' ? '_asc' : ''}}{{request()->input('orderby') == 'name' && request()->input('ascdesc') == 'desc' ? '_desc' : ''}}"
                                                data-sortbylinkasc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'name','ascdesc'=>'asc',]))}}"
                                                data-sortbylinkdesc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'name','ascdesc'=>'desc',]))}}"
                                        >Name</th>
                                        <th>Slug</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Active
                                            <select name="filter_active" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_active'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_active'=>'1']))}}"
                                                {{ request()->input('filter_active') == '1' ? ' selected="selected" ' : '' }}>Yes</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_active'=>'0']))}}"
                                                {{ request()->input('filter_active') == '0' ? ' selected="selected" ' : '' }}>No</option>
                                            </select>
                                        </th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <th rowspan="1" colspan="1">Id</th>
                                        <th rowspan="1" colspan="1">Name</th>
                                        <th rowspan="1" colspan="1">Slug</th>
                                        <th rowspan="1" colspan="1">Active</th>
                                        <th rowspan="1" colspan="1">Action</th>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    <?php
                                            $odd = true;
                                    ?>
                                    @foreach($posts as $post)

                                        <tr role="row" class="{{ $odd ? 'odd' : 'even' }}">
                                            <td class="">{{$post->id}}</td>
                                            <td>{{$post->name}} @if(!empty($post->image))<br /><img src="{{$post->image}}" style="max-width: 200px;" />@endif</td>
                                            <td>{{$post->slug}}</td>
                                            <td class="text-center">
                                                <button type="button" class="jsTogglePostActiveButton btn {{ $post->active ? 'btn-success active' : 'btn-outline-success' }}" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Changing..." autocomplete="off" data-id="{{$post->id}}" data-default-text="Active">
                                                    Active
                                                </button>
                                                <small class="text-danger hidden"></small>
                                            </td>
                                            <td>
                                                <a class="btn btn-outline-warning btn-block" href="{{ url()->current() }}/{{ $post->id }}" role="button">Edit</a><br />
                                                <a class="btn btn-outline-primary btn-block" target="_blank" href="#" role="button">Open on site</a>
                                            </td>
                                        </tr>
                                        <?php $odd = !$odd; ?>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {{ $posts->appends(request()->except('page'))->links('admin.shared.pagination') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection