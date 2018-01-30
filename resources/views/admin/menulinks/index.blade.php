@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Menu links', 'url' => url('/admin/menulinks')],
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
                <i class="fa fa-table"></i> Menu links list</div>
            <div class="card-body">
                <div class="table-responsive">
                    <div id="dataTable_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered table-hover dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                                    <thead>
                                    <tr role="row">
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Href</th>
                                        <th>Target</th>
                                        <th>Custom type</th>
                                        <th>Parent</th>
                                        <th>Active</th>
                                        <th class="" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" style="">Actions</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Href</th>
                                        <th>Target</th>
                                        <th>Custom type</th>
                                        <th>Parent</th>
                                        <th>Active</th>
                                        <th>Actions</th>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    <?php
                                            $odd = true;
                                    ?>
                                    @foreach($menuLinks as $menuLink)

                                        <tr role="row" class="{{ $odd ? 'odd' : 'even' }}">
                                            <td class="">{{$menuLink->id}}</td>
                                            <td>{{$menuLink->name}}</td>
                                            <td>{{$menuLink->href}}</td>
                                            <td>{{$menuLink->target}}</td>
                                            <td>{{$menuLink->custom_type}}</td>
                                            <td>{{$menuLink->parent ? $menuLink->parent->name : ''}}</td>
                                            <td class="text-center">
                                                <button type="button" class="jsToggleMenuLinkActiveButton btn {{ $menuLink->active ? 'btn-success active' : 'btn-outline-success' }}" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Changing..." autocomplete="off" data-id="{{$menuLink->id}}" data-default-text="Active">
                                                    Active
                                                </button>
                                                <small class="text-danger hidden"></small>
                                            </td>
                                            <td>
                                                <a class="btn btn-outline-info btn-block" href="{{ route('admin_menulinks_move', ['direction' => 'up', 'id' => $menuLink->id]) }}" role="button">Move up</a><br />
                                                <a class="btn btn-outline-info btn-block" href="{{ route('admin_menulinks_move', ['direction' => 'down', 'id' => $menuLink->id]) }}" role="button">Move down</a><br />
                                                <a class="btn btn-outline-warning btn-block" href="{{ route('admin_menulinks_edit', $menuLink->id) }}" role="button">Edit</a><br />
                                                <a class="btn btn-outline-danger btn-block" href="{{ route('admin_menulinks_delete', $menuLink->id) }}" role="button">Delete</a><br />
                                            </td>
                                        </tr>
                                        <?php $odd = !$odd; ?>
                                    @endforeach
                                    </tbody>
                                </table>
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