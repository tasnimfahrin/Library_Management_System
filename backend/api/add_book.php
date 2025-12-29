<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "library_system");

if(isset($_POST['title'])) {
    $title = $conn->real_escape_string($_POST['title']);
    $author = $conn->real_escape_string($_POST['author']);
    $category_id = (int)$_POST['category_id'];
    $description = $conn->real_escape_string($_POST['description'] ?? '');
    $is_featured = (int)($_POST['is_featured'] ?? 0);
    $quantity = (int)$_POST['quantity'];

    $image_name = "default.jpg";
    if (isset($_FILES['image'])) {
        $target_dir = "uploads/";
        if (!file_exists($target_dir)) mkdir($target_dir, 0777, true);
        $image_name = time() . "_" . basename($_FILES["image"]["name"]);
        move_uploaded_file($_FILES["image"]["tmp_name"], $target_dir . $image_name);
    }

    $sql = "INSERT INTO books (title, author, category_id, image_url, description, is_featured, quantity, available_qty) 
            VALUES ('$title', '$author', $category_id, '$image_name', '$description', $is_featured, $quantity, $quantity)";

    if($conn->query($sql)) {
        echo json_encode(["success" => true, "message" => "Book added!"]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
}
$conn->close();
?>