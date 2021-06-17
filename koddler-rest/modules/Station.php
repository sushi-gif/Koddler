<?php

class Station
{
    // Database stuff
    private $conn;
    private static $table = 'stations';

    // Station properties
    public $id;
    public $name;
    public $status;
    public $lat;
    public $lng;

    // Constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get Stations
    public function read()
    {
        // Query
        $query = 'SELECT * FROM ' . self::$table;

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
}
