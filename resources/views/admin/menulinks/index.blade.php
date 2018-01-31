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

                                @foreach($menuLinks as $menuLink)
                                    @include('admin.menulinks.item', ['menuLink' => $menuLink,])
                                @endforeach

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