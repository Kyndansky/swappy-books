<?php
// 1. Avvio la sessione (FONDAMENTALE per controllare chi è loggato)
session_start();

// 2. Inclusione configurazioni
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 3. Controllo Sessione: Se l'utente non è loggato, blocchiamo tutto subito
if(!isset($_SESSION['username'])) {
    echo json_encode([
        "successful" => false, 
        "message" => "Errore: non sei autorizzato. Effettua il login."
    ]);
    exit();
}

// L'utente che vuole cancellare è QUELLO LOGGATO, non ci fidiamo dell'input del frontend!
$logged_username = $_SESSION['username'];

// 4. Ricezione dati JSON (Dal frontend ci serve SOLO l'ID del libro)
$data = json_decode(file_get_contents("php://input"));

// 5. Verifica dati
if(!empty($data->book_id)) {    

    // 6. Query di cancellazione "Sicura" (Aggiornata per MySQLi e nuovo DB)
    // Cancelliamo SOLO SE l'ID del libro corrisponde E SE il venditore è l'utente loggato.
    $query = "DELETE FROM books WHERE book_id = ? AND seller_username = ?";

    $stmt = $dbConnection->prepare($query);

    if (!$stmt) {
        echo json_encode(["successful" => false, "message" => "Errore SQL: " . $dbConnection->error]);
        exit();
    }

    // 7. Sanitizzazione
    $book_id = htmlspecialchars(strip_tags($data->book_id));

    // 8. Binding (i = integer per book_id, s = stringa per username)
    $stmt->bind_param("is", $book_id, $logged_username);

    // 9. Esecuzione
    if($stmt->execute()) {
        
        // Controllo magico: in MySQLi si usa affected_rows per vedere quante righe sono cambiate
        if($stmt->affected_rows > 0) {
            // Se è > 0, il libro esisteva ed era dell'utente giusto.
            echo json_encode([
                "successful" => true,
                "message" => "Libro eliminato con successo."
            ]);
        } else {
            // Se è 0, o il libro non esiste, O l'utente NON è il proprietario (sta provando a fare il furbo).
            echo json_encode([
                "successful" => false,
                "message" => "Impossibile eliminare. Il libro non esiste o non sei il proprietario."
            ]);
        }

    } else {
        echo json_encode([
            "successful" => false,
            "message" => "Errore del server durante l'eliminazione."
        ]);
    }

} else {
    echo json_encode([
        "successful" => false,
        "message" => "Dati mancanti. Devi inviare il book_id."
    ]);
}
?>