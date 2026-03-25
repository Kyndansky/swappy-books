<?php
// Includiamo i file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';

$query = "SELECT 
            book_id, 
            title, 
            subject, 
            price, 
            condition_status, 
            isbn, 
            created_at,
            seller_username AS seller_name 
          FROM 
            books 
          WHERE 
            buyer_username IS NULL
          ORDER BY 
            created_at DESC";

// Esecuzione con mysqli
$stmt = $dbConnection->prepare($query);

try {
    $stmt->execute();
    
    // Otteniamo il set di risultati
    $result = $stmt->get_result();

    // Contiamo le righe
    $num = $result->num_rows;

    if($num > 0) {
        $books_arr = array();

        while ($row = $result->fetch_assoc()){
            extract($row);

            $book_item = array(
                "id" => $book_id,
                "title" => html_entity_decode($title),
                "subject" => $subject,
                "price" => $price,
                "condition" => $condition_status,
                "isbn" => $isbn,
                "seller" => $seller_name,
                "posted_at" => $created_at
            );

            array_push($books_arr, $book_item);
        }

        echo json_encode($books_arr);

    } else {
        // Nessun libro trovato
        echo json_encode(array()); 
    }

    $stmt->close();

} catch (Exception $e) {
    // In caso di errore SQL restituisce un array vuoto o gestisci l'errore diversamente
    echo json_encode(array());
}
?>