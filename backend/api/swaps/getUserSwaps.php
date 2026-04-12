<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$logged_username = isset($_SESSION['username']) ? $_SESSION['username'] : null;
$target_user = $_GET['username'] ?? $logged_username;

if (!$target_user) {
    echo json_encode(["successful" => false, "message" => "no user specified"]);
    exit();
}


$query = "SELECT b.book_id as id, b.title, b.author, b.description, 
                 b.condition_status as `condition`, b.seller_username as seller, 
                 b.created_at as createdAtDate, b.price ";

if ($logged_username) {
    $query .= ", IF(f.book_id IS NOT NULL, 1, 0) as favorite ";
} else {
    $query .= ", 0 as favorite ";
}

$query .= " FROM books b ";

if ($logged_username) {
    $query .= " LEFT JOIN favorites f ON b.book_id = f.book_id AND f.username = ? ";
}

$query .= " WHERE b.seller_username = ? ";

// Parametri iniziali: [logged_user (per join), target_user (per seller)]
$params = [];
$types = "";

if ($logged_username) {
    $params[] = $logged_username;
    $types .= "s";
}
$params[] = $target_user;
$types .= "s";

// 2. AGGIUNTA FILTRI (Identica logica)
if (!empty($_GET['type']) && in_array($_GET['type'], ['academic', 'fiction'])) {
    $query .= " AND b.type = ? ";
    $params[] = $_GET['type'];
    $types .= "s";
}

if (!empty($_GET['searchString'])) {
    $query .= " AND b.title LIKE ? ";
    $params[] = '%' . $_GET['searchString'] . '%';
    $types .= "s";
}

if (isset($_GET['minPrice']) && is_numeric($_GET['minPrice'])) {
    $query .= " AND b.price >= ? ";
    $params[] = $_GET['minPrice'];
    $types .= "d";
}

if (isset($_GET['maxPrice']) && is_numeric($_GET['maxPrice'])) {
    $query .= " AND b.price <= ? ";
    $params[] = $_GET['maxPrice'];
    $types .= "d";
}

// Filtro Condizioni
$conditions_input = isset($_GET['conditions']) ? $_GET['conditions'] : [];
if (!is_array($conditions_input) && !empty($conditions_input)) {
    $conditions_input = explode(',', $conditions_input);
}
if (!empty($conditions_input) && is_array($conditions_input)) {
    $valid_conditions = ["new", "like-new", "good", "acceptable", "damaged"];
    $passed_conditions = array_intersect($conditions_input, $valid_conditions);
    
    if (!empty($passed_conditions)) {
        $placeholders = implode(',', array_fill(0, count($passed_conditions), '?'));
        $query .= " AND b.condition_status IN ($placeholders) ";
        foreach ($passed_conditions as $c) {
            $params[] = $c;
            $types .= "s";
        }
    }
}

$query .= " ORDER BY b.created_at DESC ";


$stmt = $dbConnection->prepare($query);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();
$rows = $result->fetch_all(MYSQLI_ASSOC);


$swaps = [];
foreach ($rows as $row) {
    $swaps[] = [
        "id" => (int)$row['id'],
        "title" => $row['title'],
        "author" => $row['author'],
        "description" => $row['description'],
        "condition" => $row['condition'],
        "seller" => $row['seller'],
        "createdAtDate" => date("d/m/Y", strtotime($row['createdAtDate'])),
        "price" => (float)$row['price'],
        "favorite" => $row['favorite'] == 1 ? true : false
    ];
}

echo json_encode(["successful" => true, "swaps" => $swaps]);