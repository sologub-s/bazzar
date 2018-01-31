@extends('layouts.app')

@section('contentleft')
<div class="grid-12 region region-content" id="region-content">
    <div class="region-inner region-content-inner">
        <a id="main-content"></a>
        <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
            <div class="region-inner region-content-bottom-first-inner">
                <section class="block block-views">
                    <div class="block-inner clearfix">
                        <h2 class="block-title">Контакты</h2>
                        <div class="content clearfix">
                            <div class="view view-list-tags">

                                <div class="view-content">
                                    {!! $contacts['content'] ?? '' !!}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection