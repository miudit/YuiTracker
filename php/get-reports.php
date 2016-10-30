<?php

    #require_once('/var/www/web-app/public/components/connect_database.php');
    require_once('/Users/dai/Documents/YuiTracker/php/connect_database.php');
    require('./js_console_log.php');

    mb_language("uni");
    mb_internal_encoding("utf-8");
    mb_http_input("auto");
    mb_http_output("utf-8");

    $sql  = 'select * from reports';
    $stmt = $pdo->prepare($sql);
    $flag = $stmt->execute();

    js_console_log($sql);

    $reports = array();
    while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ){
        $reports[]=array(
            'report_id' => $row['report_id'],
            'lat' => $row['latitude'],
            'lon' => $row['longitude']
        );
    }

    header('Content-type: application/json');
    echo json_encode($reports)

?>
