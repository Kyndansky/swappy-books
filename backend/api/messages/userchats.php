<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

if(isset($_SESSION['username'])) {
    
    $logged_user = htmlspecialchars(strip_tags($_SESSION['username']));

    // 4. La Query Aggiornata con JOIN
    // Usiamo DISTINCT per non avere doppioni se ci sono 50 messaggi per lo stesso libro
    $query = "SELECT DISTINCT 
                CASE 
                    WHEN m.sender_username = :logged_user THEN m.receiver_username
                    ELSE m.sender_username
                END AS contact_username,
                b.title AS book_title,
                b.book_id
              FROM messages m
              JOIN books b ON m.book_id = b.book_id
              WHERE m.sender_username = :logged_user OR m.receiver_username = :logged_user";

    $stmt = $db->prepare($query);

    // 5. Binding
    $stmt->bindParam(":logged_user", $logged_user);

    // 6. Esecuzione
    try {
        $stmt->execute();
        
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Formattiamo la risposta
        echo json_encode(array("stato" => true));
        
        echo json_encode(array(
            "data" => $contacts
        ));

    } catch (PDOException $e) {
        echo json_encode(array("stato" => false));
    }

} else {
        echo json_encode(array("stato" => false));
}
?>