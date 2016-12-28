<?php

    #require_once('/var/www/web-app/public/components/connect_database.php');
    require_once('/Library/WebServer/Documents/YuiTracker/php/connect_database.php');

    $sql  = 'select * from telemetry order by time desc limit 1';
    $stmt = $pdo->prepare($sql);
    $flag = $stmt->execute();

    $reports = array();
    while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ){
        $reports[]=array(
            'time' => $row['time'],
            'bat_temp_1' => $row['bat_temp_1'],
            'bat_temp_ave' => $row['bat_temp_ave'],
            'bat_voltage' => $row['bat_voltage'],
            'bat_current' => $row['bat_current'],
            'main_pic_current_consumption' => $row['main_pic_current_consumption'],
            'com_pic_current_consumption' => $row['com_pic_current_consumption'],
            'antenna_open' => $row['antenna_open'],
            'com_system' => $row['com_system'],
            'solar_voltage' => $row['solar_voltage'],
            'pow_pic_current' => $row['pow_pic_current'],
            'comsysA_supply_voltage' => $row['comsysA_supply_voltage'],
            'comsysA_current_consumption' => $row['comsysA_current_consumption'],
            'comsysB_supply_voltage' => $row['comsysB_supply_voltage'],
            'comsysB_current_consumption_tx' => $row['comsysB_current_consumption_tx'],
            'comsysB_current_consumption_rx' => $row['comsysB_current_consumption_rx'],
            'pannel_temp_plusY' => $row['pannel_temp_plusY'],
            'pannel_temp_minusY' => $row['pannel_temp_minusY'],
            'pannel_temp_plusZ' => $row['pannel_temp_plusZ'],
            'pannel_temp_minusZ' => $row['pannel_temp_minusZ'],
            'msp_current_consumption' => $row['msp_current_consumption'],
            'comsysB_numof_succesful_reception' => $row['comsysB_numof_succesful_reception'],
        );
    }

    header('Content-type: application/json');
    echo json_encode($reports)

?>
