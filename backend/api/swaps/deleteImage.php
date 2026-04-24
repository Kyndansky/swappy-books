<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

header("content-type: application/json; charset=UTF-8");

if (!isset($_SESSION['username'])) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit();
}

$image_id = $_GET['image_id'] ?? null;

if (!$image_id) {
    echo json_encode(["successful" => false, "message" => "missing image_id"]);
    exit();
}

$image_id = (int)$image_id;

$check_sql = "SELECT bi.book_id FROM book_images bi 
              JOIN books b ON bi.book_id = b.book_id 
              WHERE bi.id = ? AND b.seller_username = ?";
$check_stmt = $dbConnection->prepare($check_sql);
$check_stmt->bind_param("is", $image_id, $_SESSION['username']);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows === 0) {
    echo json_encode(["successful" => false, "message" => "image not found or not owned by user"]);
    exit();
}
$check_stmt->close();

$delete_sql = "DELETE FROM book_images WHERE id = ?";
$delete_stmt = $dbConnection->prepare($delete_sql);
$delete_stmt->bind_param("i", $image_id);

if ($delete_stmt->execute()) {
    echo json_encode(["successful" => true, "message" => "image deleted successfully"]);
} else {
    echo json_encode(["successful" => false, "message" => "delete failed"]);
}
$delete_stmt->close();