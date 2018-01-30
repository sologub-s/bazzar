
        <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
            <div class="region-inner region-content-bottom-first-inner">
                <section class="block block-views">
                    <div class="block-inner clearfix">
                        <h2 class="block-title">Облако тегов</h2>
                        <div class="content clearfix">
                            <div class="view view-list-tags">

                                <div class="view-content">
                                    <span>
                                        <?php
                                            $maxTotal = $minTotal = 0;
                                        ?>
                                        @foreach($tags as $i => $tag)
                                            <?php
                                                $maxTotal = $tag->total > $maxTotal ? $tag->total : $maxTotal;
                                                $minTotal = $tag->total < $minTotal ? $tag->total : $minTotal;
                                            ?>
                                        @endforeach
                                        @foreach($tags as $i => $tag)
                                            <?php
                                                $size = 100 / ($maxTotal - $minTotal == 0 ? 1 : $maxTotal - $minTotal) * $tag->total + 100;
                                            ?>
                                            <a style="font-size: {{ $size }}%;" href="{{ route('blog_tag', $tag->slug) }}">#{{ $tag->name }}</a>
                                            @if ($i < sizeof($tags)-1)
                                                ,
                                            @endif
                                        @endforeach
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
