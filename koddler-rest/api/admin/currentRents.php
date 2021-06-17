<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expost-Headers: date, etag, access-control-allow-origin, access-control-allow-credentials');

require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/vendor/autoload.php';
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/classes/Database.php';
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/secrets/secret.php';

use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;

if (isset($_COOKIE['rest-auth-cookie'])) {

    try {
        $decodedCookie = JWT::decode($_COOKIE['rest-auth-cookie'], $key, array('HS256'));
    } catch (SignatureInvalidException $e) {
        http_response_code(401);
        setcookie('rest-auth-cookie', '', time() - 3600, '/');
        echo json_encode(array('error' => 'Non autenticato, token di autenticazione mancante!'));
        exit;
    }

    try {
        $database = new Database();
        $db = $database->connect();

        $stmt = $db->prepare("SELECT groups.group_name FROM users INNER JOIN groups ON users.group = groups.group_id WHERE users.user_id = :userId");
        $stmt->bindParam(":userId", json_decode(json_encode($decodedCookie), true)['id']);

        if ($stmt->execute()) {
            $userGroup = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (strcmp($userGroup[0]['group_name'], 'administrator') === 0) {

                $stmt = $db->prepare("SELECT action_datetime, tag as card_tag, concat(name, ' ', surname) as full_name, email, phone_number, rfid_tag as scooter_tag 
                FROM temp_in INNER JOIN cards ON cards.card_id = temp_in.card 
                INNER JOIN users on users.user_id = cards.card_id 
                LEFT JOIN scooters ON scooters.scooter_id = temp_in.scooter");

                if ($stmt->execute()) {
                    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                } else {
                    http_response_code(500);
                    echo json_encode(array('error' => 'Errore nell\'elaborazione della richiesta da parte del server.'));
                }
            } else {
                http_response_code(403);
                echo json_encode(array('error' => 'Non autorizzato, gruppo di appartenenza diverso!'));
            }
        } else {
            http_response_code(500);
            echo json_encode(array('error' => 'Errore nell\'elaborazione della richiesta da parte del server.'));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array('error' => 'Errore nell\'elaborazione della richiesta da parte del server.'));
    }
} else {
    http_response_code(401);
    echo json_encode(array('error' => 'Non autenticato, token di autenticazione mancante!'));
}
