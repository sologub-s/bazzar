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

                                <h1 class="title" id="page-title">Восстановление пароля</h1>
                                <p>Введите ваш email и новый пароль</p>
                                {{-- @include('shared.messages') --}}

                                @if (session('status'))
                                    <div class="alert alert-success">
                                        {{ session('status') }}
                                    </div>
                                @endif

                                @if (sizeof($errors))
                                    <div id="messages" class="">
                                        <div class="messages error">
                                            <h2 class="element-invisible">Сообщение об ошибке</h2>
                                            <ul>
                                                @if ($errors->has('email'))
                                                    <li>{{ $errors->first('email') }}</li>
                                                @endif
                                                @if ($errors->has('password'))
                                                    <li>{{ $errors->first('password') }}</li>
                                                @endif
                                                @if ($errors->has('password_confirmation'))
                                                    <li>{{ $errors->first('password_confirmation') }}</li>
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                @endif

                                <form class="user-info-from-cookie contact-form" method="POST" action="{{ route('password.request') }}" id="contact-site-form" accept-charset="UTF-8">
                                    {{ csrf_field() }}

                                    <input type="hidden" name="token" value="{{ $token }}">

                                    <div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Ваш email-адрес <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="text" id="email" name="email" value="{{ $email or old('email') }}" required autofocus size="60" maxlength="255" class="form-text required {{ $errors->has('email') ? ' error' : '' }}" />
                                        </div>
                                    </div>

                                    <div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Новый пароль <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="password" id="password" name="password" required class="form-text required {{ $errors->has('password') ? ' error' : '' }}" />
                                        </div>
                                    </div>

                                    <div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Новый пароль ещё раз <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="password" id="password-confirm" name="password_confirmation" required class="form-text required {{ $errors->has('password_confirmation') ? ' error' : '' }}" />
                                        </div>
                                    </div>

                                    <div class="form-actions form-wrapper" id="edit-actions">
                                        <input type="submit" id="edit-submit" name="op" value="Установить новый пароль" class="form-submit" />
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
