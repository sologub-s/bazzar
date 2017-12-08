<div class="row">
    @if($limit ?? true)
    <div class="col-sm-12 col-md-6">
        <div class="dataTables_length" id="dataTable_length">
            <label>Show <select name="paginate_amount" aria-controls="dataTable" class="form-control form-control-sm jsApplyFilter" onchange="location.href=$(this).val()">
                    <?php $availableLimits = [10, 25, 50, 100]; ?>
                    @foreach($availableLimits as $availableLimit)
                        <option value="{{url()->current().'?'.http_build_query(array_merge(request()->all(),['items_limit'=>$availableLimit]))}}"
                                {{ request()->input('items_limit') == $availableLimit ? ' selected="selected" ' : '' }}>{{$availableLimit}}</option>
                    @endforeach
                </select> entries</label>
        </div>
    </div>
    @endif
    @if($search ?? true)
    <div class="col-sm-12 col-md-6">
        <div id="dataTable_filter" class="input-group dataTables_filter jsSearchContainer">
            <input type="search" id="search_request_input" class="form-control jsSearchInput" value="{{ request()->input('search_request') }}" placeholder="Search for...">
            <span class="input-group-btn">
                <button {!! empty(request()->input('search_request')) ? 'style="display: none;"' : '' !!} class="btn btn-secondary jsSearchReset" type="button" data-reseturl="{{url()->current().'?'.http_build_query(request()->except('search_request'))}}"><i class="fa fa-times" aria-hidden="true"></i></button>
                <button class="btn btn-outline-primary jsSearchGo" data-gourl="{{url()->current().'?'.http_build_query(request()->except('search_request'))}}" type="button">Go!</button>
            </span>
        </div>
    </div>
    @endif
</div>