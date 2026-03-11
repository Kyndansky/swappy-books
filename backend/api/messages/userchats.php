<?php
// Avvio sessione necessario per leggere l'utente loggato
session_start();

include_once '../../config/cors.php';
include_once '../../config/database.php';

if(isset($_SESSION['username'])) {
    
    $logged_user = htmlspecialchars(strip_tags($_SESSION['username']));

    // Uso i placeholder posizionali '?' per mysqli
    $query = "SELECT DISTINCT 
                CASE 
                    WHEN m.sender_username = ? THEN m.receiver_username
                    ELSE m.sender_username
                END AS contact_username,
                b.title AS book_title,
                b.book_id
              FROM messages m
              JOIN books b ON m.book_id = b.book_id
              WHERE m.sender_username = ? OR m.receiver_username = ?";

    try {
        $stmt = $dbConnection->prepare($query);

        // Binding di 3 parametri stringa ("sss")
        $stmt->bind_param("sss", $logged_user, $logged_user, $logged_user);
        
        $stmt->execute();
        
        // Ottengo il risultato
        $result = $stmt->get_result();
        
        // fetch_all(MYSQLI_ASSOC) estrae tutte le righe direttamente in un array
        $contacts = $result->fetch_all(MYSQLI_ASSOC);

        // Restituisco un unico oggetto JSON valido
        echo json_encode(array(
            "stato" => true,
            "data" => $contacts
        ));

        $stmt->close();

    } catch (Exception $e) {
        // Catturo errori di esecuzione mysqli
        echo json_encode(array("stato" => false));
    }

} else {
    // Utente non loggato
    echo json_encode(array("stato" => false));
}
?>