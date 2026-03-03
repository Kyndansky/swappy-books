<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db_name = 'swappybooks';
$sql_file = 'install.sql';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE `$db_name`;");

    if (!file_exists($sql_file)) {
        die("Errore: File $sql_file non trovato.");
    }

    $sql_content = file_get_contents($sql_file);
    
    $pdo->exec($sql_content);

    echo "Database '$db_name' creato e inizializzato con successo.";

} catch (PDOException $e) {
    die("Errore durante l'inizializzazione: " . $e->getMessage());
}
?>