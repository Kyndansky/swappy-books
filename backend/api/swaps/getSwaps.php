<?php
// 1. Configurazioni base e Sessione
session_start(); // FONDAMENTALE: Avvia la sessione per capire chi sta usando il sito
include_once '../../config/cors.php';
include_once '../../config/database.php';

// Controlliamo se c'è un utente loggato. 
// Se c'è, salviamo il suo nome. Se è un ospite (non loggato), la variabile sarà null.
$logged_username = isset($_SESSION['username']) ? $_SESSION['username'] : null;

// ==========================================
// FASE 1: LA QUERY BASE (Cosa vogliamo estrarre)
// ==========================================
// Iniziamo a costruire la frase SQL. Usiamo "b." per indicare le colonne della tabella books.
$query = "SELECT b.book_id as id, b.title, b.author, b.description, 
                 b.condition_status as `condition`, b.seller_username as seller, 
                 b.created_at as createdAtDate, b.price ";

// LA MAGIA DEI PREFERITI: Se l'utente è loggato, dobbiamo calcolare il campo "favorite"
if ($logged_username) {
    // Se troviamo un collegamento nella tabella favorites (f.book_id non è nullo), 
    // restituiamo 1 (vero), altrimenti 0 (falso). Lo chiamiamo "favorite".
    $query .= ", IF(f.book_id IS NOT NULL, 1, 0) as favorite ";
} else {
    // Se non è loggato, non può avere preferiti, quindi restituiamo sempre 0 (falso).
    $query .= ", 0 as favorite ";
}

$query .= " FROM books b "; // La tabella principale è books (soprannome 'b')

// Se l'utente è loggato, uniamo (JOIN) la tabella dei preferiti (f) per vedere se ha salvato i libri
if ($logged_username) {
    $query .= " LEFT JOIN favorites f ON b.book_id = f.book_id AND f.username = ? ";
}

// Vogliamo vedere SEMPRE E SOLO i libri non ancora venduti
$query .= " WHERE b.buyer_username IS NULL ";

// ==========================================
// FASE 2: I FILTRI DINAMICI (I mattoncini)
// ==========================================
// Prepariamo l'array per i valori e la stringa per i tipi di dato ('s'=stringa, 'd'=decimale)
$params = [];
$types = "";

// FILTRO 1: Nascondere i propri libri (Richiesto dal frontend)
if ($logged_username) {
    // Il primo "?" è per la JOIN qui sopra (f.username = ?)
    $params[] = $logged_username;
    $types .= "s";
    
    // Escludiamo i libri venduti da chi sta facendo la ricerca
    $query .= " AND b.seller_username != ? ";
    $params[] = $logged_username;
    $types .= "s";
}

// FILTRO 2: Tipo di libro (academic o fiction)
if (!empty($_GET['type']) && in_array($_GET['type'], ['academic', 'fiction'])) {
    $query .= " AND b.type = ? ";
    $params[] = $_GET['type'];
    $types .= "s";
}

// FILTRO 3: Ricerca per parola nel titolo
if (!empty($_GET['searchString'])) {
    $query .= " AND b.title LIKE ? ";
    $params[] = '%' . $_GET['searchString'] . '%'; // I % dicono a SQL "che contiene questa parola"
    $types .= "s";
}

// FILTRO 4: Prezzo Minimo
if (isset($_GET['minPrice']) && is_numeric($_GET['minPrice'])) {
    $query .= " AND b.price >= ? ";
    $params[] = $_GET['minPrice'];
    $types .= "d"; // 'd' perché è un double/float
}

// FILTRO 5: Prezzo Massimo
if (isset($_GET['maxPrice']) && is_numeric($_GET['maxPrice'])) {
    $query .= " AND b.price <= ? ";
    $params[] = $_GET['maxPrice'];
    $types .= "d";
}

// FILTRO 6: Condizioni multiple (Es. cerco libri "new" E "like-new")
// Il frontend ci invia un array o una lista separata da virgole.
$conditions_input = isset($_GET['conditions']) ? $_GET['conditions'] : [];
if (!is_array($conditions_input) && !empty($conditions_input)) {
    $conditions_input = explode(',', $conditions_input); // Trasformiamo la stringa in array
}

// Se ci hanno inviato delle condizioni da cercare
if (!empty($conditions_input) && is_array($conditions_input)) {
    $valid_conditions = ["new", "like-new", "good", "acceptable", "damaged"];
    $passed_conditions = []; // Qui mettiamo solo quelle valide per sicurezza
    
    // Controlliamo che l'utente non abbia inserito parole a caso (es. "distrutto")
    foreach ($conditions_input as $c) {
        $c_clean = trim($c);
        if (in_array($c_clean, $valid_conditions)) {
            $passed_conditions[] = $c_clean;
        }
    }
    
    // Se ci sono condizioni valide, aggiungiamole alla query
    if (!empty($passed_conditions)) {
        // Crea tanti punti di domanda quante sono le condizioni (es. "?, ?, ?")
        $placeholders = implode(',', array_fill(0, count($passed_conditions), '?'));
        $query .= " AND b.condition_status IN ($placeholders) "; // SQL diventerà: IN (?, ?, ?)
        
        // Aggiungiamo ogni condizione all'array dei parametri
        foreach ($passed_conditions as $c) {
            $params[] = $c;
            $types .= "s";
        }
    }
}

// Mettiamo in ordine dal più recente al più vecchio
$query .= " ORDER BY b.created_at DESC ";


// ==========================================
// FASE 3: ESECUZIONE DELLA QUERY
// ==========================================
$stmt = $dbConnection->prepare($query);

if (!$stmt) {
    echo json_encode(["successful" => false, "message" => "Errore SQL: " . $dbConnection->error]);
    exit();
}

// Se abbiamo aggiunto dei filtri, leghiamo i parametri ai punti di domanda
if (!empty($params)) {
    // ...$params "spacchetta" l'array e lo passa alla funzione in modo pulito
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();
$swaps_db = $result->fetch_all(MYSQLI_ASSOC); // Estrae tutto dal DB come array


// ==========================================
// FASE 4: FORMATTAZIONE ESATTA PER REACT
// ==========================================
$swaps = [];

// Scorriamo i risultati e cambiamo i nomi delle chiavi per far felice il frontendista
foreach ($swaps_db as $row) {
    $swap = [
        "id" => (int)$row['id'],           // Forza a numero intero
        "title" => $row['title'],
        "author" => $row['author'],
        "description" => $row['description'],
        "condition" => $row['condition'],
        "seller" => $row['seller'],
        "createdAtDate" => date("d/m/Y", strtotime($row['createdAtDate'])), // Format italiano gg/mm/aaaa
        "price" => (float)$row['price']    // Forza a numero decimale
    ];
    
    // Aggiungiamo il campo 'favorite' (true/false invece di 1/0)
    if ($logged_username) {
        $swap["favorite"] = $row['favorite'] == 1 ? true : false;
    } else {
        $swap["favorite"] = false; 
    }
    
    $swaps[] = $swap; // Aggiungiamo l'oggetto formattato alla lista finale
}

// Invio della risposta JSON corretta
echo json_encode([
    "successful" => true,
    "message" => "Swaps recuperati con successo",
    "swaps" => $swaps
]);
?>