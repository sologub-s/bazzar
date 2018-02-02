<section class="block block-simplenews block-login block-aside">
    <div class="block-inner clearfix">
        @if(!Auth::check())
        <h2 class="block-title">Вход</h2>
        @endif

        @if(Auth::check())
            <p>Здравствуйте, {{ Auth::user()->name  }}!</p>
            <a class="btn btn-link" href="{{ route('users_favourites') }}">Избранное</a>
            <a class="btn btn-link" href="{{ route('users_profile') }}">Профиль</a>
            <form class="simplenews-subscribe" action="{{ route('logout') }}" method="post" accept-charset="UTF-8">
                <div>
                    <input type="submit" id="edit-submit" name="op" value="Выход" class="form-submit" />
                </div>
            </form>
        @else

        <form class="simplenews-subscribe" action="{{ route('login') }}" method="post" id="simplenews-block-form-120" accept-charset="UTF-8">
            {{ csrf_field() }}
            <div>
                <div class="form-item">
                    <label for="edit-mail">E-mail <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                    <input type="text" name="email" value="{{ old('email') }}" required size="20" maxlength="128" class="form-text required" />
                </div>
                <div class="form-item">
                    <label for="edit-mail">Пароль <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                    <input type="password" name="password" value="" required size="20" maxlength="128" class="form-text required" />
                </div>
                <div class="form-item remember-me">
                    <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }} />
                    <label for="edit-mail">Запомнить меня </label>
                </div>
                <input type="submit" id="edit-submit" name="op" value="Войти" class="form-submit" />
                <div class="or">&ndash;или&ndash;</div>
                <a class="btn btn-link" href="{{ route('register') }}">Создать аккаунт</a>
                <a class="btn btn-link" href="{{ route('password.request') }}">Забыли пароль ?</a>
                <hr>
                <div class="form-group">
                    <div class="col-md-6 col-md-offset-4">
                        <!--<a href="{{ route('social_redirect', 'facebook') }}" class="btn btn-facebook"><i class="fa fa-facebook"></i> Facebook</a>-->
                        <a class="fb" href="{{ route('social_redirect', 'facebook') }}">
                            <img src="{{ url('/images/fb-login.png') }}" />
                        </a>
                    </div>
                </div>
            </div>
        </form>
        @endif

    </div>
</section>