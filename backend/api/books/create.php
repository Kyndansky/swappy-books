<?php
// Inclusione file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';

$data = json_decode(file_get_contents("php://input"));

// Controllo dei campi obbligatori (usando seller_username invece di seller_id)
if(
    !empty($data->seller_username) &&
    !empty($data->title) &&
    !empty($data->price)
){
    // Query di inserimento con placeholder posizionali '?'
    $query = "INSERT INTO books 
              (seller_username, title, isbn, subject, price, condition_status) 
              VALUES 
              (?, ?, ?, ?, ?, ?)";

    $stmt = $dbConnection->prepare($query);

    // Sanitizzazione dati obbligatori
    $seller_username = htmlspecialchars(strip_tags($data->seller_username));
    $title = htmlspecialchars(strip_tags($data->title));
    $price = (float) $data->price; // Cast a float per il prezzo

    // Gestione e sanitizzazione dati opzionali
    $isbn = isset($data->isbn) ? htmlspecialchars(strip_tags($data->isbn)) : null;
    $subject = isset($data->subject) ? htmlspecialchars(strip_tags($data->subject)) : null;
    $condition_status = isset($data->condition_status) && !empty($data->condition_status) 
                        ? htmlspecialchars(strip_tags($data->condition_status)) 
                        : 'buono'; // Default corrispondente al database

    // Binding dei parametri
    // "s" = stringa, "d" = double/float. 
    // Ordine: seller_username (s), title (s), isbn (s), subject (s), price (d), condition_status (s)
    $stmt->bind_param("ssssds", $seller_username, $title, $isbn, $subject, $price, $condition_status);

    try {
        if($stmt->execute()){
            // Successo: 201 Created logicamente
            echo json_encode(array(
                "stato" => true,
                "message" => "Libro messo in vendita con successo."
            ));
        } else {
            echo json_encode(array(
                "stato" => false,
                "message" => "Errore durante l'esecuzione della query."
            ));
        }
        $stmt->close();
    } catch (Exception $e) {
        // Errore del server o del database (es. seller_username inesistente)
        echo json_encode(array(
            "stato" => false,
            "message" => "Impossibile creare l'annuncio.", 
            "error" => $e->getMessage()
        ));
    }

} else {
    // Dati mancanti
    echo json_encode(array(
        "stato" => false,
        "message" => "Dati incompleti. Assicurati di inviare seller_username, titolo e prezzo."
    ));
}
?>