<?php
$hostname = "localhost";
$dbUsername = "root";
$password = "";
$dbName = "swappybooks";
$sql_file = 'install.sql';

// Crea la connessione senza selezionare il database
$dbConn = new mysqli($hostname, $dbUsername, $password);

if ($dbConn->connect_error) {
    die("Connection failed: " . $dbConn->connect_error);
}

// Elimina e ricrea il database
$dbConn->query("DROP DATABASE IF EXISTS `$dbName` ");
$dbConn->query("CREATE DATABASE `$dbName` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$dbConn->close();

// Legge il contenuto del file SQL
$sql_content = file_get_contents($sql_file);
if ($sql_content === false) {
    die("Errore: File $sql_file non trovato.");
}

// Connessione finale usando la variabile del tuo file database
$dbConnection = new mysqli($hostname, $dbUsername, $password, $dbName);
$dbConnection->set_charset("utf8mb4");

// Esecuzione delle query multiple
if ($dbConnection->multi_query($sql_content)) {
    $error_occurred = false;
    do {
        if ($result = $dbConnection->store_result()) {
            $result->free();
        }
        if ($dbConnection->error) {
            echo "Errore durante l'esecuzione del file SQL: " . $dbConnection->error . "\n";
            $error_occurred = true;
        }
    } while ($dbConnection->more_results() && $dbConnection->next_result());

    if (!$error_occurred) {
        echo "Database '$dbName' eliminato, ricreato e inizializzato con successo.";
    }
} else {
    echo "Errore: " . $dbConnection->error;
}

$dbConnection->close();
?>