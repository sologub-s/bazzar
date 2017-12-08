@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Contentblocks', 'url' => url('/admin/contentblocks')],
            ['name' => $contentblock->name, 'url' => url('/admin/contentblocks/'.request()->get('id'))],
        ]])
        <!--
        <div class="row">
            <div class="col-12">
                <h1>{{ $contentblock->name }}</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
            </div>
        </div>
        -->
        @include('admin.shared.alerts')
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-pencil-square-o"></i> {{ $contentblock->name }}</div>
            <div class="card-body">
                @include('admin.contentblocks.form', [
                'action' => route('admin_contentblocks_edit_handler', $contentblock->id),
                'contentblock' => $contentblock->toArray(),
                ])
            </div>
            <div class="card-footer small text-muted">Updated at {{ $contentblock->updated_at }}</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection