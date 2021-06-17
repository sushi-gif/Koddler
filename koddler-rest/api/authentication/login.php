<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expost-Headers: date, etag, access-control-allow-origin, access-control-allow-credentials');

// classi per la connessione al db e jwt
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/classes/Database.php';
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/vendor/autoload.php';

// secret key per jwt e jwt
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/secrets/secret.php';

use Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['email'], $_POST['password'])) {
        try {

            $database = new Database();
            $db = $database->connect();

            $email = $_POST['email'];

            $stmt = $db->prepare(
                "SELECT * FROM users 
                WHERE email = :email;"
            );

            $stmt->bindParam(':email', $email);

            if ($stmt->execute()) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$user) {
                    http_response_code(403);
                    echo json_encode(array('error' => 'L\'email inserita non corrisponde ad alcun account.'));
                } else {
                    if (password_verify($_POST['password'], $user['password'])) {
                        http_response_code(200);

                        $payload = array(
                            "iss" => "localhost",
                            "iat" => time(),
                            "exp" => time() + (60 * 60 * 24),
                            "id" => $user['user_id']
                        );

                        $cookie_options = array(
                            'expires' => time() + 60 * 60 * 24,
                            'secure' => false,
                            'httponly' => true,
                            'samesite' => 'Strict',
                            'path' => '/'
                        );

                        setcookie('rest-auth-cookie', JWT::encode($payload, $key), $cookie_options);
                    } else {
                        http_response_code(401);
                        echo json_encode(array('error' => 'Password errata'));
                    }
                }
            } else {
                http_response_code(400);
                echo json_encode(array('error' => 'Errore nell\'elaborazione della richiesta.'));
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array('error' => 'Errore nell\'elaborazione della richiesta da parte del server.'));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('error' => 'Parametri mancanti'));
    }
} else {
    http_response_code(405);
    echo json_encode(
        array('error' => 'Utilizza POST per il login')
    );
}
