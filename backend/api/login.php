<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "library_system");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $conn->real_escape_string($data['email'] ?? '');
$password = $data['password'] ?? '';
$loginRole = $conn->real_escape_string($data['role'] ?? '');

if (!$email || !$password || !$loginRole) {
    echo json_encode(["success" => false, "message" => "Please provide all details"]);
    exit();
}

$result = $conn->query("SELECT * FROM users WHERE email='$email' LIMIT 1");

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit();
}

$user = $result->fetch_assoc();

if ($user['password'] !== $password) {
    echo json_encode(["success" => false, "message" => "Incorrect password"]);
    exit();
}

if ($user['role'] !== $loginRole) {
    echo json_encode([
        "success" => false, 
        "message" => "You are registered as a " . $user['role'] . ". Please use the correct portal."
    ]);
    exit();
}

echo json_encode([
    "success" => true,
    "user" => [
        "id" => $user['user_id'],
        "name" => $user['name'],
        "email" => $user['email'],
        "role" => $user['role']
    ]
]);

$conn->close();
?>