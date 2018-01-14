<!-- Breadcrumbs-->
<h2 class="block-title">
@foreach($breadcrumbs as $k => $item)
    @if($k == sizeof($breadcrumbs)-1 && !($uncompleted ?? false))
        <strong>{{ $item['name'] }}</strong>
    @else
        <a href="{{ $item['url'] }}">{{ $item['name'] }}</a><span>&nbsp;/&nbsp;</span>
    @endif
@endforeach
</h2>