<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expost-Headers: date, etag, access-control-allow-origin, access-control-allow-credentials');

require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/vendor/autoload.php';
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/secrets/secret.php';

use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;

if (isset($_COOKIE['rest-auth-cookie'])) {
    try {
        JWT::decode($_COOKIE['rest-auth-cookie'], $key, array('HS256'));
        echo json_encode(array('logged' => true));
    } catch (SignatureInvalidException $e) {
        http_response_code(401);
        setcookie('rest-auth-cookie', '', time() - 3600, '/');
        echo json_encode(array('error' => 'Non autenticato, token di autenticazione mancante!'));
        exit;
    }
} else {
    http_response_code(401);
    echo json_encode(array('error' => 'Non autenticato, token di autenticazione mancante!'));
}
