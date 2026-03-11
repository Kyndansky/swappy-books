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
    $swapId = htmlspecialchars(strip_tags($_GET['swapId']));

    // query (ordine cronologico)
    $query = "SELECT content, sender_username, receiver_username, sent_at 
              FROM messages 
              WHERE book_id = :swapId 
              AND (
                  (sender_username = :logged_user AND receiver_username = :other_user) 
                  OR 
                  (sender_username = :other_user AND receiver_username = :logged_user)
              )
              ORDER BY sent_at ASC";

    $stmt = $dbConnection->prepare($query);

    $stmt->bindParam(":swapId", $swapId);
    $stmt->bindParam(":logged_user", $logged_user);
    $stmt->bindParam(":other_user", $other_user);

    try {
        $stmt->execute();
        $raw_messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $formatted_messages = [];

        foreach ($raw_messages as $msg) {
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
            "swapId" => (int)$swapId,
            "messages" => $formatted_messages
        ]);

    } catch (PDOException $e) {
        echo json_encode([
            "successful" => false,
            "message" => "failed: " . $e->getMessage()
        ]);
    }

} else {
    // Mancano i parametri GET
    echo json_encode([
        "successful" => false,
        "message" => "failed: missing other_user or swapId parameters"
    ]);
}
?>