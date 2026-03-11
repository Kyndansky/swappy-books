<?php
// Includiamo i file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';

if(isset($_GET['id']) && !empty($_GET['id'])) {

    // Cast a intero per maggiore sicurezza
    $book_id = (int)$_GET['id'];
    
    // Query adattata al nuovo schema del database.
    // Nessuna JOIN necessaria: il seller_username è già nella tabella books.
    $query = "SELECT 
                book_id, 
                title, 
                subject, 
                price, 
                condition_status, 
                isbn, 
                buyer_username, 
                created_at,
                seller_username
              FROM 
                books
              WHERE 
                book_id = ?
              LIMIT 1";

    $stmt = $dbConnection->prepare($query);
    
    // "i" indica un parametro di tipo intero
    $stmt->bind_param("i", $book_id);
    
    try {
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0) {
            
            $row = $result->fetch_assoc();

            $book_detail = array(
                "id" => $row['book_id'],
                "title" => html_entity_decode($row['title']), 
                "subject" => $row['subject'],
                "isbn" => $row['isbn'],
                "price" => $row['price'],
                "condition" => $row['condition_status'],
                "status" => is_null($row['buyer_username']) ? "available" : "sold",
                "posted_at" => $row['created_at'],
                "seller" => array(
                    "username" => $row['seller_username']
                    // Nota: il campo email non è presente nel database attuale
                )
            );

            echo json_encode($book_detail);

        } else {
            echo json_encode(array("message" => "Libro non trovato."));
        }
        
        $stmt->close();

    } catch (Exception $e) {
        echo json_encode(array("message" => "Errore di connessione o query."));
    }

} else {
    echo json_encode(array("message" => "Specificare un ID valido."));
}
?>