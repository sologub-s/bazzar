<section class="block block-simplenews block-120 block-simplenews-120 odd" id="block-simplenews-120">
    <div class="block-inner clearfix">
        @if(!\Illuminate\Support\Facades\Auth::check())
        <h2 class="block-title">Вход</h2>
        @endif

        @if(\Illuminate\Support\Facades\Auth::check())
            <p>Здравствуйте, {{ \Illuminate\Support\Facades\Auth::user()->name  }}!</p>
            <form class="simplenews-subscribe" action="{{ route('logout') }}" method="post" id="simplenews-block-form-120" accept-charset="UTF-8">
                <input type="submit" id="edit-submit" name="op" value="Выход" class="form-submit" />
            </form>
            <a class="btn btn-link" href="{{ route('users_profile') }}">Профиль</a>

        @else

        <form class="simplenews-subscribe" action="{{ route('login') }}" method="post" id="simplenews-block-form-120" accept-charset="UTF-8">
            {{ csrf_field() }}
            <div>
                <div class="form-item form-type-textfield form-item-mail">
                    <label for="edit-mail">E-mail <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                    <input type="text" name="email" value="{{ old('email') }}" required size="20" maxlength="128" class="form-text required" />
                </div>
                <div class="form-item form-type-textfield form-item-mail">
                    <label for="edit-mail">Пароль <span class="form-required" title="Это поле обязательно для заполнения.">*</span></label>
                    <input type="password" name="password" value="" required size="20" maxlength="128" class="form-text required" />
                </div>
                <div class="form-item form-type-textfield form-item-mail">
                    <label for="edit-mail">Запомнить меня </label>
                    <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }} />
                </div>
                <input type="submit" id="edit-submit" name="op" value="Войти" class="form-submit" /> или <a class="btn btn-link" href="{{ route('register') }}">Создать аккаунт</a>
                <a class="btn btn-link" href="{{ route('password.request') }}">Забыли пароль ?</a>
            </div>
        </form>
        @endif

    </div>
</section>