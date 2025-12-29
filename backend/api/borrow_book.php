<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$conn = new mysqli("localhost", "root", "", "library_system");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['user_id']) && isset($data['book_id'])) {
    $user_id = $conn->real_escape_string($data['user_id']);
    $book_id = $conn->real_escape_string($data['book_id']);
    
    $issue_date = date('Y-m-d');
    $due_date = date('Y-m-d', strtotime('+7 days'));

    $sql = "INSERT INTO borrow_logs (user_id, book_id, issue_date, due_date, status) 
            VALUES ('$user_id', '$book_id', '$issue_date', '$due_date', 'Pending')";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true, "message" => "Request sent to Admin!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Database Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid Input Data"]);
}
$conn->close();
?>