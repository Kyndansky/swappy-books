<?php
session_start();
require_once("../../config/cors.php");
require_once("../../config/database.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$swapId = $data["swapId"] ?? null;
$logged_username = $_SESSION['username'] ?? null;

$sql = "SELECT * FROM books WHERE book_id = ?";
$stmt = $dbConnection->prepare($sql);
$stmt->bind_param("i", $swapId);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    $isFavorite = false;

    if ($logged_username) {
        $favSql = "SELECT 1 FROM favorites WHERE username = ? AND book_id = ?";
        $favStmt = $dbConnection->prepare($favSql);
        $favStmt->bind_param("si", $logged_username, $swapId);
        $favStmt->execute();
        $favResult = $favStmt->get_result();
        if ($favResult->num_rows > 0) {
            $isFavorite = true;
        }
    }

    $swap = [
        "id" => (int)$row['book_id'],
        "title" => $row['title'],
        "author" => $row['author'],
        "description" => $row['description'],
        "isbn"=>$row['isbn'],
        "condition" => $row['condition_status'],
        "type" => $row['type'],
        "seller" => $row['seller_username'],
        "createdAtDate" => date("d/m/Y", strtotime($row['created_at'])),
        "price" => (float)$row['price'],
        "favorite" => $isFavorite,
        
    ];

    echo json_encode([
        "successful" => true,
        "message" => "successfully retrieved swap information",
        "swap" => $swap
    ]);
    exit;
}

echo json_encode([
    "successful" => false,
    "message" => "swap not found",
]);
exit;