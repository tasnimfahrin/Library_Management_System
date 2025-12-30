<?php
$conn = new mysqli("localhost", "root", "", "library_system");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$conn->set_charset("utf8");
?>
