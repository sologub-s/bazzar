@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Contentblocks', 'url' => url('/admin/contentblocks')],
            ['name' => 'New contentblock', 'url' => url('/admin/contentblocks/add')],
        ]])
        <!--
        <div class="row">
            <div class="col-12">
                <h1>New contentblock</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
            </div>
        </div>
        -->
        @include('admin.shared.alerts')
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-pencil-square-o"></i> New contentblock</div>
            <div class="card-body">
                @include('admin.contentblocks.form', [
                'action' => route('admin_contentblocks_add_handler'),
                'contentblock' => [
                    'name' => old('name'),
                    'slug' => old('slug'),
                    'active' => old('active'),
                    'content' => old('content'),
                    ],
                ])
            </div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection