<?php
// 1. Includiamo i file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';



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
$stmt = $dbConnection->prepare($query);
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

   
    echo json_encode($books_arr);

} else {
    
    echo json_encode(array()); 
}
?>