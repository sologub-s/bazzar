@if(session()->has('status'))
    <div id="messages" class="">
        <div class="messages status">
            <ul>
                <?php
                $session_statuses = is_array(session()->get('status')) ? session()->get('status') : [['misc' => session()->get('status')]];
                ?>
                @foreach($session_statuses as $statuses_parts)
                    @foreach($statuses_parts as $status)
                        <li>{!! create_anchors($status, '_blank') !!}</li>
                    @endforeach
                @endforeach
            </ul>
        </div>
    </div>
@endif
@if(session()->has('error') || sizeof($errors))
    <div id="messages" class="">
        <div class="messages error">
            <ul>
                <?php
                $errors = session()->has('error') ? session()->get('error') : $errors->toArray();
                $session_errors = is_array($errors) ? $errors : [['misc' => $errors]];
                ?>
                @foreach($session_errors as $errors_parts)
                    @foreach($errors_parts as $error)
                        <li>{!! create_anchors($error, '_blank') !!}</li>
                    @endforeach
                @endforeach
            </ul>
        </div>
    </div>
@endif