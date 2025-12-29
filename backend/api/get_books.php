<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

error_reporting(0);

include_once '../db_connect.php';

$sql = "SELECT * FROM books ORDER BY book_id DESC";
$result = $conn->query($sql);

$books = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['book_id'] = (int)$row['book_id'];
        $row['quantity'] = (int)$row['quantity'];
        $row['available_qty'] = (int)$row['available_qty'];
        $books[] = $row;
    }
}
echo json_encode($books);
exit();
?>