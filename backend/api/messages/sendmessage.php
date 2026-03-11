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

// L'utente mittente è quello salvato in sessione
$sender_username = $_SESSION['username'];

// controllo dei parametri GET richiesti dal frontend
if(isset($_GET['content']) && isset($_GET['receiver']) && isset($_GET['swapId'])) {
    $content = htmlspecialchars(strip_tags($_GET['content']));
    $receiver_username = htmlspecialchars(strip_tags($_GET['receiver']));
    $swapId = htmlspecialchars(strip_tags($_GET['swapId'])); // Corrisponde al book_id

    // CONTROLLO: Il destinatario esiste davvero nel database?
    $check_user_query = "SELECT username FROM users WHERE username = :receiver LIMIT 1";
    $stmt_check = $dbConnection->prepare($check_user_query);
    $stmt_check->bindParam(":receiver", $receiver_username);
    $stmt_check->execute();

    if($stmt_check->rowCount() == 0) {
        // Il destinatario non esiste
        echo json_encode([
            "successful" => false,
            "message" => "failed: l'utente destinatario non esiste"
        ]);
        exit();
    }

    // INSERIMENTO DEL MESSAGGIO
    // non ce 'sent_at' perché il database inserisce l'ora attuale in automatico
    $query = "INSERT INTO messages (sender_username, receiver_username, book_id, content) 
              VALUES (:sender, :receiver, :book_id, :content)";

    $stmt = $dbConnection->prepare($query);

    $stmt->bindParam(":sender", $sender_username);
    $stmt->bindParam(":receiver", $receiver_username);
    $stmt->bindParam(":book_id", $swapId);
    $stmt->bindParam(":content", $content);

    // Esecuzione
    try {
        if($stmt->execute()) {
            echo json_encode([
                "successful" => true,
                "message" => "message sent successfully"
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            "successful" => false,
            "message" => "failed: errore nel salvataggio del messaggio. Assicurati che lo swapId esista."
        ]);
    }

} else {
    echo json_encode([
        "successful" => false,
        "message" => "failed: missing parameters (need content, receiver, swapId)"
    ]);
}
?>