<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

if(!isset($_SESSION['username'])) {
    echo json_encode([
        "successful" => false, 
        "message" => "Errore: non sei autorizzato. Effettua il login."
    ]);
    exit();
}

$logged_username = $_SESSION['username'];

$json_data = file_get_contents('php://input');
$_DATA = json_decode($json_data, true) ?: [];

if(empty($_DATA['book_id'])) {    
    echo json_encode([
        "successful" => false,
        "message" => "Dati mancanti. Devi inviare il book_id."
    ]);
    exit();
}

$book_id = (int)$_DATA['book_id'];

$query = "DELETE FROM books WHERE book_id = ? AND seller_username = ?";

$stmt = $dbConnection->prepare($query);

if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL"]);
    exit();
}

$stmt->bind_param("is", $book_id, $logged_username);

if($stmt->execute()) {
    if($stmt->affected_rows > 0) {
        echo json_encode([
            "successful" => true,
            "message" => "Libro eliminato con successo."
        ]);
    } else {
        echo json_encode([
            "successful" => false,
            "message" => "Impossibile eliminare. Il libro non esiste o non sei il proprietario."
        ]);
    }
} else {
    echo json_encode([
        "successful" => false,
        "message" => "Errore del server durante l'eliminazione."
    ]);
}
?>