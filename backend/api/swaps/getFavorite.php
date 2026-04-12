<?php
session_start();
include_once '../../config/cors.php';
include_once '../../config/database.php';

$logged_username = isset($_SESSION['username']) ? $_SESSION['username'] : null;

if (!$logged_username) {
    echo json_encode(["successful" => false, "message" => "user is not logged in"]);
    exit();
}


$query = "SELECT b.book_id as id, b.title, b.author, b.description, 
                 b.condition_status as `condition`, b.seller_username as seller, 
                 b.created_at as createdAtDate, b.price, 1 as favorite 
          FROM books b 
          JOIN favorites f ON b.book_id = f.book_id 
          WHERE f.username = ? AND b.buyer_username IS NULL ";

$params = [$logged_username];
$types = "s";


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

// 4. FORMATTAZIONE REACT
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

echo json_encode(["successful" => true, "favorites" => $favorites]);