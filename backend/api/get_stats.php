<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db_connect.php';

$response = [
    "total_books" => 0,
    "total_users" => 0,
    "active_issues" => 0
];

$r1 = $conn->query("SELECT COUNT(*) AS total FROM books");
if ($r1) {
    $response["total_books"] = (int)$r1->fetch_assoc()["total"];
}

$r2 = $conn->query("SELECT COUNT(*) AS total FROM users WHERE LOWER(TRIM(role)) != 'admin'");
if ($r2) {
    $response["total_users"] = (int)$r2->fetch_assoc()["total"];
}
$r3 = $conn->query("SELECT COUNT(*) AS total FROM borrow_logs WHERE LOWER(TRIM(status)) = 'issued'");
if ($r3) {
    $response["active_issues"] = (int)$r3->fetch_assoc()["total"];
}

echo json_encode($response);
$conn->close();
exit;
?>
