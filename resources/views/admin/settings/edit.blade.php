@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('admin.shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Settings', 'url' => route('admin_settings')],
        ]])
        @include('admin.shared.alerts')
        <div class="card mb-6">
            <div class="card-header">
                <i class="fa fa-key"></i> Manage settings
            </div>
            <div class="card-body">
                <div class="col-sm-4">
                    <form method="post" action="">
                        <div class="form-group">
                            <label><strong>Key</strong></label>
                            <input class="form-control" type="text" name="key" placeholder="Enter key" value="{{ old('key') ?? (empty($setting->key) ? '' : $setting->key) }}" />
                        </div>
                        <div class="form-group">
                            <label><strong>Value</strong></label>
                            <textarea class="form-control" name="value" rows="10" placeholder="Enter value">{{ old('value') ?? (empty($setting->value) ? '' : $setting->value) }}</textarea>
                        </div>
                        <div class="form-group">
                            <label><strong>Enabled</strong></label>
                            <select class="form-control" name="enabled">
                                <option value="1" {{ old('enabled') == '1' || (empty($setting->enabled ?? '')) || (!empty($setting->enabled ?? '') && $setting->enabled == '1') }}>Enabled</option>
                                <option value="0" {{ old('enabled') == '0' || (!empty($setting->enabled ?? '') && $setting->enabled == '0') }}>Disabled</option>

                            </select>
                        </div>
                        <div class="form-group">
                            <label><strong>Description (for humans only)</strong></label>
                            <textarea class="form-control" name="description" placeholder="Enter description">{{ old('description') ?? (empty($setting->description) ? '' : $setting->description) }}</textarea>
                        </div>
                        <button class="btn btn-primary btn-block">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
