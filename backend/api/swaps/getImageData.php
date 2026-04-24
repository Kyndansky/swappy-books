<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$image_id = $_GET['image_id'] ?? null;

if (!$image_id) {
    http_response_code(400);
    exit();
}

$image_id = (int)$image_id;

$sql = "SELECT image_data, image_type FROM book_images WHERE id = ?";
$stmt = $dbConnection->prepare($sql);
$stmt->bind_param("i", $image_id);
$stmt->execute();
$stmt->bind_result($image_data, $image_type);
$stmt->fetch();
$stmt->close();

if ($image_data === null) {
    http_response_code(404);
    exit();
}

header("Content-Type: " . $image_type);
echo $image_data;