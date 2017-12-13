<section class="block block-simplenews block-120 block-simplenews-120 odd">
    <div class="block-inner clearfix">
        <h2 class="block-title">Навигация по профилю</h2>
        <ul>
            <li><a href="{{ route('users_profile') }}" class="{{ request()->routeIs('users_profile') ? 'current' : '' }}">Данные профиля</a></li>
            <li><a href="{{ route('users_password') }}" class="{{ request()->routeIs('users_password') ? 'current' : '' }}">Смена пароля</a></li>
        </ul>
    </div>
</section>