<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expost-Headers: date, etag, access-control-allow-origin, access-control-allow-credentials');

require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/classes/Database.php';

try {

    $database = new Database();
    $db = $database->connect();

    $stmt = $db->prepare(
        "SELECT stations.*, available, price 
        FROM(
            SELECT Count(action_id) AS available, station_id 
            FROM temp_nol RIGHT JOIN stations ON station_id = station 
            GROUP BY station ) AS t1 
        INNER JOIN (
            SELECT Ifnull(Avg(scooters_models.price_per_hour), 0) AS price, station_id 
            FROM scooters INNER JOIN scooters_models ON scooters.model = scooters_models.sc_model_id 
                INNER JOIN temp_nol ON temp_nol.scooter = scooters.scooter_id 
                RIGHT JOIN stations  ON station_id = station 
                GROUP BY station ) AS t2 
        ON t1.station_id = t2.station_id 
        INNER JOIN stations ON t1.station_id = stations.station_id"
    );

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        http_response_code(500);
        echo json_encode(array('error' => 'Errore nell\'elaborazione della richiesta da parte del server.'));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array('error' => 'Errore nell\'elaborazione della richiesta da parte del server.'));
}
