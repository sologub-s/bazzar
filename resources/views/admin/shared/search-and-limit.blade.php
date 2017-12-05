<div class="row">
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
    <div class="col-sm-12 col-md-6">
        <div id="dataTable_filter" class="dataTables_filter ">
            <label>Search:<input type="search" id="search_request_input" class="form-control" placeholder="" aria-controls="dataTable" value="{{ request()->input('search_request') }}"></label>
            <button class="btn btn-outline-primary" target="_blank" role="button" onclick="location.href='{{url()->current().'?'.http_build_query(request()->except('search_request'))}}&search_request='+$('#search_request_input').val()">Search</button>
        </div>
    </div>
</div>