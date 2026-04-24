<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$logged_username = $_SESSION['username'] ?? null;

if (!$logged_username) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit();
}

$json_data = file_get_contents('php://input');
$_DATA = json_decode($json_data, true) ?: [];

$query = "SELECT b.book_id as id, b.title, b.author, b.description, 
                 b.condition_status as `condition`, b.seller_username as seller, 
                 b.created_at as createdAtDate, b.price, 1 as favorite 
           FROM books b 
           JOIN favorites f ON b.book_id = f.book_id 
           WHERE f.username = ? AND b.buyer_username IS NULL ";

$params = [$logged_username];
$types = "s";


if (!empty($_DATA['type']) && in_array($_DATA['type'], ['academic', 'fiction'])) {
    $query .= " AND b.type = ? ";
    $params[] = $_DATA['type'];
    $types .= "s";
}

if (!empty($_DATA['searchString'])) {
    $query .= " AND b.title LIKE ? ";
    $params[] = '%' . $_DATA['searchString'] . '%';
    $types .= "s";
}

if (isset($_DATA['minPrice']) && is_numeric($_DATA['minPrice'])) {
    $query .= " AND b.price >= ? ";
    $params[] = $_DATA['minPrice'];
    $types .= "d";
}

if (isset($_DATA['maxPrice']) && is_numeric($_DATA['maxPrice'])) {
    $query .= " AND b.price <= ? ";
    $params[] = $_DATA['maxPrice'];
    $types .= "d";
}

$conditions_input = $_DATA['conditions'] ?? [];
if (!is_array($conditions_input) && !empty($conditions_input)) {
    $conditions_input = explode(',', $conditions_input);
}

if (!empty($conditions_input) && is_array($conditions_input)) {
    $valid_conditions = ["new", "like-new", "good", "acceptable", "damaged"];
    $passed_conditions = array_filter($conditions_input, function($c) use ($valid_conditions) {
        return in_array(trim($c), $valid_conditions);
    });
    
    if (!empty($passed_conditions)) {
        $placeholders = implode(',', array_fill(0, count($passed_conditions), '?'));
        $query .= " AND b.condition_status IN ($placeholders) ";
        foreach ($passed_conditions as $c) {
            $params[] = trim($c);
            $types .= "s";
        }
    }
}

$query .= " ORDER BY b.created_at DESC ";


$stmt = $dbConnection->prepare($query);
if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL"]);
    exit();
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();
$rows = $result->fetch_all(MYSQLI_ASSOC);

$favorites = [];
foreach ($rows as $row) {
    $favorites[] = [
        "id" => (int)$row['id'],
        "title" => $row['title'],
        "author" => $row['author'],
        "description" => $row['description'],
        "condition" => $row['condition'],
        "seller" => $row['seller'],
        "createdAtDate" => date("d/m/Y", strtotime($row['createdAtDate'])),
        "price" => (float)$row['price'],
        "favorite" => true
    ];
}

echo json_encode(["successful" => true, "message" => "Favorites recuperati con successo", "swaps" => $favorites]);
?>