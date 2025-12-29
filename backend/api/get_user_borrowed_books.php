<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_system");
$user_id = $_GET['user_id'];

$sql = "SELECT borrow_logs.*, books.title 
        FROM borrow_logs 
        JOIN books ON borrow_logs.book_id = books.id 
        WHERE borrow_logs.user_id = '$user_id'";

$result = $conn->query($sql);
$books = [];

while($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode(["success" => true, "books" => $books]);
?>