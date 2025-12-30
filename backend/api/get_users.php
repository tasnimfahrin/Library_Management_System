<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../db_connect.php';

$users = [];

$result = $conn->query("
    SELECT user_id, name, email, role, profile_pic
    FROM users
    WHERE LOWER(TRIM(role)) != 'admin'
    ORDER BY user_id DESC
");

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['user_id'] = (int)$row['user_id'];
        $users[] = $row;
    }
}

echo json_encode($users);
$conn->close();
exit;
?>
