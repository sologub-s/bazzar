<?php

use Illuminate\Support\Facades\Storage;

function file_get_contents_curl($url) {
    $useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36';
    $timeout = 120;
    $cookie_file    = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix().'/bazzar.cookie';

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt($ch, CURLOPT_ENCODING, "" );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt($ch, CURLOPT_AUTOREFERER, true );
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout );
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout );
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10 );
    curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
    curl_setopt($ch, CURLOPT_REFERER, 'http://ava.com.ua/');
    $content = curl_exec($ch);
    if(curl_errno($ch)) {
        throw new \Exception(curl_error($ch));
    }
    curl_close($ch);
    return $content;
}

function get_location_curl($url) {
    $useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36';
    $timeout = 120;
    $cookie_file    = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix().'/bazzar.cookie';

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt($ch, CURLOPT_ENCODING, "" );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt($ch, CURLOPT_AUTOREFERER, true );
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout );
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout );
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10 );
    curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    $content = curl_exec($ch);
    if(curl_errno($ch)) {
        if (false !== strpos(curl_error($ch), '404 Not Found')) {
            return false;
        }
        throw new \Exception(curl_error($ch));
    }
    curl_close($ch);
    if (false !== strpos($content, 'HTTP/1.1 200 OK')) {
        return true;
    }
    $matches = [];
    preg_match_all('/^Location:(.*)$/mi', $content, $matches);

    return !empty($matches[1]) ? trim($matches[1][sizeof($matches[1])-1]) : false;
}