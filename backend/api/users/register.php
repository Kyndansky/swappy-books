<?php
// 1. Includiamo i file del tuo collega
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 2. Connessione al Database
$database = new Database();
$db = $database->getConnection();

// 3. Ricezione dei dati JSON (lo "scatolone" di cui parlavamo prima)
$data = json_decode(file_get_contents("php://input"));

// 4. Verifica dati obbligatori
if(
    !empty($data->username) &&
    !empty($data->email) &&
    !empty($data->password)
){
    // Query SQL (usa i nomi delle colonne della TUA tabella 'users')
    $query = "INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)";

    $stmt = $db->prepare($query);

    // 5. Sanitizzazione (Pulizia frutta)
    $username = htmlspecialchars(strip_tags($data->username));
    $email = htmlspecialchars(strip_tags($data->email));
    
    // 6. Hashing Password (Sicurezza)
    $password_hash = password_hash($data->password, PASSWORD_DEFAULT);

    // 7. Binding parametri
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password_hash", $password_hash);

    // 8. Esecuzione
    try {
        if($stmt->execute()){
            echo json_encode(array("stato" => true));
            echo json_encode(array("message" => "Registrazione completata con successo."));
        }
    } catch (PDOException $e) {
        // Gestione errore (es. se l'email esiste già)
        echo json_encode(array("stato" => false));
        
        // Se l'errore contiene "Duplicate entry", diamo un messaggio più chiaro
        if(strpos($e->getMessage(), 'Duplicate entry') !== false){
            echo json_encode(array("message" => "Questa email risulta già registrata."));
        } else {
            echo json_encode(array("message" => "Errore durante la registrazione.", "error" => $e->getMessage()));
        }
    }
} else {
    // Dati mancanti
    echo json_encode(array("stato" => false));
    echo json_encode(array("message" => "Impossibile registrare. Dati incompleti (username, email o password mancanti)."));
}
?>