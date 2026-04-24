<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

header("content-type: application/json; charset=UTF-8");

$book_id = $_GET['book_id'] ?? null;

if (!$book_id) {
    echo json_encode(["successful" => false, "message" => "missing book_id"]);
    exit();
}

$book_id = (int)$book_id;

$sql = "SELECT id, image_type, is_primary, created_at FROM book_images WHERE book_id = ? ORDER BY is_primary DESC, id ASC";
$stmt = $dbConnection->prepare($sql);
$stmt->bind_param("i", $book_id);
$stmt->execute();
$result = $stmt->get_result();

$images = [];
while ($row = $result->fetch_assoc()) {
    $images[] = [
        "id" => (int)$row['id'],
        "image_type" => $row['image_type'],
        "is_primary" => (bool)$row['is_primary'],
        "created_at" => $row['created_at']
    ];
}
$stmt->close();

echo json_encode([
    "successful" => true,
    "message" => "success",
    "images" => $images
]);