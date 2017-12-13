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

                                <h1 class="title" id="page-title">Смена пароля</h1>
                                @include('shared.messages')

                                @if (sizeof($errors))
                                    <div id="messages" class="">
                                        <div class="messages error">
                                            <h2 class="element-invisible">Сообщение об ошибке</h2>
                                            <ul>
                                                @if ($errors->has('password_current'))
                                                    <li>{{ $errors->first('password_current') }}</li>
                                                @endif
                                                    @if ($errors->has('password_new'))
                                                        <li>{{ $errors->first('password_new') }}</li>
                                                    @endif
                                                @if ($errors->has('password_confirmation'))
                                                    <li>{{ $errors->first('password_confirmation') }}</li>
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                @endif
                                <form class="user-info-from-cookie contact-form" action="{{ route('users_password_handler') }}" method="post" id="contact-site-form" accept-charset="UTF-8">

                                    <div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="password">Текущий пароль <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="password" required id="password_current" name="password_current" value="" size="60" maxlength="255" class="form-text required {{ $errors->has('password_current') ? ' error' : '' }}" />
                                        </div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="password_new">Новый пароль <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="password" required id="password_new" name="password_new" size="60" maxlength="255" class="form-text required {{ $errors->has('password_new') ? ' error' : '' }}" />
                                        </div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="password_confirmation">Новый пароль ещё раз <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="password" required id="password_confirmation" name="password_confirmation" size="60" maxlength="255" class="form-text required {{ $errors->has('password_confirmation') ? ' error' : '' }}" />
                                        </div>

                                        <div class="form-actions form-wrapper" id="edit-actions">
                                            <input type="submit" id="edit-submit" name="op" value="Изменить пароль" class="form-submit" />
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