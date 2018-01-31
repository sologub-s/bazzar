<div class="card @if($menuLink->parent) ml-5 @endif">
    <div class="card-body d-flex">
        <div class="col-md-4">
            <strong>{{$menuLink->name ?? $menuLink->custom_type ?? 'not_set'}}</strong>
            <br />
            <small>href: {{$menuLink->href ?? 'not_set'}}</small>, target: {{$menuLink->target ?? 'not_set'}}
            <br />
            custom type: {{$menuLink->custom_type ?? 'not_set'}}
            <br />
            parent: {{$menuLink->parent->name ?? 'not_set'}}
        </div>
        <div class="col-md-1">
            <button type="button" class="jsToggleMenuLinkActiveButton btn {{ $menuLink->active ? 'btn-success active' : 'btn-outline-success' }}" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Changing..." autocomplete="off" data-id="{{$menuLink->id}}" data-default-text="Active">
                Active
            </button>
        </div>
        <div class="col-md-4 ml-auto">
            <a class="btn btn-outline-info btn-block" href="{{ route('admin_menulinks_move', ['direction' => 'up', 'id' => $menuLink->id]) }}" role="button">Move up</a><br />
            <a class="btn btn-outline-info btn-block" href="{{ route('admin_menulinks_move', ['direction' => 'down', 'id' => $menuLink->id]) }}" role="button">Move down</a><br />
            <a class="btn btn-outline-warning btn-block" href="{{ route('admin_menulinks_edit', $menuLink->id) }}" role="button">Edit</a><br />
            <a class="btn btn-outline-danger btn-block" href="{{ route('admin_menulinks_delete', $menuLink->id) }}" role="button">Delete</a><br />
        </div>
    </div>
</div>
@if (sizeof($menuLink->menulinks))
    @foreach($menuLink->menulinks as $child)
        @include('admin.menulinks.item', ['menuLink' => $child])
    @endforeach
@endif