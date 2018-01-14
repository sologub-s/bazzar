@extends('layouts.app')

@section('contentleft')
    {{-- @include('shared.messages') --}}
<div class="grid-12 region region-content" id="region-content">
    <div class="region-inner region-content-inner">
        <a id="main-content"></a>
        <div class="tabs clearfix"></div>
        <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
            <div class="region-inner region-content-bottom-first-inner">

                {{-- @include('shared.buisiness') --}}
                @include('shared.recent')
                @include('shared.recent')
            </div>
        </div>
    </div>
</div>
@endsection