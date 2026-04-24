<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

header("content-type: application/json; charset=UTF-8");

if (!isset($_SESSION['username'])) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit();
}

$book_id = $_POST['book_id'] ?? null;
$primary_index = isset($_POST['primary_index']) ? (int)$_POST['primary_index'] : 0;

if (!$book_id) {
    echo json_encode(["successful" => false, "message" => "missing book_id"]);
    exit();
}

$book_id = (int)$book_id;

$check_sql = "SELECT book_id FROM books WHERE book_id = ? AND seller_username = ?";
$check_stmt = $dbConnection->prepare($check_sql);
$check_stmt->bind_param("is", $book_id, $_SESSION['username']);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows === 0) {
    echo json_encode(["successful" => false, "message" => "book not found or not owned by user"]);
    exit();
}

if (!isset($_FILES['images']) || empty($_FILES['images']['name'][0])) {
    echo json_encode(["successful" => false, "message" => "no images uploaded"]);
    exit();
}

$uploaded_images = [];
$allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

$files = $_FILES['images'];
$file_count = count($files['name']);

for ($i = 0; $i < $file_count; $i++) {
    if ($files['error'][$i] !== UPLOAD_ERR_OK) {
        continue;
    }

    $file_type = $files['type'][$i];
    if (!in_array($file_type, $allowed_types)) {
        continue;
    }

    $image_data = file_get_contents($files['tmp_name'][$i]);
    if ($image_data === false) {
        continue;
    }

    $is_primary = ($i === $primary_index) ? 1 : 0;

    if ($is_primary) {
        $reset_primary_sql = "UPDATE book_images SET is_primary = 0 WHERE book_id = ?";
        $reset_stmt = $dbConnection->prepare($reset_primary_sql);
        $reset_stmt->bind_param("i", $book_id);
        $reset_stmt->execute();
        $reset_stmt->close();
    }

    $insert_sql = "INSERT INTO book_images (book_id, image_data, image_type, is_primary) VALUES (?, ?, ?, ?)";
    $insert_stmt = $dbConnection->prepare($insert_sql);
    $null = null;
    $insert_stmt->bind_param("ibsi", $book_id, $null, $file_type, $is_primary);
    $insert_stmt->send_long_data(1, $image_data);

    if ($insert_stmt->execute()) {
        $uploaded_images[] = [
            "id" => $insert_stmt->insert_id,
            "is_primary" => $is_primary
        ];
    }
    $insert_stmt->close();
}

if (empty($uploaded_images)) {
    echo json_encode(["successful" => false, "message" => "no valid images uploaded"]);
    exit();
}

echo json_encode([
    "successful" => true,
    "message" => "images uploaded successfully",
    "images" => $uploaded_images
]);