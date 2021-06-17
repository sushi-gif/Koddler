<?php

header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expost-Headers: date, etag, access-control-allow-origin, access-control-allow-credentials');

if (isset($_COOKIE['rest-auth-cookie'])) {
    http_response_code(200);
    setcookie('rest-auth-cookie', '', time() - 3600, '/');
} else {
    http_response_code(401);
    echo json_encode(array('error' => 'Non autorizzato, token di autenticazione mancante!'));
}
