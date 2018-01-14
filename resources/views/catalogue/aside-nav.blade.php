{{--
<section class="block block-aside">
    <div class="block-inner clearfix">
        <h2 class="block-title">Каталог</h2>

        <div class="content clearfix">

            @if(sizeof($categoriesTree ?? []))
            <ul>
                @foreach($categoriesTree as $topCategory)
                    <li><a href="{{ route('catalogue_inside', $topCategory['id']) }}" class="padding-small"><strong><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;{{ $topCategory['name'] }}</strong></a>
                        @if(sizeof($topCategory['children'] ?? []))
                            <ul style="margin-left: 10px;">
                            @foreach($topCategory['children'] as $category1)
                                    <li><a href="{{ route('catalogue_inside', $topCategory['id'].'/'.$category1['id']) }}" class="padding-small">{{ $category1['name'] }}</a>
                                        @if(sizeof($category1['children'] ?? []))
                                            <ul style="margin-left: 10px;">
                                                @foreach($category1['children'] as $category2)
                                                    <li><a href="{{ route('catalogue_inside', $topCategory['id'].'/'.$category1['id'].'/'.$category2['id']) }}" class="padding-small"><i>{{ $category2['name'] }}</i></a></li>
                                                @endforeach
                                            </ul>
                                        @endif
                                    </li>
                            @endforeach
                            </ul>
                        @endif
                    </li>
                @endforeach
            </ul>
            @endif

        </div>
    </div>
</section>
--}}