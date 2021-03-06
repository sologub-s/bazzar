<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>{{ config('app.name') }}</title>
    <!-- Bootstrap core CSS-->
    <link href="/admin/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom fonts for this template-->
    <link href="/admin/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- Page level plugin CSS-->
    <link href="/admin/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
    <link href="/admin/vendor/bootstrap-switch/bootstrap-switch.css" rel="stylesheet">
    <link href="/admin/vendor/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet">
    <!-- Custom styles for this template-->
    {{--<link href="/admin/css/sb-admin.css" rel="stylesheet">--}}
    <link href="/admin/css/sb-admin.min.css" rel="stylesheet">
</head>

<body class="fixed-nav sticky-footer bg-dark" id="page-top">
@include('admin.shared.nav')
<div class="content-wrapper">
    @yield('content')
    <!-- /.content-wrapper-->
    <footer class="sticky-footer">
        <div class="container">
            <div class="text-center">
                <small>Copyright © {{ config('app.name') }} {{ date('Y') }}</small>
            </div>
        </div>
    </footer>
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fa fa-angle-up"></i>
    </a>
    <!-- Logout Modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Bootstrap core JavaScript-->
    <script src="/admin/vendor/jquery/jquery.min.js"></script>
    <script src="/admin/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/admin/vendor/bootstrap-confirmation/bootstrap-confirmation.js"></script>
    <script src="/admin/vendor/bootstrap-switch/bootstrap-switch.js"></script>
    <script src="/admin/vendor/bootstrap-tagsinput/bootstrap-tagsinput.js"></script>
    <script src="/admin/js/typeahead.bundle.js"></script>
    <script src="/admin/vendor/underscore/underscore.js"></script>
    <script src="{{asset('/admin/ckeditor/ckeditor/ckeditor.js')}}"></script>

    <!-- Core plugin JavaScript-->
    <script src="/admin/vendor/jquery-easing/jquery.easing.min.js"></script>
    <!-- Custom scripts for all pages-->
    <script src="/admin/js/sb-admin.min.js"></script>
</div>
</body>

</html>