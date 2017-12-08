@if(request()->session()->has('status'))
    <div class="alert alert-success" role="alert">
        {!! create_anchors(request()->session()->get('status'), '_blank') !!}
    </div>
@endif
@if(request()->session()->has('error'))
    <div class="alert alert-danger" role="alert">
        {!! create_anchors(request()->session()->get('error'), '_blank') !!}
    </div>
@endif