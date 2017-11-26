<?php

namespace App\Components;

use FastSimpleHTMLDom\Document;
use \Behat\Transliterator\Transliterator;
use League\Flysystem\Exception;
use phpDocumentor\Reflection\Types\Object_;

/**
 * Created by PhpStorm.
 * User: zeitgeist
 * Date: 10/5/17
 * Time: 5:21 PM
 */
class BazzarParser
{
    /**
     * @param string $login
     * @param string $password
     * @return string
     */
    public function login (string $login, string $password) : string
    {

        /**
         * getting secret and first maau
         */
        $url = 'https://www.work.ua/employer/login/?check_cookie=1';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        $result = curl_exec($ch);
        curl_close($ch);

        list($header, $body) = explode("\r\n\r\n", $result, 2);

        $maau = [];
        preg_match('/_maau=([a-zA-Z%0-9-_]+);/i', $header, $maau);
        $maau = $maau[1];

        $secret = [];
        preg_match('/name="secret" value="([a-z0-9]+)">/i', $body, $secret);
        $secret = $secret[1];

        /**
         * logging in
         */
        $url = 'https://www.work.ua/employer/login/';
        $postdata = "remember=on&secret=" . $secret . "&login[1]=" . $login . "&password[1]=" . $password;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_VERBOSE, false);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
        curl_setopt($ch, CURLOPT_COOKIE, '_maauremember=on; _maau='.$maau);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'origin: https://www.work.ua',
            'accept-encoding: gzip, deflate, br',
            'accept-language: en-US,en;q=0.8',
            'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Content-Type: application/x-www-form-urlencoded',
            'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'authority: www.work.ua',
            'referer: https://www.work.ua/employer/login/',
        ]);

        $result = curl_exec($ch);
        curl_close($ch);

        $maau = [];
        preg_match('/_maau=([a-zA-Z%0-9-_]+);/i', $result, $maau);
        $maau = $maau[1];

        return $maau;
    }

    public function getCv(string $s_id) : string
    {
        $url = 'https://www.work.ua/resumes/'.$s_id.'/';
        return file_get_contents($url);
    }

    /**
     * @param string $maau
     * @param string $s_id
     * @return string
     */
    public function getCvAsUser(string $token, string $s_id) : string
    {

        $url = 'https://www.work.ua/resumes/'.$s_id.'/';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_VERBOSE, false);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'origin: https://www.work.ua',
            'accept-language: en-US,en;q=0.8',
            'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Content-Type: application/x-www-form-urlencoded',
            'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'authority: www.work.ua',
        ]);
        curl_setopt($ch, CURLOPT_COOKIE, '_maauremember=on; _maau='.$token);

        $result = curl_exec($ch);
        curl_close($ch);

        return explode("\r\n\r\n", $result, 2)[1];
    }

    /**
     * @param string $token
     * @param string $s_id
     * @return string
     */
    public function getContactsAsUser(string $token, string $s_id) : string {

        /*
        $return = [
            '{"status":"ok","contact":{"phone_prim":"0632641784","phone_sec":"","address":"Соборная площадь 2","email":"yaalex1193@gmail.com","add_info":"Навыки:<br />
Пятый разряд повара, третий разряд официанта. Хорошо владею столовым  этикетом, правилами встречи и обслуживания гостей.Оператор ЕОМ, опытный пользователь 1С и R-Keeper MS Office (Word, Excel, Power Point) , программ для создания баз данных «Парус Опщепит» и тд. Водительские права категории B.<br />
Знание языков:<br />
Украинский - родной; русский - свободно; английский - Pre-Intermediate; французский - низкий уровень.<br />
Личностные качества:<br />
честность, добросовестность, ответственность, коммуникабельность, стрессоустойчивость, стремление учиться новому, умение работать в коллективе.","exprns":[{"id":"'.mt_rand().'","resume_id":"'.$s_id.'","company":"GoodZone Club  ","location":"Каролина-Бугаз","activity":"отельно ресторанный комплекс","position":"старший официант","start_date":"2017-05-01","end_date":"2017-09-01","duty":"контроль проведения открытия закрытия смены,помощь администратору в  работе с официантами,проведения переучета посуды и классические обязанности официанта.","now":false},{"id":"'.mt_rand().'","resume_id":"'.$s_id.'","company":"Петроград","location":"Житомир - Киев","activity":"Готельно-ресторанний комплекс","position":"Официант","start_date":"2014-08-01","end_date":"2016-09-01","duty":"подготовка торгового зала к работе, встреча гостей, принятие заказа, обслуживание по нормам и стандартам ресторана , сервировка и обслуживание банкетов, проведение переучета посуды.","now":false}]},"text":""}',
            '{"status":"bad","text":"Сегодня вы открыли <b>5</b> из <b>5</b> контактов, доступных в день бесплатно. Чтобы открыть больше контактов, <a href=\"/employer/my/price/access/\">закажите доступ к базе резюме</a> или заходите завтра."}',
        ];
        return $return[array_rand($return)];
        */

        /*
        return '{"status":"ok","contact":{"phone_prim":"0632641784","phone_sec":"","address":"Соборная площадь 2","email":"yaalex1193@gmail.com","add_info":"Навыки:<br />
Пятый разряд повара, третий разряд официанта. Хорошо владею столовым  этикетом, правилами встречи и обслуживания гостей.Оператор ЕОМ, опытный пользователь 1С и R-Keeper MS Office (Word, Excel, Power Point) , программ для создания баз данных «Парус Опщепит» и тд. Водительские права категории B.<br />
Знание языков:<br />
Украинский - родной; русский - свободно; английский - Pre-Intermediate; французский - низкий уровень.<br />
Личностные качества:<br />
честность, добросовестность, ответственность, коммуникабельность, стрессоустойчивость, стремление учиться новому, умение работать в коллективе.","exprns":[{"id":"'.mt_rand().'","resume_id":"'.$s_id.'","company":"GoodZone Club  ","location":"Каролина-Бугаз","activity":"отельно ресторанный комплекс","position":"старший официант","start_date":"2017-05-01","end_date":"2017-09-01","duty":"контроль проведения открытия закрытия смены,помощь администратору в  работе с официантами,проведения переучета посуды и классические обязанности официанта.","now":false},{"id":"'.mt_rand().'","resume_id":"'.$s_id.'","company":"Петроград","location":"Житомир - Киев","activity":"Готельно-ресторанний комплекс","position":"Официант","start_date":"2014-08-01","end_date":"2016-09-01","duty":"подготовка торгового зала к работе, встреча гостей, принятие заказа, обслуживание по нормам и стандартам ресторана , сервировка и обслуживание банкетов, проведение переучета посуды.","now":false}]},"text":""}';
        */

        // return '{"status":"bad","text":"Сегодня вы открыли <b>5</b> из <b>5</b> контактов, доступных в день бесплатно. Чтобы открыть больше контактов, <a href=\"/employer/my/price/access/\">закажите доступ к базе резюме</a> или заходите завтра."}';

        $url = 'https://www.work.ua/_data/_ajax/resumes_selection.php';
        $postdata = "func=showResumeContacts&id=".$s_id;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_VERBOSE, false);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'origin: https://www.work.ua',
            'referer: https://www.work.ua/resumes/'.$s_id.'/',
            'accept-language: en-US,en;q=0.8',
            'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'Content-Type: application/x-www-form-urlencoded',
            'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'authority: www.work.ua',
        ]);
        curl_setopt($ch, CURLOPT_COOKIE, '_maauremember=on; _maau='.$token);

        $result = curl_exec($ch);
        curl_close($ch);

        $str = explode("\r\n\r\n", $result, 2)[1];
        $str = preg_replace_callback('/\\\\u([0-9a-fA-F]{4})/', function ($match) {
            return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
        }, $str);

        return $str;

        // curl 'https://www.work.ua/_data/_ajax/resumes_selection.php' -H 'cookie: _maauremember=on; _maau=PsnDWjzOnnLteoGqSBtE%2C2; _dc_gtm_UA-468424-1=1; _dc_gtm_UA-468424-6=1; _ga=GA1.2.979054733.1507204554; _gid=GA1.2.1949300945.1507204554; b=b' -H 'origin: https://www.work.ua' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.8' -H 'x-requested-with: XMLHttpRequest' -H 'pragma: no-cache' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' -H 'accept: application/json, text/javascript, */*; q=0.01' -H 'cache-control: no-cache' -H 'authority: www.work.ua' -H 'referer: https://www.work.ua/resumes/4299380/' --data 'func=showResumeContacts&id=4299380' --compressed
    }

    /**
     * @param string $content
     * @return array
     */
    public function parseCvContent(string $content) : array {
        $html = new Document($content);
        $matches = [];
        $data = [];

        $data['name'] = $html->find('h1.cut-top')->plaintext;
        $data['name'] = $data['name'] === 'Личные данные скрыты' ? null : $data['name'];

        $data['href'] = $html->find('meta[property="og:url"]')->innertext;
        preg_match('/content="(.*)"/i', $data['href'], $matches);
        $data['href'] = $matches[1];

        $data['s_id'] = (int) explode('/', $data['href'])[sizeof(explode('/', $data['href'])) - 2];

        $data['birthday'] = null;
        $data['city_id'] = null;
        $dd = (array) $html->find('dl.dl-horizontal')[0]->children();
        while(sizeof($dd) > 0) {
            $item = array_shift($dd);
            switch ($item->plaintext) {
                case 'Дата рождения:':
                    array_shift($dd);
                    $value = array_shift($dd);
                    $data['birthday'] = $this->parseDate( implode(' ', array_slice(explode(' ', $value->plaintext), 0, 3)) );
                    array_shift($dd);
                    break;
                case 'Город:':
                    array_shift($dd);
                    $value = array_shift($dd);
                    $data['city_id'] = $this->getCityIdByName($value->innertext);
                    array_shift($dd);
                    break;
                case 'Готов к переезду:':
                    array_shift($dd);
                    $value = array_shift($dd);
                    array_shift($dd);
                    break;
                default:
                    array_shift($dd);
                    $key = Transliterator::transliterate($item->plaintext);
                    $value = array_shift($dd);
                    array_shift($dd);
                    break;
            }
        }

        $data['position'] = trim(explode('<', $html->find('h2')[0]->innertext)[0], ', ');
        //$data['position'] = 'водитель (грузовик, автобус), автослесарь, программист (PHP, Java, JavaScript), фельдшер';

        //$data['positions'] = explode (',', $data['position']);
        $positionsUnprepared = [];
        $data['positions'] = [];
        preg_match_all('/(?:[^\)\(\,]+|\([^\)\(]+\))+/i', $data['position'], $positionsUnprepared);
        array_walk($positionsUnprepared[0], function (&$v) use (&$data) {
            $v = trim($v);
            if (!preg_match('/([\S]+\s\()+/i', $v)) {
                array_push($data['positions'], $v);
                return;
            }
            $subPositions = [];
            preg_match('/\(((?:[^\(\)]+|[\(^\)]+\)))\)/i', $v, $subPositions);
            $primaryPosition = explode(' (', $v)[0];
            $subPositions = explode(',', array_pop($subPositions));
            foreach ($subPositions as $subPosition) {
                if(empty(trim($subPosition))) {
                    continue;
                }
                array_push($data['positions'], $primaryPosition.' ('.trim($subPosition).')');
            }
        });
        $data['positions'] = array_filter($data['positions'], function ($v) {
            return !empty($v);
        });

        try {
            $data['salary'] = (int) preg_replace('/[^0-9]/', '', $html->find('h2')[0]->find('span')[0]->plaintext);
        } catch (\Exception $e) {
            $data['salary'] = null;
        }

        $data['fulltime_employment'] = (int) (bool) mb_stristr(implode('', explode('еполная', $html->find('p.text-muted')[0]->plaintext)), 'полная занятость');
        $data['underemployment'] = (int) (bool) mb_stristr($html->find('p.text-muted')[0]->plaintext, 'неполная занятость');

        $data['remote'] = (int) (bool) mb_stristr($html->find('p.text-muted')[0]->plaintext, 'удаленная работа');

        $data['published_at'] = null;
        foreach($html->find('span.text-muted') as $span) {
            if(mb_stristr($span->plaintext, 'Резюме от')) {
                $data['published_at'] = $this->parseDate(mb_substr(trim(str_replace('Резюме от', '', $span->plaintext)), 1));
            }
        }

        $data['raw_data'] = trim(explode('<hr ', implode('', array_slice(explode('<hr>', explode('contactInfo', $html->find('div.card.card-indent')->innertext)[1]), 1)))[0]);

        return $data;
    }

    /**
     * @param string $contactsData
     * @return array|boolean
     */
    public function parseContactsData(string $contactsData) {
        $contacts = json_decode(str_replace(["\r", "\n",], '', $contactsData), true);
        if($contacts['status'] === 'bad' && !!stristr($contacts['text'], 'контактов, доступных в день бесплатно. Чтобы открыть больше контактов')) {
            return false;
        }
        if($contacts['status'] === 'bad' && !stristr($contacts['text'], 'контактов, доступных в день бесплатно. Чтобы открыть больше контактов')) {
            throw new \Exception("Cannot parse contacts - status is 'bad' for unknown reason. The response raw value is: " . $contactsData);
        }
        if(!isset($contacts['contact']['exprns'])) {
            $contacts['contact']['add_info'] .= $contacts['text'];
            return $contacts['contact'];
        }
        $exprns = [];

        foreach($contacts['contact']['exprns'] as $exprnsItem) {
            $exprns[] = implode('; ', $exprnsItem);
        }
        $contacts['contact']['add_info'] .= ' | ' . implode(' | ', $exprns) . ' | ' . $contacts['text'];
        //return array_filter($contacts['contact'], function ($v) { return is_string($v); });
        return $contacts['contact'];
    }

    /**
     * @param string $cityName
     * @return int|null
     */
    public function getCityIdByName(string $cityName) {
        if($cityName == 'Другие страны') {
            return null;
        }
        try {
            return \App\City::whereName($cityName)->first()->id;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return null;
        } catch (\Exception $e) {
            throw new \Exception("Unknown error: ".$e->getMessage());
        }
    }

    public function getRegions ()
    {
        $content = file_get_contents('https://www.work.ua/resumes/by-region/?grouped=1');
        $html = new Document($content);

        $blockOfCode = $html->find('div.card')[0]->children();

        $regions = [];
        foreach ($blockOfCode as $part) {
            if($part->tag === 'h2' && $part->plaintext !== 'Другое') {
                $regions[] = [
                    'name' => $part->plaintext,
                    'cities' => [],
                ];
                continue;
            }
            if($part->tag === 'div') {
                $citiesParts = $part->find('a');
                foreach($citiesParts as $cityPart) {
                    $regions[sizeof($regions) - 1]['cities'][] = [
                        'name' => $cityPart->plaintext,
                        'href' => $cityPart->href,
                    ];
                }
            }
        }
        return $regions;
    }

    public function getTotalPages($url) {
        $content = file_get_contents($url);
        $matches = [];
        preg_match('/из (\d+)/i', $content, $matches);
        return (int) $matches[1];
    }

    public function getCvsFromPage($url, $page = 1) {
        $link = $url . (false === stristr($url, '?') ? '?' : '&');
        $cvs = [];
        $currentList = file_get_contents($link . 'page='.$page);
        $html = new Document($currentList);
        $cvLinks = $html->find('.col-md-8 .resume-link a');
        foreach($cvLinks as $cvLink) {
            $id = explode('/', $cvLink);
            $id = $id[2];
            if(!in_array($id, $cvs)) {
                $cvs[] = $id;
            }
        }
        return $cvs;
    }

    /**
     * @param string $rawDate
     * @return \DateTime
     */
    public function parseDate(string $rawDate) : \DateTime {
        $dateArray = explode(' ', $rawDate);
        $months = [
            'января' => 'January',
            'февраля' => 'February',
            'марта' => 'March',
            'апреля' => 'April',
            'мая' => 'May',
            'июня' => 'June',
            'июля' => 'July',
            'августа' => 'August',
            'сентября' => 'September',
            'октября' => 'October',
            'ноября' => 'November',
            'декабря' => 'December',
        ];
        array_walk($dateArray, function (&$value, $key, $months) {
            if (in_array($value, array_keys($months))) {
                $value = $months[$value];
            }
        }, $months);
        return new \DateTime(implode(' ', $dateArray));
    }

    public function isNotFound(string $content) : bool {
        return !!stristr ($content, 'К сожалению, резюме не найдено');
    }

    // curl 'https://www.work.ua/_data/_ajax/resumes_selection.php' -H 'cookie: _maauremember=on; _maau=PsnDWjzOnnLteoGqSBtE%2C2; _dc_gtm_UA-468424-1=1; _dc_gtm_UA-468424-6=1; _ga=GA1.2.979054733.1507204554; _gid=GA1.2.1949300945.1507204554; b=b' -H 'origin: https://www.work.ua' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.8' -H 'x-requested-with: XMLHttpRequest' -H 'pragma: no-cache' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' -H 'accept: application/json, text/javascript, */*; q=0.01' -H 'cache-control: no-cache' -H 'authority: www.work.ua' -H 'referer: https://www.work.ua/resumes/4299380/' --data 'func=showResumeContacts&id=4299380' --compressed
}