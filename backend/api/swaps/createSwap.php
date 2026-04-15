<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

if (!isset($_SESSION['username'])) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit();
}

$seller_username = $_SESSION['username'];
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true) ?: [];

if(empty($data)) { 
    $data = $_POST; 
}

if(
    !empty($data['condition']) && !empty($data['price']) && !empty($data['type']) &&
    !empty($data['title']) && !empty($data['author']) && !empty($data['description'])
){
    $allowed_conditions = ['new', 'like-new', 'good', 'acceptable', 'damaged'];
    if (!in_array($data['condition'], $allowed_conditions)) {
        echo json_encode(["successful" => false, "message" => "invalid condition"]);
        exit();
    }

    $title = $data['title'];
    $author = $data['author'];
    $description = $data['description'];
    $type = $data['type'];
    $price = (float) $data['price'];
    $condition = $data['condition'];
    $isbn = !empty($data['isbn']) ? $data['isbn'] : null;

    $query = "INSERT INTO books (seller_username, title, author, description, type, price, condition_status, isbn) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $dbConnection->prepare($query);
    if (!$stmt) {
        echo json_encode(["successful" => false, "message" => "database error"]);
        exit();
    }

    $stmt->bind_param("sssssdss", $seller_username, $title, $author, $description, $type, $price, $condition, $isbn);

    if($stmt->execute()){
        echo json_encode(["successful" => true, "message" => "swap created successfully"]);
    } else {
        echo json_encode(["successful" => false, "message" => "database error"]);
    }
    $stmt->close();
} else {
    echo json_encode(["successful" => false, "message" => "missing fields"]);
}
?>