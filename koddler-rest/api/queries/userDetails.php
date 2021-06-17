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

        $stmt = $db->prepare("SELECT concat(name, ' ', surname) as full_name, sex, email, address, birth_date, phone_number, is_newsletter FROM users WHERE user_id = :userId");
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
