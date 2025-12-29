<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "library_system");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed"]);
    exit;
}

$sql = "SELECT * FROM books ORDER BY created_at DESC";
$result = $conn->query($sql);

$books = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
}

echo json_encode($books);
$conn->close();
exit();
?>