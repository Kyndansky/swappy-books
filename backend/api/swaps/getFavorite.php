<?php
session_start();
require_once("../../config/cors.php");
require_once("../../config/database.php");

$logged_username = $_SESSION['username'] ?? null;

if (!$logged_username) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit;
}


$sql = "SELECT b.book_id as id, b.title, b.author, b.description, b.condition_status as `condition`, 
               b.seller_username as seller, b.created_at as createdAtDate, b.price 
        FROM books b
        JOIN favorites f ON b.book_id = f.book_id
        WHERE f.username = ? AND b.buyer_username IS NULL";

$stmt = $dbConnection->prepare($sql);
$stmt->bind_param("s", $logged_username);
$stmt->execute();
$result = $stmt->get_result();

$favorites = [];
while ($row = $result->fetch_assoc()) {
    $favorites[] = [
        "id" => (int)$row['id'],
        "title" => $row['title'],
        "author" => $row['author'],
        "description" => $row['description'],
        "condition" => $row['condition'],
        "seller" => $row['seller'],
        "createdAtDate" => date("d/m/Y", strtotime($row['createdAtDate'])),
        "price" => (float)$row['price'],
        "favorite" => true 
    ];
}

echo json_encode([
    "successful" => true,
    "message" => "successfully retrieved favorites",
    "favorites" => $favorites
]);