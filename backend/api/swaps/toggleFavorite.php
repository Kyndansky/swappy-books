<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$json_data = file_get_contents('php://input');
$_DATA = json_decode($json_data, true) ?: [];

$swapId = $_DATA["swapId"] ?? null;
$logged_username = $_SESSION['username'] ?? null;

if (!$logged_username) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit();
}

if (!$swapId) {
    echo json_encode(["successful" => false, "message" => "missing swapId"]);
    exit();
}


$checkSql = "SELECT 1 FROM favorites WHERE username = ? AND book_id = ?";
$stmt = $dbConnection->prepare($checkSql);
if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL"]);
    exit();
}

$stmt->bind_param("si", $logged_username, $swapId);
$stmt->execute();
$exists = $stmt->get_result()->num_rows > 0;

if ($exists) {
    $sql = "DELETE FROM favorites WHERE username = ? AND book_id = ?";
    $message = "removed from favorites";
} else {
    $sql = "INSERT INTO favorites (username, book_id) VALUES (?, ?)";
    $message = "added to favorites";
}

$stmt = $dbConnection->prepare($sql);
if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL"]);
    exit();
}

$stmt->bind_param("si", $logged_username, $swapId);

if ($stmt->execute()) {
    echo json_encode(["successful" => true, "message" => $message]);
} else {
    echo json_encode(["successful" => false, "message" => "database error"]);
}
?>