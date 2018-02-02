@extends('layouts.app')

@section('contentleft')
<div class="grid-12 region region-content" id="region-content">
    <div class="region-inner region-content-inner">
        <a id="main-content"></a>
        <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
            <div class="region-inner region-content-bottom-first-inner">
                <section class="block block-views">
                    <div class="block-inner clearfix">
                        <h2 class="block-title">Магазины</h2>
                        <div class="content clearfix">
                            <div class="view view-list-tags">

                                <div class="view-content">
                                    <table>
                                        @foreach($shops as $shop)
                                            <tr>
                                                <td>
                                                    <img src="{{ $shop['logo'] }}" />
                                                </td>
                                                <td>
                                                    <a href="{{ $shop['href'] ?? '#' }}" target="_blank">{{ $shop['name'] }}</a>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </table>
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