@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Posts', 'url' => url('/admin/posts')],
            ['name' => $post->name, 'url' => url('/admin/posts/'.request()->get('id'))],
        ]])
        <!--
        <div class="row">
            <div class="col-12">
                <h1>{{ $post->name }}</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
            </div>
        </div>
        -->
        @include('admin.shared.alerts')
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-pencil-square-o"></i> {{ $post->name }}</div>
            <div class="card-body">
                @include('admin.posts.form', [
                'action' => route('admin_posts_edit_handler', $post->id),
                'post' => $post->toArray(),
                ])
            </div>
            <div class="card-footer small text-muted">Updated at {{ $post->updated_at }}</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection