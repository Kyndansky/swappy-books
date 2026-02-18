<?php
// 1. Includiamo i file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 2. Connessione al Database
$database = new Database();
$db = $database->getConnection();

// 3. Verifica presenza ID nella richiesta (es. detail.php?id=5)
if(isset($_GET['id']) && !empty($_GET['id'])) {

    $book_id = $_GET['id'];

    // 4. Query SQL
    // Usiamo LEFT JOIN per ottenere anche i dati di chi vende il libro
    // NOTA: Selezioniamo specificamente i campi per evitare di inviare la password_hash del venditore!
    $query = "SELECT 
                b.book_id, 
                b.title, 
                b.subject, 
                b.price, 
                b.condition_status, 
                b.isbn, 
                b.is_available, 
                b.created_at,
                u.user_id as seller_id,
                u.username as seller_name,
                u.email as seller_email
              FROM 
                books b
              LEFT JOIN 
                users u ON b.seller_id = u.user_id
              WHERE 
                b.book_id = ?
              LIMIT 0,1";

    // 5. Preparazione ed esecuzione
    $stmt = $db->prepare($query);
    
    // Bind del parametro (il punto interrogativo nella query)
    $stmt->bindParam(1, $book_id);
    
    $stmt->execute();

    // 6. Se troviamo il libro
    if($stmt->rowCount() > 0) {
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Costruiamo un oggetto JSON ordinato
        $book_detail = array(
            "id" => $row['book_id'],
            "title" => html_entity_decode($row['title']), // Decodifica caratteri speciali
            "subject" => $row['subject'],
            "isbn" => $row['isbn'],
            "price" => $row['price'],
            "condition" => $row['condition_status'],
            "status" => ($row['is_available'] == 1) ? "available" : "sold",
            "posted_at" => $row['created_at'],
            
            // Creiamo un sotto-oggetto per il venditore
            "seller" => array(
                "id" => $row['seller_id'],
                "name" => $row['seller_name'],
                "email" => $row['seller_email'] // Fondamentale per il tasto "Contatta Venditore"
            )
        );

        // Risposta 200 OK
        http_response_code(200);
        echo json_encode($book_detail);

    } else {
        // Libro non trovato (ID inesistente)
        http_response_code(404);
        echo json_encode(array("message" => "Libro non trovato."));
    }

} else {
    // ID mancante nell'URL
    http_response_code(400);
    echo json_encode(array("message" => "Specificare un ID valido."));
}
?>