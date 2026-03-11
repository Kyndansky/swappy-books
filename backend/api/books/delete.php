<?php
// 1. Inclusione configurazioni
include_once '../../config/cors.php';
include_once '../../config/database.php';

// Ricezione dati JSON
$data = json_decode(file_get_contents("php://input"));

// Controllo dei dati in entrata (usiamo seller_username per coerenza con il DB)
if(!empty($data->book_id) && !empty($data->seller_username)) {

    // Query di cancellazione sicura usando parametri posizionali '?'
    $query = "DELETE FROM books WHERE book_id = ? AND seller_username = ?";

    $stmt = $dbConnection->prepare($query);

    // Sanitizzazione e cast
    $book_id = (int)$data->book_id;
    $seller_username = htmlspecialchars(strip_tags($data->seller_username));

    // Binding: "is" significa che il primo parametro è un Intero, il secondo una Stringa
    $stmt->bind_param("is", $book_id, $seller_username);

    try {
        if($stmt->execute()) {
            
            // In mysqli, si usa affected_rows per contare le righe modificate/eliminate
            if($stmt->affected_rows > 0) {
                // Il libro esisteva ed era dell'utente corretto
                echo json_encode(array(
                    "stato" => true,
                    "message" => "Libro eliminato con successo."
                ));
            } else {
                // Nessuna riga eliminata
                echo json_encode(array(
                    "stato" => false,
                    "message" => "Impossibile eliminare. Il libro non esiste o non sei il proprietario."
                ));
            }

        } else {
            echo json_encode(array(
                "stato" => false,
                "message" => "Errore del server durante l'esecuzione."
            ));
        }
    } catch (Exception $e) {
        echo json_encode(array(
            "stato" => false,
            "message" => "Errore del server."
        ));
    }

    $stmt->close();

} else {
    // Dati mancanti
    echo json_encode(array(
        "stato" => false,
        "message" => "Dati mancanti. Inviare book_id e seller_username."
    ));
}
?>