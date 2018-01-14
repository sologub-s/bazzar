@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        @include('shared.breadcrumbs', ['breadcrumbs' => [
            ['name' => 'Settings', 'url' => route('admin_settings')],
        ]])
        <div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-table"></i> Settings
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <div id="dataTable_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered table-hover dataTable" id="dataTable" width="100%"
                                       cellspacing="0" role="grid" aria-describedby="dataTable_info"
                                       style="width: 100%;">
                                    <thead>
                                    <tr role="row">
                                        <th>Id</th>
                                        <th>Key</th>
                                        <th>Value</th>
                                        <th>Enabled</th>
                                        <th>Description</th>
                                        <th>Edit</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <th rowspan="1" colspan="1">Id</th>
                                        <th rowspan="1" colspan="1">Key</th>
                                        <th rowspan="1" colspan="1">Value</th>
                                        <th rowspan="1" colspan="1">Enabled</th>
                                        <th rowspan="1" colspan="1">Description</th>
                                        <th rowspan="1" colspan="1">Edit</th>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    <?php $odd = true; ?>
                                    @foreach($settings as $setting)
                                        <tr role="row" class="{{ $odd ? 'odd' : 'even' }}">
                                            <td class="">
                                                {{$setting->id}}
                                            </td>
                                            <td>
                                                {{$setting->key}}
                                            </td>
                                            <td>
                                                {{empty($setting->value) ? '<small><i>&lt;no&nbsp;value&rt;</i></small>' : str_limit($setting->value, 200, '...')}}
                                            </td>
                                            <td>
                                                {{$setting->enabled ? 'Enabled' : 'Disabled'}}
                                            </td>
                                            <td>
                                                {{empty($setting->description) ? '<small><i>&lt;no&nbsp;description&rt;</i></small>' : str_limit($setting->description, 200, '...')}}
                                            </td>
                                            <td>
                                                <a href="{{url()->current() . '/edit/' . $setting->id}}"><i class="fa fa-edit"></i></a>
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
        </div>
    </div>
    <!-- /.container-fluid-->
@endsection
