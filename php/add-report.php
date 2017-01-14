<?php

    #require_once('/var/www/web-app/public/components/connect_database.php');
    require_once('/Library/WebServer/Documents/YuiTracker/php/connect_database.php');

    $time       = $_POST['time'];
    $data 	    = $_POST['data'];
    $longitude 	= $_POST['lon'];
    $latitude   = $_POST['lat'];

    //$rst   	    = $_POST['rst'];
    //$time   	= date("Y-m-d H:i:s", time());
    //$comment    = $_POST['comment'];

    /*$sql = 'insert into reports (data, latitude, longitude, RST, time, comment) values (?,?,?,?,?,?)';
    $stmt = $pdo->prepare($sql);
    $flag = $stmt->execute(array($data, $latitude, $longitude, $rst, $time, $comment));*/

    if( empty($data) ) {
        $flag = false;
    }
    else {
        $sql = 'insert into reports (time, data, latitude, longitude) values (?,?,?,?)';
        $stmt = $pdo->prepare($sql);
        $flag = $stmt->execute(array($time, $data, $latitude, $longitude));
    }
    if($flag){
        // post to slack
        $attachments = array(
            "fallback" => "Report Received! - Data : ${data} From : (${longitude}, ${latitude})",
            "text" => "Report Received!",
            "fields" => array(
                array(
                    "title" => "Date",
                    "value" => ${time},
                    "short" => true
                ),
                array(
                    "title" => "Reported Data",
                    "value" => ${data},
                    "short" => true
                ),
                array(
                    "title" => "LatLng",
                    "value" => '('.${latitude}.','.${longitude}.')',
                    "short" => true
                )
            ),
            "color" => "#F35A00"
        );
        $attachments = json_encode($attachments);
        $attachments = urlencode('['.$attachments.']');
        $botname = 'YuiBot';
        $icon_emoji = ':mission_logo:';
        $url = "https://slack.com/api/chat.postMessage?token=${slackApiKey}&channel=reception_report&attachments=${attachments}&username=${botname}&icon_emoji=${icon_emoji}";
        file_get_contents($url);
        print((int)$flag);
    }
    else{
        //print('failed to insert<br>');
        $val = (int)$flag;
        print($val);
    }

?>
