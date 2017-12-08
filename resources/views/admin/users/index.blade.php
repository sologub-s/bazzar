@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Users', 'url' => url('/admin/users')],
        ]])
        <div class="row">
            <div class="col-12">
                <!--
                <h1>Users list</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
                -->
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-table"></i> Users list</div>
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
                                        <th
                                                class="jsSortBy sorting{{request()->input('orderby') == 'email' && request()->input('ascdesc') == 'asc' ? '_asc' : ''}}{{request()->input('orderby') == 'email' && request()->input('ascdesc') == 'desc' ? '_desc' : ''}}"
                                                data-sortbylinkasc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'email','ascdesc'=>'asc',]))}}"
                                                data-sortbylinkdesc="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['orderby'=>'email','ascdesc'=>'desc',]))}}"
                                        >Email</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Admin
                                            <select name="filter_admin" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_admin'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_admin'=>'1']))}}"
                                                {{ request()->input('filter_admin') == '1' ? ' selected="selected" ' : '' }}>Yes</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_admin'=>'0']))}}"
                                                {{ request()->input('filter_admin') == '0' ? ' selected="selected" ' : '' }}>No</option>
                                            </select>
                                        </th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Banned
                                            <select name="filter_banned" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter">
                                                <option value="{{url()->current().'?'.http_build_query(request()->except('filter_banned'))}}">*</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_banned'=>'1']))}}"
                                                        {{ request()->input('filter_banned') == '1' ? ' selected="selected" ' : '' }}>1</option>
                                                <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['filter_banned'=>'0']))}}"
                                                        {{ request()->input('filter_banned') == '0' ? ' selected="selected" ' : '' }}>0</option>
                                            </select>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <th rowspan="1" colspan="1">Id</th>
                                        <th rowspan="1" colspan="1">Name</th>
                                        <th rowspan="1" colspan="1">Email</th>
                                        <th rowspan="1" colspan="1">Admin</th>
                                        <th rowspan="1" colspan="1">Banned</th>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    <?php
                                            $odd = true;
                                    ?>
                                    @foreach($users as $user)

                                        <tr role="row" class="{{ $odd ? 'odd' : 'even' }}">
                                            <td class="">{{$user->id}}</td>
                                            <td>{{$user->name}}</td>
                                            <td>{{$user->email}}</td>
                                            <td class="text-center">
                                                <button type="button" class="jsToggleAdminButton {{ $user->id == Auth::user()->id ? 'disabled' : '' }} btn {{ !$user->hasRole('Admin') ? 'btn-outline-primary' : 'btn-primary active' }}" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Changing..." autocomplete="off" data-id="{{$user->id}}" data-default-text="Admin">
                                                    Admin
                                                </button>
                                                <small class="text-danger hidden"></small>
                                            </td>
                                            <td class="text-center">
                                                <button type="button" class="jsToggleBannedButton {{ $user->id == Auth::user()->id ? 'disabled' : '' }} btn {{ !$user->banned ? 'btn-outline-warning' : 'btn-warning active' }}" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Changing..." autocomplete="off" data-id="{{$user->id}}" data-default-text="Banned">
                                                    Banned
                                                </button>
                                                <small class="text-danger hidden"></small>
                                            </td>
                                        </tr>
                                        <?php $odd = !$odd; ?>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {{ $users->appends(request()->except('page'))->links('admin.shared.pagination') }}
                    </div>
                </div>
            </div>
            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection