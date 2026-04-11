<?php
session_start();

include_once '../../config/cors.php';
include_once '../../config/database.php';

// Assumo che $dbConnection sia l'oggetto mysqli generato da database.php
if(!isset($_SESSION['username'])) {
    echo json_encode([
        "successful" => false,
        "message" => "user is not logged in"
    ]);
    exit(); 
}

$sender_username = $_SESSION['username'];

if(isset($_GET['content']) && isset($_GET['receiver']) && isset($_GET['swapId'])) {
    $content = htmlspecialchars(strip_tags($_GET['content']));
    $receiver_username = htmlspecialchars(strip_tags($_GET['receiver']));
    $swapId = (int) $_GET['swapId']; // Cast a intero per il binding 'i'

    // CONTROLLO: Il destinatario esiste davvero nel database?
    $check_user_query = "SELECT username FROM users WHERE username = ? LIMIT 1";
    $stmt_check = $dbConnection->prepare($check_user_query);
    
    // "s" indica che ci aspettiamo 1 parametro di tipo stringa
    $stmt_check->bind_param("s", $receiver_username);
    $stmt_check->execute();
    
    $result_check = $stmt_check->get_result();

    if($result_check->num_rows == 0) {
        echo json_encode([
            "successful" => false,
            "message" => "failed: l'utente destinatario non esiste"
        ]);
        $stmt_check->close();
        exit();
    }
    $stmt_check->close();

    // INSERIMENTO DEL MESSAGGIO
    $query = "INSERT INTO messages (sender_username, receiver_username, book_id, content) 
              VALUES (?, ?, ?, ?)";

    try {
        $stmt = $dbConnection->prepare($query);

        // "ssis" -> stringa (sender), stringa (receiver), intero (book_id), stringa (content)
        $stmt->bind_param("ssis", $sender_username, $receiver_username, $swapId, $content);

        if($stmt->execute()) {
            echo json_encode([
                "successful" => true,
                "message" => "message sent successfully"
            ]);
        }
        $stmt->close();
    } catch (Exception $e) {
        // Cattura l'errore (ad esempio se il book_id/swapId non esiste nella tabella books)
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