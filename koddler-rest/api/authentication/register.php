<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expost-Headers: date, etag, access-control-allow-origin, access-control-allow-credentials');

require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/classes/Database.php';
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/vendor/autoload.php';
require $_SERVER['DOCUMENT_ROOT'] . '/koddler-rest/classes/UUID.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (isset($_POST['full_name'], $_POST['address'], $_POST['email'], $_POST['password'], $_POST['birthday'], $_POST['gender'], $_POST['phone_number'])) {

        try {

            $full_name = preg_split('/\s+(?=\S*+$)/', trim($_POST['full_name']), 2);
            $address = trim($_POST['address']);
            $email = trim($_POST['email']);
            $password = $_POST['password'];
            $birthday = $_POST['birthday'];
            $gender = $_POST['gender'];
            $pnumber = trim($_POST['phone_number']);

            echo $birthday;

            if (empty($full_name[0]) || empty($full_name[1]) || empty($address) || empty($email) || empty(trim($password)) || empty($birthday) || empty($gender) || empty($pnumber)) {
                http_response_code(401);
                echo json_encode(array('error' => 'Nessun campo deve essere vuoto.'));
                exit;
            } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(401);
                echo json_encode(array('error' => 'L\'email inserita non risulta essere valida.'));
                exit;
            } else if (!preg_match("/^[0-9]{10,10}$/", $pnumber)) {
                http_response_code(401);
                echo json_encode(array('error' => 'Il numero inserito non risulta essere valido.'));
                exit;
            } else if (!preg_match("/^((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])$/", $birthday)) {
                http_response_code(401);
                echo $birthday;
                echo json_encode(array('error' => 'La data di nascita inserita non risulta essere valida.'));
                exit;
            } else if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/", $password)) {
                http_response_code(401);
                echo json_encode(array('error' => 'La password inserita non risulta essere valida.'));
                exit;
            } else if (!preg_match("/^[mfnb]{1,1}$/", $gender)) {
                http_response_code(401);
                echo json_encode(array('error' => 'Il genere inserito non risulta essere valido.'));
                exit;
            }

            $database = new Database();
            $db = $database->connect();

            $stmt = $db->prepare(
                "INSERT INTO users(`name`, `surname`, `sex`, `email`, `password`, `address`, `birth_date`, `phone_number`, `group`) 
                VALUES(:name, :surname, :sex, :email, :password, :address, :birth_date, :phone_number, 1);
                "
            );

            $encPwd = password_hash($password, PASSWORD_BCRYPT, array('cost' => 12));
            $stmt->bindParam(':name', $full_name[0]);
            $stmt->bindParam(':surname', $full_name[1]);
            $stmt->bindParam(':sex', $gender);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $encPwd);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':birth_date', $birthday);
            $stmt->bindParam(':phone_number', $pnumber);

            if ($stmt->execute()) {

                $uuid = UUID::v4();
                $stmt = $db->prepare("INSERT INTO cards (issue_date, expiry_date, status, tag, user) VALUES (now(), DATE_ADD(now(), INTERVAL 5 YEAR), 'p', :tag, (SELECT user_id from users where email = :email))");
                $stmt->bindParam(':tag', $uuid);
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                echo json_encode(array('success' => 'Registrazione avvenuta con successo.'));
            } else {
                http_response_code(400);
                echo json_encode(array('error' => 'L\'email inserita risulta essere già utilizzata.'));
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
