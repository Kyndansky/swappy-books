<?php
// 1. Configurazioni base
include_once '../../config/cors.php';
include_once '../../config/database.php';

// query base
// tutti i libri che non sono ancora stati venduti
$query = "SELECT book_id, seller_username, title, isbn, subject, price, condition_status, created_at 
          FROM books 
          WHERE buyer_username IS NULL";

// array vuoto dove mettere i parametri da bindare
$params = [];

// costruzione dinamica della query

// richiesta del titolo
if (!empty($_GET['search'])) {
    $query .= " AND title LIKE ?";
    $params[] = '%' . $_GET['search'] . '%'; 
}

// filtro: prezzo minimo
// controlliamo che esista e che sia un numero
if (isset($_GET['min_price']) && is_numeric($_GET['min_price'])) {
    $query .= " AND price >= ?"; 
    $params[] = $_GET['min_price'];
}

// filtro: prezzo massimo
if (isset($_GET['max_price']) && is_numeric($_GET['max_price'])) {
    $query .= " AND price <= ?"; 
    $params[] = $_GET['max_price'];
}

// filtro: materia 
if (!empty($_GET['subject'])) {
    $query .= " AND subject = ?";
    $params[] = $_GET['subject'];
}

// filtro: condizione del libro (nuovo, ottimo, buono, usato)
if (!empty($_GET['condition_status'])) {
    $query .= " AND condition_status = ?";
    $params[] = $_GET['condition_status'];
}

// ordine finale (dal più recente al più vecchio)
$query .= " ORDER BY created_at DESC";

// preparazione ed esecuzione
try {
    $stmt = $dbConnection->prepare($query);
    
    if (!empty($params)) {
        $stmt->execute($params);
    } else {
        $stmt->execute();
    }
    
    $result = $stmt->get_result();
    $books = $result->fetch_all(MYSQLI_ASSOC);

    http_response_code(200);
    echo json_encode([
        "successful" => true,
        "message" => "Libri recuperati con successo",
        "total_results" => count($books), //conteggio dei libri trovati 
        "data" => $books
    ]);

} catch (Exception $e) { 
    http_response_code(500);
    echo json_encode([
        "successful" => false,
        "message" => "Errore durante la ricerca: " . $e->getMessage()
    ]);
}
?>