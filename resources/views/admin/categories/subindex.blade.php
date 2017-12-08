<ul class="list-group">
    @foreach($tree as $category)
        <li class="list-group-item list-group-item-action list-group-item-{{ !$category['broken'] ? 'success' : 'danger jsBrokenCategory d-none' }}">
            <div class="row">
                    <div class="col-1">
                        @for($i = 0; $i < $level; $i++)-@endfor{{ $category['id'] }}.
                    </div>
                    <div class="col-2">
                        {{ $category['name'] }}
                    </div>
                    @if(!sizeof($category['children']))
                    <div class="col-4">
                        <div class="form-group">
                            <input type="text" class="form-control" name="search_terms" placeholder="Search terms..." value="{{ $category['terms'] }}" />
                        </div>
                    </div>
                    <div class="col-4">
                        {{--
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input jsBootstrapSwitch" {{$category['active'] ? 'checked="checked"' : ''}} data-on-text="On" data-off-text="Off" data-on-color="success">
                            </label>
                        </div>
                        --}}
                        <button class="btn btn-outline-primary btn-block jsSaveCategory" data-url="{{ route('admin_categories_saveterms_handler', ['id'=>$category['id']]) }}">Save</button>
                    </div>
                    @else
                    <button class="btn btn-outline-primary" data-toggle="collapse" data-target="#row_{{ $category['id'] }}">Show children</button>
                    @endif
            </div>
            @if(sizeof($category['children']))
            <div class="row">
                <div class="col-12 collapse" id="row_{{ $category['id'] }}">
                        <hr />
                        @include('admin.categories.subindex', ['tree' => $category['children'], 'level' => $level+1])
                </div>
            </div>
            @endif
        </li>
    @endforeach
</ul>