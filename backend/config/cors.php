<?php
// Consenti l'accesso da qualsiasi origine (in produzione metti l'URL specifico del frontend es. http://localhost:5173)
header("Access-Control-Allow-Origin: *");

// Imposta il tipo di contenuto restituito come JSON
header("Content-Type: application/json; charset=UTF-8");

// Metodi HTTP consentiti
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

// Header consentiti nelle richieste
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Gestione della richiesta "Preflight" (OPTIONS)
// Il browser invia prima una richiesta OPTIONS per controllare se è permesso inviare dati.
// Se il metodo è OPTIONS, terminiamo l'esecuzione qui restituendo 200 OK.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>