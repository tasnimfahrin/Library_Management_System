<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db_connect.php';

$response = [
    "total_books" => 0,
    "total_users" => 0,
    "active_issues" => 0
];
$res = $conn->query("SELECT COUNT(*) as total FROM books");
if($res) $response["total_books"] = (int)$res->fetch_assoc()['total'];

$res = $conn->query("SELECT COUNT(*) as total FROM users WHERE TRIM(LOWER(role)) != 'admin'");
if($res) $response["total_users"] = (int)$res->fetch_assoc()['total'];

$res = $conn->query("SELECT COUNT(*) as total FROM borrow_logs WHERE LOWER(status) = 'issued'");
if($res) $response["active_issues"] = (int)$res->fetch_assoc()['total'];

echo json_encode($response);
$conn->close();
exit();
?>