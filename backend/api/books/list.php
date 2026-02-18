<?php
// 1. Includiamo i file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 2. Connessione al Database
$database = new Database();
$db = $database->getConnection();

// 3. Preparazione della Query
// Selezioniamo i libri DISPONIBILI (is_available = 1)
// Usiamo una JOIN per prendere anche il nome del venditore dalla tabella 'users'
$query = "SELECT 
            b.book_id, 
            b.title, 
            b.subject, 
            b.price, 
            b.condition_status, 
            b.isbn, 
            b.created_at,
            u.username as seller_name 
          FROM 
            books b
          INNER JOIN 
            users u ON b.seller_id = u.user_id
          WHERE 
            b.is_available = 1
          ORDER BY 
            b.created_at DESC";

// 4. Esecuzione
$stmt = $db->prepare($query);
$stmt->execute();

// Contiamo quanti libri abbiamo trovato
$num = $stmt->rowCount();

// 5. Verifica se ci sono risultati
if($num > 0) {

    // Array che conterrà tutti i libri
    $books_arr = array();

    // Ciclo su ogni riga trovata nel database
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        // Estraiamo i valori dalla riga
        // (es. $row['title'] diventa la variabile $title)
        extract($row);

        // Creiamo l'oggetto singolo libro
        $book_item = array(
            "id" => $book_id,
            "title" => html_entity_decode($title),
            "subject" => $subject,
            "price" => $price,
            "condition" => $condition_status,
            "isbn" => $isbn,
            "seller" => $seller_name, // Qui c'è il nome dell'utente, non l'ID!
            "posted_at" => $created_at
        );

        // Aggiungiamo il libro alla lista principale
        array_push($books_arr, $book_item);
    }

    // 6. Risposta OK (200) - Restituiamo il JSON
    http_response_code(200);
    echo json_encode($books_arr);

} else {
    // 7. Nessun libro trovato
    // Restituiamo una lista vuota ma con codice 200 (non è un errore, semplicemente non c'è nulla)
    http_response_code(200); 
    echo json_encode(array()); 
}
?>