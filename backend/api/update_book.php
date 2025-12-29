<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$conn = new mysqli("localhost", "root", "", "library_system");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}
$book_id = $_POST['book_id'] ?? null;
$title = $_POST['title'] ?? '';
$author = $_POST['author'] ?? '';
$category_id = $_POST['category_id'] ?? '';
$quantity = $_POST['quantity'] ?? 0;
$description = $_POST['description'] ?? '';
$is_featured = $_POST['is_featured'] ?? 0;

if (!$book_id) {
    echo json_encode(["success" => false, "message" => "Book ID is missing"]);
    exit;
}

$image_update_part = "";
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $target_dir = "uploads/";
    $res = $conn->query("SELECT image_url FROM books WHERE book_id = $book_id");
    $old_book = $res->fetch_assoc();
    if ($old_book && file_exists($target_dir . $old_book['image_url'])) {
        unlink($target_dir . $old_book['image_url']);
    }

    $file_name = time() . "_" . basename($_FILES["image"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $image_update_part = ", image_url = '$file_name'";
    }
}

$sql = "UPDATE books SET 
        title = '$title', 
        author = '$author', 
        category_id = '$category_id', 
        quantity = '$quantity', 
        description = '$description', 
        is_featured = '$is_featured' 
        $image_update_part 
        WHERE book_id = $book_id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Book updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>