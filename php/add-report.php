<?php

    require_once('/var/www/web-app/public/components/connect_database.php');

    $data 	    = $_POST['data'];
    $longitude 	= $_POST['longitude'];
    $latitude   = $_POST['latitude'];
    $rst   	    = $_POST['rst'];
    $time   	= date("Y-m-d H:i:s", time());
    $comment    = $_POST['comment'];

    $sql = 'insert into reports (data, latitude, longitude, RST, time, comment) values (?,?,?,?,?,?)';
    $stmt = $pdo->prepare($sql);
    $flag = $stmt->execute(array($data, $latitude, $longitude, $rst, $time, $comment));
    if($flag){
        print('succeeded in insert<br>');
    }
    else{
        print('failed to insert<br>');
    }
?>

