<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "library_system");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    if ($id) {
        $query = "DELETE FROM users WHERE user_id = $id AND LOWER(role) != 'admin'";
        
        if ($conn->query($query)) {
            if ($conn->affected_rows > 0) {
                echo json_encode(["success" => true, "message" => "User deleted"]);
            } else {
                echo json_encode(["success" => false, "message" => "User not found or is an Admin"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "No ID provided"]);
    }
}
$conn->close();
?>