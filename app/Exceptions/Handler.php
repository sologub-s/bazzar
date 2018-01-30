<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if(!is_null($request->route()) && $request->route()->getPrefix() == '/admin') {
            return $this->renderAdmin($request, $exception);
        }
        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            //
        }
        if($exception instanceof NotFoundHttpException) {
            //$newRequest = $request->duplicate([], [], [], [], [], ['REQUEST_URI' => '/err/404']);
            $newRequest = $request->duplicate([], [], [], [], [], array_merge($_SERVER, ['REQUEST_URI' => '/err/404']));
            return app()->handle($newRequest);
        }
        return parent::render($request, $exception);
    }

    protected function renderAdmin($request, Exception $exception) {
        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            return redirect()->route('admin_login')->with('error', $exception->getMessage())->withInput();
        }
        return parent::render($request, $exception);
    }
}
