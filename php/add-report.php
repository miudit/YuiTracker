<?php

    #require_once('/var/www/web-app/public/components/connect_database.php');
    require_once('/Library/WebServer/Documents/YuiTracker/php/connect_database.php');
    include 'ChromePhp.php';

    $data 	    = $_POST['data'];
    $longitude 	= $_POST['lon'];
    $latitude   = $_POST['lat'];
    //$rst   	    = $_POST['rst'];
    //$time   	= date("Y-m-d H:i:s", time());
    $comment    = $_POST['comment'];

    /*$sql = 'insert into reports (data, latitude, longitude, RST, time, comment) values (?,?,?,?,?,?)';
    $stmt = $pdo->prepare($sql);
    $flag = $stmt->execute(array($data, $latitude, $longitude, $rst, $time, $comment));*/
    $sql = 'insert into reports (data, latitude, longitude, comment) values (?,?,?,?)';
    $stmt = $pdo->prepare($sql);
    $flag = $stmt->execute(array($data, $latitude, $longitude, $comment));
    if($flag){
        //print('succeeded in insert<br>');
        ChromePhp::log("succeeded in insert");
    }
    else{
        print('failed to insert<br>');
    }

?>
