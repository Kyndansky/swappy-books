<?php
class Database {
    // Credenziali del database
    private $host = "localhost";
    private $db_name = "school_books_db";
    private $username = "root";
    private $password = "";
    public $conn;

    // Metodo per ottenere la connessione
    public function getConnection() {
        $this->conn = null;

        try {
            // Creazione nuova istanza MySQLi
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);

            // Controllo errori di connessione
            if ($this->conn->connect_error) {
                throw new Exception("Errore di connessione: " . $this->conn->connect_error);
            }

            // Impostazione del charset a UTF-8 (fondamentale per accenti e simboli)
            $this->conn->set_charset("utf8");

        } catch(Exception $e) {
            // Interrompe l'esecuzione se non riesce a connettersi
            die($e->getMessage());
        }

        return $this->conn;
    }
}
?>
