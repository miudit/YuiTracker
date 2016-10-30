<?php

    require_once('/var/www/web-app/public/components/connect_database.php');

    mb_language("uni");
    mb_internal_encoding("utf-8");
    mb_http_input("auto");
    mb_http_output("utf-8");
    
    $sql  = 'select * from reports';
    $stmt = $pdo->prepare($sql);
    $flag = $stmt->execute();

    $reports = array();
    while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ){
        $reports[]=array(
            'id' => $row['id'],
            'lat' => $row['latitude'],
            'lon' => $row['longitude'],
            'comment' => $row['comment']
        );
    }

    header('Content-type: application/json');
    echo json_encode($reports)

?>

