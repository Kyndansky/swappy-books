<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$logged_username = $_SESSION['username'] ?? null;

$query = "SELECT b.book_id as id, b.title, b.author, b.description, b.type,
                 b.condition_status as `condition`, b.seller_username as seller, 
                 b.created_at as createdAtDate, b.price, b.isbn ";

if ($logged_username) {
    $query .= ", IF(f.book_id IS NOT NULL, 1, 0) as favorite ";
} else {
    $query .= ", 0 as favorite ";
}

$query .= " FROM books b ";

if ($logged_username) {
    $query .= " LEFT JOIN favorites f ON b.book_id = f.book_id AND f.username = ? ";
}

$query .= " WHERE b.buyer_username IS NULL ORDER BY b.created_at DESC ";

$params = [];
$types = "";

if ($logged_username) {
    $params[] = $logged_username;
    $types .= "s";
}

$stmt = $dbConnection->prepare($query);
if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL"]);
    exit();
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

try {
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    $books = [];
    foreach ($rows as $row) {
        $books[] = [
            "id" => (int)$row['id'],
            "title" => $row['title'],
            "author" => $row['author'],
            "description" => $row['description'],
            "type" => $row['type'],
            "isbn" => $row['isbn'],
            "condition" => $row['condition'],
            "seller" => $row['seller'],
            "createdAtDate" => date("d/m/Y", strtotime($row['createdAtDate'])),
            "price" => (float)$row['price'],
            "favorite" => $logged_username ? ($row['favorite'] == 1) : false
        ];
    }

    echo json_encode(["successful" => true, "message" => "Libri recuperati con successo", "books" => $books]);

} catch (Exception $e) {
    echo json_encode(["successful" => false, "message" => "Errore durante il recupero dei libri"]);
}
?>