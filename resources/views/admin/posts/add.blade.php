@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Posts', 'url' => url('/admin/posts')],
            ['name' => 'New post', 'url' => url('/admin/posts/add')],
        ]])
        <!--
        <div class="row">
            <div class="col-12">
                <h1>New post</h1>
                <p>Hello world from empty page.</p>
                <p>{{url()->current().(request()->except('page')?'?':'').http_build_query(request()->except('page'))}}</p>
            </div>
        </div>
        -->
        @include('admin.shared.alerts')
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-pencil-square-o"></i> New post</div>
            <div class="card-body">
                @include('admin.posts.form', [
                'action' => route('admin_posts_add_handler'),
                'post' => [
                    'name' => old('name'),
                    'slug' => old('slug'),
                    'active' => old('active'),
                    'content' => old('content'),
                    'image' => old('image'),
                    ],
                ])
            </div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection