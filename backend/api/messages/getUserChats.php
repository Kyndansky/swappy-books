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

$query = "SELECT DISTINCT
            CASE 
                WHEN m.sender_username = ? THEN m.receiver_username 
                ELSE m.sender_username 
            END AS username,
            b.title AS swapBookTitle,
            b.book_id AS swapId
          FROM messages m
          JOIN books b ON b.book_id = m.book_id
          WHERE m.sender_username = ? OR m.receiver_username = ?";

try {
    $stmt = $dbConnection->prepare($query);
    
    // "sss" indica che passiamo 3 parametri di tipo stringa
    $stmt->bind_param("sss", $current_username, $current_username, $current_username);
    $stmt->execute();
    
    // Con mysqli è necessario ottenere il risultato prima di fare il fetch
    $result = $stmt->get_result();
    
    $chats = array();
    
    // fetch_assoc() estrae le righe come array associativo
    while ($row = $result->fetch_assoc()) {
        array_push($chats, array(
            "username" => $row['username'],
            "swapBookTitle" => $row['swapBookTitle'],
            "swapId" => $row['swapId']
        ));
    }

    $response['successful'] = true;
    $response['message'] = "successfully retrieved user chats";
    $response['chats'] = $chats;
    
} catch (Exception $e) {
    // Cattura le eccezioni generiche o mysqli_sql_exception
    $response['successful'] = false;
    $response['message'] = "failed"; 
}

echo json_encode($response);
?>