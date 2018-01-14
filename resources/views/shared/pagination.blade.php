@if ($paginator->hasPages())
<?php
    $from = ($paginator->currentPage() - 1) * $paginator->perPage() + 1;
?>
<div class="item-list">
    <ul class="pager clearfix">
    {{-- Previous Page Link --}}
    @if ($paginator->onFirstPage())
    @else
        <li class="pager-previous"><a href="{{ $paginator->previousPageUrl() }}"><i class="fa fa-chevron-left" aria-hidden="true"></i></a></li>
    @endif

    @foreach ($elements as $element)
        {{-- "Three Dots" Separator --}}
        @if (is_string($element))
            <li class="pager-dots">{{ $element }}</li>
        @endif

        {{-- Array Of Links --}}
        @if (is_array($element))
            @foreach ($element as $page => $url)
                @if ($page == $paginator->currentPage())
                    <li class="pager-current">{{ $page }}</li>
                @else
                    <li class="pager-item"><a href="{{ $url }}">{{ $page }}</a></li>
                @endif
            @endforeach
        @endif
    @endforeach

    {{-- Next Page Link --}}
    @if ($paginator->hasMorePages())
        <li class="pager-previous"><a href="{{ $paginator->nextPageUrl() }}"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
    @else
    @endif

    </ul>
</div>

@endif











<!--
<div class="item-list">
    <ul class="pager clearfix">
        <li class="pager-current">1</li>
        <li class="pager-item"><a href="/users/admin?page=1">2</a></li>
        <li class="pager-item"><a href="/users/admin?page=2">3</a></li>
        <li class="pager-item"><a href="/users/admin?page=3">4</a></li>
        <li class="pager-next"><a href="/users/admin?page=1">следующая ›</a></li>
        <li class="pager-last last"><a href="/users/admin?page=3">последняя »</a></li>
    </ul>
</div>
-->











<?php /*

@if ($paginator->hasPages())
<?php
    $from = ($paginator->currentPage() - 1) * $paginator->perPage() + 1;
?>
<div class="row">
    <div class="col-sm-12 col-md-5">
        <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing {{ $from }} to {{ min($from + $paginator->perPage() - 1, $paginator->total()) }} of {{ $paginator->total() }} entries</div>
    </div>
    <div class="col-sm-12 col-md-7">
        <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
            <ul class="pagination">
                {{-- Previous Page Link --}}
                @if ($paginator->onFirstPage())
                    <li class="paginate_button page-item disabled previous">
                        <a href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                    </li>
                @else
                    <li class="paginate_button page-item">
                        <a href="{{ $paginator->previousPageUrl() }}" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                    </li>
                @endif

                {{-- Pagination Elements --}}
                @foreach ($elements as $element)
                    {{-- "Three Dots" Separator --}}
                    @if (is_string($element))
                        <li class="paginate_button page-item disabled">
                            <a href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">{{ $element }}</a>
                        </li>
                    @endif

                    {{-- Array Of Links --}}
                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())
                                <li class="paginate_button page-item active disabled">
                                    <a href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">{{ $page }}</a>
                                </li>
                            @else
                                <li class="paginate_button page-item">
                                    <a href="{{ $url }}" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">{{ $page }}</a>
                                </li>
                            @endif
                        @endforeach
                    @endif
                @endforeach

                {{-- Next Page Link --}}
                @if ($paginator->hasMorePages())
                    <li class="paginate_button page-item">
                        <a href="{{ $paginator->nextPageUrl() }}" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Next</a>
                    </li>
                @else
                    <li class="paginate_button page-item disabled">
                        <a href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Next</a>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</div>

@endif

 */ ?>