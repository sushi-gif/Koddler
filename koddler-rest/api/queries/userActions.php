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
        setcookie('rest-auth-cookie', '', time() - 3600, '/');
        echo json_encode(array('error' => 'auth cookie has been modified'));
        exit;
    }

    try {
        $database = new Database();
        $db = $database->connect();

        $stmt = $db->prepare("SELECT actions.action_id, actions.action_type, actions.action_datetime, actions.action_cost, scooters.rfid_tag, cards.tag
        FROM actions inner join scooters on actions.scooter = scooters.scooter_id inner join cards on cards.card_id = actions.card
        WHERE actions.card = (SELECT card_id FROM cards INNER JOIN users ON users.user_id = cards.user WHERE users.user_id = :userId) ORDER BY actions.action_datetime DESC");
        $stmt->bindParam(":userId", json_decode(json_encode($decodedCookie), true)['id']);

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
} else {
    http_response_code(401);
    echo json_encode(array('error' => 'Non autenticato, token di autenticazione mancante!'));
}
