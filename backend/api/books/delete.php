<?php
// 1. Inclusione configurazioni
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 2. Connessione al DB
$database = new Database();
$db = $database->getConnection();

// 3. Ricezione dati JSON
$data = json_decode(file_get_contents("php://input"));

// 4. Verifica dati
// Ci servono DUE cose:
// - L'ID del libro da cancellare
// - L'ID dell'utente che vuole cancellarlo (per sicurezza)
if(!empty($data->book_id) && !empty($data->seller_id)) {

    // 5. Query di cancellazione "Sicura"
    // Cancelliamo SOLO SE l'ID del libro corrisponde E SE il venditore è quello giusto.
    $query = "DELETE FROM books WHERE book_id = :book_id AND seller_id = :seller_id";

    $stmt = $db->prepare($query);

    // 6. Sanitizzazione
    $book_id = htmlspecialchars(strip_tags($data->book_id));
    $seller_id = htmlspecialchars(strip_tags($data->seller_id));

    // 7. Binding
    $stmt->bindParam(":book_id", $book_id);
    $stmt->bindParam(":seller_id", $seller_id);

    // 8. Esecuzione
    if($stmt->execute()) {
        
        // Controllo magico: rowCount() ci dice quante righe sono state cancellate.
        if($stmt->rowCount() > 0) {
            // Se è > 0, il libro esisteva ed era dell'utente giusto.
            echo json_encode(array("stato" => true));
            echo json_encode(array("message" => "Libro eliminato con successo."));
        } else {
            // Se è 0, o il libro non esiste, O l'utente non è il proprietario.
            echo json_encode(array("stato" => false));
            echo json_encode(array("message" => "Impossibile eliminare. Il libro non esiste o non sei il proprietario."));
        }

    } else {
        echo json_encode(array("stato" => false));
        echo json_encode(array("message" => "Errore del server."));
    }

} else {
    echo json_encode(array("stato" => false));
    echo json_encode(array("message" => "Dati mancanti. Inviare book_id e seller_id."));
}
?>