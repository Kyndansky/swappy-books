<?php
// 1. Includiamo i file del tuo collega
include_once '../../config/cors.php';
include_once '../../config/database.php';

// 2. Connessione al Database
$database = new Database();
$db = $database->getConnection();

// 3. Ricezione dati JSON
$data = json_decode(file_get_contents("php://input"));

// 4. Verifica esistenza email e password nel pacchetto ricevuto
if(!empty($data->email) && !empty($data->password)) {

    // Query: Cerchiamo l'utente tramite email
    $query = "SELECT user_id, username, email, password_hash FROM users WHERE email = :email LIMIT 1";

    $stmt = $db->prepare($query);
    
    // Sanitizziamo l'email prima di passarla alla query
    $email = htmlspecialchars(strip_tags($data->email));
    $stmt->bindParam(":email", $email);
    
    $stmt->execute();
    
    // 5. Se troviamo l'utente
    if($stmt->rowCount() > 0){
        // fetch() estrae la riga. Grazie al file del tuo amico, è già un array associativo!
        $row = $stmt->fetch();
        
        $id = $row['user_id'];
        $username = $row['username'];
        $stored_email = $row['email'];
        $hashed_password = $row['password_hash'];

        // 6. Verifica della Password
        // Confrontiamo la password in chiaro ($data->password) con l'hash ($hashed_password)
        if(password_verify($data->password, $hashed_password)){
            
            // LOGIN OK
            echo json_encode(array("stato" => True));
            
            // Restituiamo i dati dell'utente (Utile per React per mostrare "Ciao, Nome")
            echo json_encode(array(
                "message" => "Login effettuato.",
                "user" => array(
                    "id" => $id,
                    "username" => $username
                    "email" => $stored_email
                )
            ));

        } else {
            // Password Sbagliata
            echo json_encode(array("stato" => False));
            echo json_encode(array("message" => "Password errata."));
        }

    } else {
        // Email non trovata
        echo json_encode(array("stato" => False));
        echo json_encode(array("message" => "Nessun account trovato con questa email."));
    }
} else {
    // Dati mancanti nella richiesta
    echo json_encode(array("stato" => False));
    echo json_encode(array("message" => "Inserire email e password."));
}
?>