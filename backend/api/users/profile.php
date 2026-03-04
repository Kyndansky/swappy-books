<?php
// 1. Includiamo i file del tuo collega
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 2. Connessione al Database
$database = new Database();
$db = $database->getConnection();

// 3. Ricezione dell'ID utente
// Nota: Per il profilo, di solito si usa il metodo GET (es. profile.php?id=1)
// Quindi verifichiamo se nell'URL c'è il parametro 'id'
$user_id = isset($_GET['id']) ? $_GET['id'] : null;

// 4. Verifica esistenza ID
if(!empty($user_id)) {

    // Query: Selezioniamo i dati dell'utente (ESCLUSA la password per sicurezza)
    $query = "SELECT user_id, username, email, created_at FROM users WHERE user_id = :id LIMIT 1";

    $stmt = $db->prepare($query);

    // 5. Sanitizzazione e Binding
    $user_id = htmlspecialchars(strip_tags($user_id));
    $stmt->bindParam(":id", $user_id);

    // 6. Esecuzione
    $stmt->execute();

    // 7. Se troviamo l'utente
    if($stmt->rowCount() > 0){
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Prepariamo l'array di risposta
        // Formattiamo la data in modo più leggibile (opzionale, ma utile)
        $user_item = array(
            "id" => $row['user_id'],
            "username" => $row['username'],
            "email" => $row['email'],
            "joined_at" => $row['created_at'], // Data registrazione
            "status" => "active"
        );

        // 8. Risposta OK
        echo json_encode(array("stato" => true));
        echo json_encode($user_item);

    } else {
        // ID non trovato nel database
        echo json_encode(array("stato" => false));
    }

} else {
    // ID mancante nella richiesta URL
    echo json_encode(array("stato" => false));
}
?>