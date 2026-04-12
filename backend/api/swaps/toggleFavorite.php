<?php
session_start();
require_once("../../config/cors.php");
require_once("../../config/database.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$swapId = $data["swapId"] ?? null;
$logged_username = $_SESSION['username'] ?? null;

if (!$logged_username) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit;
}

if (!$swapId) {
    echo json_encode(["successful" => false, "message" => "missing swapId"]);
    exit;
}


$checkSql = "SELECT 1 FROM favorites WHERE username = ? AND book_id = ?";
$stmt = $dbConnection->prepare($checkSql);
$stmt->bind_param("si", $logged_username, $swapId);
$stmt->execute();
$exists = $stmt->get_result()->num_rows > 0;

if ($exists) {
    
    $sql = "DELETE FROM favorites WHERE username = ? AND book_id = ?";
    $message = "removed from favorites";
} else {
// Se non esiste, lo aggiungiamo
    $sql = "INSERT INTO favorites (username, book_id) VALUES (?, ?)";
    $message = "added to favorites";
}

$stmt = $dbConnection->prepare($sql);
$stmt->bind_param("si", $logged_username, $swapId);

if ($stmt->execute()) {
    echo json_encode(["successful" => true, "message" => $message]);
} else {
    echo json_encode(["successful" => false, "message" => "database error"]);
}