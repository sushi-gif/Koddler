<?php
class Database
{

    private static $host = 'localhost';
    private static $db_name = 'koddler';
    private static $username = 'root';
    private static $password = 'root';
    private $conn;

    public function connect()
    {

        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . self::$host . ';dbname=' . self::$db_name, self::$username, self::$password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $ignored) {
        }

        return $this->conn;
    }
}
