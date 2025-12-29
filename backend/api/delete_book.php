<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once '../db_connect.php';

if(isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $sql = "DELETE FROM books WHERE book_id = $id";
    if($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>