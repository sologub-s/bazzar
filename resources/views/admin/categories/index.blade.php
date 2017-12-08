@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Categories', 'url' => url('/admin/categories')],
        ]])
        <div class="row">
            <div class="col-12">
                <!--
                <h1>Categories list</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
                -->
            </div>
        </div>
        @include('admin.shared.alerts')
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-table"></i> Categories list <input type="checkbox" class="form-check-input jsBootstrapSwitch jsToggleBrokenCategories" data-on-text="Show broken" data-off-text="Hide broken" data-on-color="success"></div>
            <div class="card-body">
                <div class="table-responsive">
                    <div id="dataTable_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        <div class="row">
                            <div class="col-sm-12">
                                @include('admin.categories.subindex', ['tree' => $categoriesTree, 'level' => 0])
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection