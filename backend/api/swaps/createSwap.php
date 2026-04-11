<?php


// Inclusione file di configurazione
include_once '../../config/cors.php';
include_once '../../config/database.php';

// Controllo della sessione
if (!isset($_SESSION['username'])) {
    echo json_encode(array(
        "successful" => false,
        "message" => "user is not logged in"
    ));
    exit();
}

$seller_username = $_SESSION['username'];

// Ricezione dati (supporta sia payload JSON che POST form-data)
$data = json_decode(file_get_contents("php://input"));
if(empty($data)) {
    $data = (object) $_POST;
}

// Controllo dei campi obbligatori
if(
    !empty($data->condition) &&
    !empty($data->price) &&
    !empty($data->type) &&
    !empty($data->title) &&
    !empty($data->author) &&
    !empty($data->description)
){
    // Validazione condition
    $allowed_conditions = ['new', 'like-new', 'good', 'acceptable', 'damaged'];
    if (!in_array($data->condition, $allowed_conditions)) {
        echo json_encode(array(
            "successful" => false,
            "message" => "invalid condition value"
        ));
        exit();
    }

    // Validazione type
    $allowed_types = ['academic', 'fiction'];
    if (!in_array($data->type, $allowed_types)) {
        echo json_encode(array(
            "successful" => false,
            "message" => "invalid type value"
        ));
        exit();
    }

    // Query di inserimento con placeholder posizionali '?'
    $query = "INSERT INTO books 
              (seller_username, title, author, description, type, price, condition_status) 
              VALUES 
              (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $dbConnection->prepare($query);

    // Sanitizzazione dati
    $title = htmlspecialchars(strip_tags($data->title));
    $author = htmlspecialchars(strip_tags($data->author));
    $description = htmlspecialchars(strip_tags($data->description));
    $type = htmlspecialchars(strip_tags($data->type));
    $price = (float) $data->price; // Cast a float per il prezzo
    $condition_status = htmlspecialchars(strip_tags($data->condition));

    // Binding dei parametri
    // "s" = stringa, "d" = double/float. 
    // Ordine: seller_username (s), title (s), author (s), description (s), type (s), price (d), condition_status (s)
    $stmt->bind_param("sssssds", $seller_username, $title, $author, $description, $type, $price, $condition_status);

    try {
        if($stmt->execute()){
            echo json_encode(array(
                "successful" => true,
                "message" => "swap created successfully"
            ));
        } else {
            echo json_encode(array(
                "successful" => false,
                "message" => "failed to create swap due to a database error"
            ));
        }
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(array(
            "successful" => false,
            "message" => "server error: " . $e->getMessage()
        ));
    }

} else {
    // Dati mancanti
    echo json_encode(array(
        "successful" => false,
        "message" => "missing mandatory fields"
    ));
}
?>