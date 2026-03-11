<?php
session_start();

include_once '../../config/cors.php';
include_once '../../config/database.php';

if(!isset($_SESSION['username'])) {
    echo json_encode([
        "successful" => false,
        "message" => "user is not logged in"
    ]);
    exit();
}

$logged_user = $_SESSION['username'];

if(isset($_GET['other_user']) && isset($_GET['swapId'])) {
    
    $other_user = htmlspecialchars(strip_tags($_GET['other_user']));
    $swapId = (int)$_GET['swapId'];

    $query = "SELECT content, sender_username, receiver_username, sent_at 
              FROM messages 
              WHERE book_id = ? 
              AND (
                  (sender_username = ? AND receiver_username = ?) 
                  OR 
                  (sender_username = ? AND receiver_username = ?)
              )
              ORDER BY sent_at ASC";

    if ($stmt = $dbConnection->prepare($query)) {
        
        // "issss" indica: i = integer, s = string (per i 5 parametri)
        $stmt->bind_param("issss", $swapId, $logged_user, $other_user, $other_user, $logged_user);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $formatted_messages = [];

            while ($msg = $result->fetch_assoc()) {
                $timestamp = strtotime($msg['sent_at']);

                $formatted_messages[] = [
                    "content" => $msg['content'],
                    "sender" => $msg['sender_username'],
                    "receiver" => $msg['receiver_username'],
                    "messageDate" => date("d/m/Y", $timestamp),
                    "messageTime" => date("H:i", $timestamp)
                ];
            }

            echo json_encode([
                "successful" => true,
                "message" => "successfully retrieved chat messages",
                "user1" => $logged_user,
                "user2" => $other_user,
                "swapId" => $swapId,
                "messages" => $formatted_messages
            ]);
        } else {
            echo json_encode([
                "successful" => false,
                "message" => "failed: " . $stmt->error
            ]);
        }
        $stmt->close();
    } else {
        echo json_encode([
            "successful" => false,
            "message" => "failed to prepare statement: " . $dbConnection->error
        ]);
    }

} else {
    echo json_encode([
        "successful" => false,
        "message" => "failed: missing other_user or swapId parameters"
    ]);
}
?>