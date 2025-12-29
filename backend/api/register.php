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
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$name = $conn->real_escape_string($data['name'] ?? '');
$email = $conn->real_escape_string($data['email'] ?? '');
$password = $data['password'] ?? ''; 
$role = $conn->real_escape_string($data['role'] ?? 'Student');

if (!$name || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit();
}
$checkEmail = $conn->query("SELECT user_id FROM users WHERE email='$email'");
if ($checkEmail->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "This email is already registered"]);
    exit();
}
$sql = "INSERT INTO users (name, email, password, role) VALUES ('$name', '$email', '$password', '$role')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Account created successfully as $role"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>