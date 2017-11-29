<!-- Breadcrumbs-->
<ol class="breadcrumb">
    <li class="breadcrumb-item {{ !sizeof($breadcrumbs) ? 'active' : '' }}">
        <a href="/admin">Dashboard</a>
    </li>
    @foreach($breadcrumbs as $k => $item)
    <li class="breadcrumb-item active">
        @if($k == sizeof($breadcrumbs)-1)
            {{ $item['name'] }}
        @else
            <a href="{{ $item['url'] }}">{{ $item['name'] }}</a>
        @endif
    </li>
    @endforeach
</ol>