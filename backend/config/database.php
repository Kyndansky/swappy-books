<?php
class Database {
    // Credenziali del database
    // NOTA: In produzione dovresti usare variabili d'ambiente (.env)
    private $host = "localhost";
    private $db_name = "swappybooks"; // Assicurati di aver creato il DB con questo nome
    private $username = "root";           // Di default su XAMPP/MAMP è "root"
    private $password = "";               // Di default su XAMPP è vuota, su MAMP è "root"
    public $conn;

    // Metodo per ottenere la connessione
    public function getConnection() {
        $this->conn = null;

        try {
            // Stringa di connessione (DSN)
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8";
            
            // Creazione istanza PDO
            $this->conn = new PDO($dsn, $this->username, $this->password);
            
            // Configurazione gestione errori: lancia eccezioni in caso di errore
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Configurazione del fetch di default come array associativo
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        } catch(PDOException $exception) {
            echo "Errore di connessione: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>