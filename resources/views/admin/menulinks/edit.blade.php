@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Menu Links', 'url' => url('/admin/menulinks')],
            ['name' => $menuLink->name ?? '<new>', 'url' => url('/admin/menulinks/'.request()->get('id'))],
        ]])
        @include('admin.shared.alerts')
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-pencil-square-o"></i> {{ $menuLink->name ?? 'new menu link' }}
            </div>
            <div class="card-body">
                <form method="post" enctype="multipart/form-data" action="{{ route('admin_menulinks_edit_handler', $menuLink->id ?? null) }}">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="control_name">Name</label>
                                <input type="text" class="form-control" id="control_name" aria-describedby="control_name_help" placeholder="Enter link name" name='name' value="{{ $menuLink->name ?? old('name') ?? '' }}">
                                <!--<small id="control_name_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
                            </div>

                            <div class="form-group">
                                <label for="control_slug">Href</label>
                                <input type="text" class="form-control" id="control_href" aria-describedby="control_href_help" placeholder="Enter link href" name='href' value="{{ $menuLink->href ?? old('href') ?? '' }}">
                                <!--<small id="control_slug_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
                            </div>

                            <div class="form-group">
                                <label for="control_slug">Target</label>
                                <input type="text" class="form-control" id="control_target" aria-describedby="control_href_help" placeholder="_blank/_self" name='target' value="{{ $menuLink->target ?? old('target') ?? '' }}">
                                <!--<small id="control_slug_help" class="form-text text-muted disabled">Автоматическое поле</small>-->
                            </div>

                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input jsBootstrapSwitch" {{ $menuLink->active ?? '' == 1 || old('active') == 1 ? 'checked' : '' }} name="active" data-on-text="Enabled" data-off-text="Disabled" data-on-color="success">
                                </label>
                            </div>

                            <div class="form-group">
                                <label for="control_parent_id">Custom type</label>
                                <select class="form-control" id="control_custom_type" name="custom_type">
                                    <option value="" {{ !($menuLink->custom_type ?? false) ? 'selected="selected"' : '' }}>none</option>
                                    @foreach(['main', 'catalogue', 'blog', 'contacts','shops',] as $item)
                                        <option value="{{ $item }}" {{ ($menuLink->custom_type ?? '') == $item ? 'selected="selected"' : '' }}>{{ $item }}</option>
                                    @endforeach;
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="control_parent_id">Parent</label>
                                <select class="form-control" id="control_parent_id" name="parent_id">
                                    <option value="" {{ !($menuLink->parent_id ?? false) ? 'selected="selected"' : '' }}>none</option>
                                    @foreach($menuLinks as $item)
                                        @if(($menuLink->id ?? '') != $item->id)
                                            <option value="{{ $item->id }}" {{ $menuLink->parent_id ?? '' == $item->id ? 'selected="selected"' : '' }}>{{ $item->name }}</option>
                                        @endif
                                    @endforeach;
                                </select>
                            </div>

                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div class="card-footer small text-muted">Updated at {{ $menuLink->updated_at ?? 'never' }}</div>
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection