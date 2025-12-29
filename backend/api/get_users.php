<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

error_reporting(0);

include_once '../db_connect.php';

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT user_id, name, email, role, profile_pic FROM users WHERE LOWER(role) != 'admin' ORDER BY user_id DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users ? $users : []);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
exit();
?>