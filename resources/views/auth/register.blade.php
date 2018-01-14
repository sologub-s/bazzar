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

                                <h1 class="title" id="page-title">Регистрация</h1>
                                <p>Nulla eget urna ac ante ullamcorper blandit vel nec turpis. Pellentesque commodo tincidunt nisl, vel pellentesque eros pharetra vel. Phasellus in erat ligula. Nunc pretium sollicitudin nunc, non hendrerit turpis facilisis in.</p>
                                {{-- @include('shared.messages') --}}

                                @if (sizeof($errors))
                                    <div id="messages" class="">
                                        <div class="messages error">
                                            <h2 class="element-invisible">Сообщение об ошибке</h2>
                                            <ul>
                                                @if ($errors->has('name'))
                                                    <li>{{ $errors->first('name') }}</li>
                                                @endif
                                                @if ($errors->has('email'))
                                                    <li>{{ $errors->first('email') }}</li>
                                                @endif
                                                @if ($errors->has('password'))
                                                    <li>{{ $errors->first('password') }}</li>
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                @endif
                                <form class="user-info-from-cookie contact-form" action="{{ route('register') }}" method="post" id="contact-site-form" accept-charset="UTF-8">
                                    {{ csrf_field() }}
                                    <div>
                                        <div class="form-item form-type-textfield form-item-name">
                                            <label for="edit-name">Ваше имя <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="text" id="name" name="name" value="{{ old('name') }}" required autofocus size="60" maxlength="255" class="form-text required {{ $errors->has('name') ? ' error' : '' }}" />
                                        </div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Ваш email-адрес <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="text" id="email" name="email" value="{{ old('email') }}" required size="60" maxlength="255" class="form-text required {{ $errors->has('email') ? ' error' : '' }}" />
                                        </div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Пароль <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="password" id="password" name="password" value="" required size="60" maxlength="255" class="form-text required {{ $errors->has('password') ? ' error' : '' }}" />
                                        </div>
                                        <div class="form-item form-type-textfield form-item-mail">
                                            <label for="edit-mail">Пароль ещё раз<span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                                            <input type="password" id="password-confirm" name="password_confirmation" value="" required size="60" maxlength="255" class="form-text required" />
                                        </div>

                                        <div class="form-actions form-wrapper" id="edit-actions">
                                            <input type="submit" id="edit-submit" name="op" value="Зарегистрироваться" class="form-submit" />
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

<!--
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

-->