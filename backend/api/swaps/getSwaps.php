<?php
// 1. Configurazioni base e Sessione
session_start(); 
include_once '../../config/cors.php';
include_once '../../config/database.php';

// LEGGI IL JSON DALL'INPUT
$json_data = file_get_contents('php://input');
$_DATA = json_decode($json_data, true) ?: []; // Decodifica in array associativo

$logged_username = $_SESSION['username'] ?? null;

// ==========================================
// FASE 1: LA QUERY BASE
// ==========================================
$query = "SELECT b.book_id as id, b.title, b.author, b.description, 
                 b.condition_status as `condition`, b.seller_username as seller, 
                 b.created_at as createdAtDate, b.price,
                 (SELECT bi.id FROM book_images bi WHERE bi.book_id = b.book_id AND bi.is_primary = 1 LIMIT 1) as primary_image_id,
                 (SELECT bi.image_type FROM book_images bi WHERE bi.book_id = b.book_id AND bi.is_primary = 1 LIMIT 1) as primary_image_type,
                 (SELECT TO_BASE64(bi.image_data) FROM book_images bi WHERE bi.book_id = b.book_id AND bi.is_primary = 1 LIMIT 1) as primary_image_data ";

if ($logged_username) {
    $query .= ", IF(f.book_id IS NOT NULL, 1, 0) as favorite ";
} else {
    $query .= ", 0 as favorite ";
}

$query .= " FROM books b "; 

if ($logged_username) {
    $query .= " LEFT JOIN favorites f ON b.book_id = f.book_id AND f.username = ? ";
}

$query .= " WHERE b.buyer_username IS NULL ";

// ==========================================
// FASE 2: I FILTRI DINAMICI (JSON)
// ==========================================
$params = [];
$types = "";

if ($logged_username) {
    $params[] = $logged_username;
    $types .= "s";
    
    $query .= " AND b.seller_username != ? ";
    $params[] = $logged_username;
    $types .= "s";
}

// Filtri estratti dall'array $_DATA (ex $_POST/$_GET)
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

// ==========================================
// FASE 3: ESECUZIONE DELLA QUERY
// ==========================================
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
$swaps_db = $result->fetch_all(MYSQLI_ASSOC);

// ==========================================
// FASE 4: FORMATTAZIONE
// ==========================================
$swaps = [];
foreach ($swaps_db as $row) {
    $primaryImageData = null;
    $primaryImageType = null;
    
    if (!empty($row['primary_image_data'])) {
        $primaryImageData = $row['primary_image_data'];
        $primaryImageType = $row['primary_image_type'];
    }
    
    $swaps[] = [
        "id" => (int)$row['id'],
        "title" => $row['title'],
        "author" => $row['author'],
        "description" => $row['description'],
        "condition" => $row['condition'],
        "seller" => $row['seller'],
        "createdAtDate" => date("d/m/Y", strtotime($row['createdAtDate'])),
        "price" => (float)$row['price'],
        "favorite" => $logged_username ? ($row['favorite'] == 1) : false,
        "primaryImageId" => $row['primary_image_id'] ? (int)$row['primary_image_id'] : null,
        "primaryImageData" => $primaryImageData,
        "primaryImageType" => $primaryImageType
    ];
}

echo json_encode([
    "successful" => true,
    "message" => "Swaps recuperati con successo",
    "swaps" => $swaps
]);
?>