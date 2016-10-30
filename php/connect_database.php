<?php

    #require_once('/var/www/YuiTracker/php/config.php');
    require_once('/Library/WebServer/Documents/YuiTracker/php/config.php');

    $dsn = 'mysql:host='.$db["host"].'; dbname='.$db["dbname"].'; charset=utf8;';
    #echo $dsn.'<br />';

    try{
        $pdo = new PDO($dsn, $db['user'], $db['password'],
                        array(PDO::ATTR_EMULATE_PREPARES => false));
    }catch(PDOException $e){
        exit('failed to connect database'.$e->getMessage().'<br />');
    }

?>
