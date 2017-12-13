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
                                <p>На ваш почтовый ящик будет отправлена ссылка для восстановления пароля</p>
                                @include('shared.messages')

                                <form class="user-info-from-cookie contact-form" method="POST" action="{{ route('password.email') }}" id="contact-site-form" accept-charset="UTF-8">
                                    {{ csrf_field() }}

                                    <div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Ваш email-адрес <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="text" id="email" name="email" value="{{ old('email') }}" required autofocus size="60" maxlength="255" class="form-text required {{ $errors->has('email') ? ' error' : '' }}" />
                                        </div>
                                    </div>

                                    <div class="form-actions form-wrapper" id="edit-actions">
                                        <input type="submit" id="edit-submit" name="op" value="Send Password Reset Link" class="form-submit" />
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