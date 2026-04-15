<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$json_data = file_get_contents('php://input');
$_DATA = json_decode($json_data, true) ?: [];

$logged_username = $_SESSION['username'] ?? null;

if(empty($_DATA['id'])) {
    echo json_encode(["successful" => false, "message" => "Specificare un ID valido."]);
    exit();
}

$book_id = (int)$_DATA['id'];

$query = "SELECT 
            b.book_id, 
            b.title, 
            b.author,
            b.description,
            b.type,
            b.price, 
            b.condition_status, 
            b.isbn, 
            b.buyer_username, 
            b.created_at,
            b.seller_username
          FROM books b
          WHERE b.book_id = ?
          LIMIT 1";

$stmt = $dbConnection->prepare($query);
if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL"]);
    exit();
}

$stmt->bind_param("i", $book_id);

try {
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        $isFavorite = false;
        if ($logged_username) {
            $favSql = "SELECT 1 FROM favorites WHERE username = ? AND book_id = ?";
            $favStmt = $dbConnection->prepare($favSql);
            $favStmt->bind_param("si", $logged_username, $book_id);
            $favStmt->execute();
            $favResult = $favStmt->get_result();
            $isFavorite = $favResult->num_rows > 0;
        }

        $book_detail = [
            "successful" => true,
            "message" => "Dettagli libro recuperati",
            "book" => [
                "id" => $row['book_id'],
                "title" => $row['title'],
                "author" => $row['author'],
                "description" => $row['description'],
                "type" => $row['type'],
                "isbn" => $row['isbn'],
                "price" => (float)$row['price'],
                "condition" => $row['condition_status'],
                "status" => is_null($row['buyer_username']) ? "available" : "sold",
                "createdAtDate" => date("d/m/Y", strtotime($row['created_at'])),
                "seller" => $row['seller_username'],
                "favorite" => $isFavorite
            ]
        ];

        echo json_encode($book_detail);

    } else {
        echo json_encode(["successful" => false, "message" => "Libro non trovato."]);
    }
    
    $stmt->close();

} catch (Exception $e) {
    echo json_encode(["successful" => false, "message" => "Errore di connessione o query."]);
}
?>