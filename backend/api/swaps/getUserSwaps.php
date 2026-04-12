<?php
session_start();
require_once("../../config/cors.php");
require_once("../../config/database.php");


$target_user = $_GET['username'] ?? $_SESSION['username'] ?? null;
$logged_username = $_SESSION['username'] ?? null;

if (!$target_user) {
    echo json_encode(["successful" => false, "message" => "no user specified"]);
    exit;
}

$sql = "SELECT book_id as id, title, author, description, condition_status as `condition`, 
               created_at as createdAtDate, price, buyer_username 
        FROM books 
        WHERE seller_username = ? 
        ORDER BY created_at DESC";

$stmt = $dbConnection->prepare($sql);
$stmt->bind_param("s", $target_user);
$stmt->execute();
$result = $stmt->get_result();

$swaps = [];
while ($row = $result->fetch_assoc()) {
    $swaps[] = [
        "id" => (int)$row['id'],
        "title" => $row['title'],
        "author" => $row['author'],
        "description" => $row['description'],
        "condition" => $row['condition'],
        "createdAtDate" => date("d/m/Y", strtotime($row['createdAtDate'])),
        "price" => (float)$row['price'],
        "isSold" => !is_null($row['buyer_username']) // se l'hai già venduto o no
    ];
}

echo json_encode([
    "successful" => true,
    "message" => "successfully retrieved user swaps",
    "swaps" => $swaps
]);