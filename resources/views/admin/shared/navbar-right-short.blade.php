<ul class="navbar-nav ml-auto">
    <li class="nav-item">
        <span class="navbar-text">Hello, {{ Auth::user()->name }}</span>
    </li>
    <li class="nav-item">
        <!--<a class="nav-link" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-fw fa-sign-out"></i>Logout</a>-->
        <form method="post" action="/logout">
            <a class="nav-link" href="javascript: return false;" onclick="this.parentNode.submit(); return false;"><i class="fa fa-fw fa-sign-out"></i>Выйти</a>
        </form>
    </li>
</ul>