<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$json_data = file_get_contents('php://input');
$_DATA = json_decode($json_data, true) ?: [];

$swapId = $_DATA["swapId"] ?? null;
$logged_username = $_SESSION['username'] ?? null;

if (!$swapId) {
    echo json_encode(["successful" => false, "message" => "missing swapId"]);
    exit();
}

$sql = "SELECT * FROM books WHERE book_id = ?";
$stmt = $dbConnection->prepare($sql);
if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL"]);
    exit();
}

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
        $favStmt->close();
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