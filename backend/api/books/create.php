<?php
// 1. Inclusione file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 2. Connessione al Database
$database = new Database();
$db = $database->getConnection();

// 3. Ricezione dei dati JSON dal Frontend
$data = json_decode(file_get_contents("php://input"));

// 4. Verifica dei campi OBBLIGATORI
// Secondo il tuo DB: seller_id, title e price sono NOT NULL.
// condition_status ha un default, ma è meglio che il frontend lo invii.
if(
    !empty($data->seller_id) &&
    !empty($data->title) &&
    !empty($data->price)
){
    // 5. Query di inserimento
    // Non inseriamo 'created_at' o 'is_available' perché il DB li mette in automatico (DEFAULT)
    $query = "INSERT INTO books 
              (seller_id, title, isbn, subject, price, condition_status) 
              VALUES 
              (:seller_id, :title, :isbn, :subject, :price, :condition_status)";

    $stmt = $db->prepare($query);

    // 6. Sanitizzazione dei dati (Pulizia)
    // Rimuoviamo tag HTML e caratteri speciali pericolosi
    $seller_id = htmlspecialchars(strip_tags($data->seller_id));
    $title = htmlspecialchars(strip_tags($data->title));
    $isbn = htmlspecialchars(strip_tags($data->isbn)); // Opzionale, ma se c'è lo puliamo
    $subject = htmlspecialchars(strip_tags($data->subject));
    $price = htmlspecialchars(strip_tags($data->price));
    $condition_status = htmlspecialchars(strip_tags($data->condition_status));

    // 7. Binding dei parametri
    $stmt->bindParam(":seller_id", $seller_id);
    $stmt->bindParam(":title", $title);
    $stmt->bindParam(":isbn", $isbn);
    $stmt->bindParam(":subject", $subject);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":condition_status", $condition_status);

    // 8. Esecuzione della query
    try {
        if($stmt->execute()){
            // Successo: 201 Created
            http_response_code(201);
            echo json_encode(array("message" => "Libro messo in vendita con successo."));
        }
    } catch (PDOException $e) {
        // Errore del server o del database
        http_response_code(503); // 503 Service Unavailable
        echo json_encode(array("message" => "Impossibile creare l'annuncio.", "error" => $e->getMessage()));
    }

} else {
    // Dati mancanti
    http_response_code(400); // 400 Bad Request
    echo json_encode(array("message" => "Dati incompleti. Assicurati di inviare seller_id, titolo e prezzo."));
}
?>