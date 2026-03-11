<?php
session_start();

include_once '../../config/cors.php';
include_once '../../config/database.php';

$response = array(
    "successful" => false,
    "message" => "",
    "chats" => array()
);


if (!isset($_SESSION['username'])) {
    $response['message'] = "user is not logged in";
    echo json_encode($response);
    exit();
}

$current_username = $_SESSION['username'];

$database = new Database();
$db = $database->getConnection();

$query = "SELECT DISTINCT
            CASE 
                WHEN m.sender_username = :username THEN m.receiver_username 
                ELSE m.sender_username 
            END AS username,
            b.title AS swapBookTitle,
            b.book_id AS swapId
          FROM messages m
          JOIN books b ON b.book_id = m.book_id
          WHERE m.sender_username = :username OR m.receiver_username = :username";

$stmt = $db->prepare($query);
$stmt->bindParam(':username', $current_username, PDO::PARAM_STR);

try {
    $stmt->execute();
    
    $chats = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($chats, array(
            "username" => $row['username'],
            "swapBookTitle" => $row['swapBookTitle'],
            "swapId" => $row['swapId']
        ));
    }

    $response['successful'] = true;
    $response['message'] = "successfully retrieved user chats";
    $response['chats'] = $chats;
    

} catch (PDOException $e) {
    $response['successful'] = false;
    $response['message'] = "failed"; 
}

echo json_encode($response);
?>