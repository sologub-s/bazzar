@extends('layouts.app')

@section('contentleft')
    <div class="grid-12 region region-content" id="region-content">
        <div class="region-inner region-content-inner">
            <a id="main-content"></a>
            <div class="tabs clearfix"></div>
            <div class="grid-12 region region-content-bottom-first" id="region-content-bottom-first">
                <div class="region-inner region-content-bottom-first-inner">
                    <div class="block block-system block-main block-system-main even block-without-title" id="block-system-main">
                        <div class="block-inner clearfix">
                            <div class="content clearfix">

                                <h1 class="title" id="page-title">Данные профиля</h1>
                                @include('shared.messages')

                                @if (sizeof($errors))
                                    <div id="messages" class="">
                                        <div class="messages error">
                                            <h2 class="element-invisible">Сообщение об ошибке</h2>
                                            <ul>
                                                @if ($errors->has('name'))
                                                    <li>{{ $errors->first('name') }}</li>
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                @endif
                                <form class="user-info-from-cookie contact-form" action="{{ route('users_profile') }}" method="post" id="contact-site-form" accept-charset="UTF-8">

                                    <div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Ваш email-адрес </label>
                                            <input type="text" id="email" name="email" value="{{ Auth()->user()->email }}" disabled size="60" maxlength="255" class="form-text {{ $errors->has('email') ? ' error' : '' }}" />
                                        </div>
                                        <div class="form-item form-type-textfield form-item-name">
                                            <label for="edit-name">Ваше имя <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="text" id="name" name="name" value="{{ old('name', Auth()->user()->name) }}" required autofocus size="60" maxlength="255" class="form-text required {{ $errors->has('name') ? ' error' : '' }}" />
                                        </div>

                                        <div class="form-actions form-wrapper" id="edit-actions">
                                            <input type="submit" id="edit-submit" name="op" value="Сохранить" class="form-submit" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection