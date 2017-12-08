<!-- Navigation-->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="index.html">{{ config('app.name') }}</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            {{--
            <li class="nav-item @if(Route::currentRouteName() == 'admin_home') active @endif" data-toggle="tooltip" data-placement="right" title="Dashboard">
                <a class="nav-link" href="index.html">
                    <i class="fa fa-fw fa-dashboard"></i>
                    <span class="nav-link-text">Dashboard</span>
                </a>
            </li>
            --}}
            <li class="nav-item @if(in_array(Route::currentRouteName(), ['admin_products','admin_products_edit',])) active @endif" data-toggle="tooltip" data-placement="right" title="Products">
                <a class="nav-link" href="{{ route('admin_products') }}">
                    <i class="fa fa-fw fa-product-hunt"></i>
                    <span class="nav-link-text">Products</span>
                </a>
            </li>
            <li class="nav-item @if(in_array(Route::currentRouteName(), ['admin_categories',])) active @endif" data-toggle="tooltip" data-placement="right" title="Categories">
                <a class="nav-link" href="{{ route('admin_categories') }}">
                    <i class="fa fa-fw fa-folder-open-o"></i>
                    <span class="nav-link-text">Categories</span>
                </a>
            </li>
            <li class="nav-item @if(in_array(Route::currentRouteName(), ['admin_users','admin_users_edit',])) active @endif" data-toggle="tooltip" data-placement="right" title="Users">
                <a class="nav-link" href="{{ route('admin_users') }}">
                    <i class="fa fa-fw fa-users"></i>
                    <span class="nav-link-text">Users</span>
                </a>
            </li>
            <li class="nav-item @if(in_array(Route::currentRouteName(), ['admin_posts','admin_posts_add', 'admin_posts_edit',])) active @endif" data-toggle="tooltip" data-placement="right" title="Posts">
                <a class="nav-link" href="{{ route('admin_posts') }}">
                    <i class="fa fa-fw fa-file-text-o"></i>
                    <span class="nav-link-text">Posts</span>
                </a>
            </li>
            <li class="nav-item @if(in_array(Route::currentRouteName(), ['admin_contentblocks','admin_contentblocks_add', 'admin_contentblocks_edit',])) active @endif" data-toggle="tooltip" data-placement="right" title="Contentblocks">
                <a class="nav-link" href="{{ route('admin_contentblocks') }}">
                    <i class="fa fa-fw fa-code"></i>
                    <span class="nav-link-text">Contentblocks</span>
                </a>
            </li>
        </ul>
        <ul class="navbar-nav sidenav-toggler">
            <li class="nav-item">
                <a class="nav-link text-center" id="sidenavToggler">
                    <i class="fa fa-fw fa-angle-left"></i>
                </a>
            </li>
        </ul>
        {{-- @include('admin.shared.navbar-right') --}}
        @include('admin.shared.navbar-right-short')
    </div>
</nav>