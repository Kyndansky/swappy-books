<?php
require_once("../../config/cors.php");

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if (!is_array($data)) {
    echo json_encode([
        "successful" => false,
        "message" => "Username and password are required",
        "username" => ""
    ]);
    exit();
}

$username = $data['username'] ?? null;
$password = $data['password'] ?? null;
$input_password = $password;

if (!$username || !$password) {
    echo json_encode([
        "successful" => false,
        "message" => "Username and password are required",
        "username" => ""
    ]);
    exit();
}

if (!is_string($username) || !preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    echo json_encode([
        "successful" => false,
        "message" => "Username must be 3-20 alphanumeric characters",
        "username" => ""
    ]);
    exit();
}

if (!is_string($password) || strlen($password) < 6) {
    echo json_encode([
        "successful" => false,
        "message" => "Password must be at least 6 characters",
        "username" => ""
    ]);
    exit();
}

require_once("../../config/database.php");

// Controlla se l'utente esiste già
$stmtCheck = $dbConnection->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
$stmtCheck->bind_param("s", $username);
$stmtCheck->execute();
$result = $stmtCheck->get_result();
$row = $result->fetch_row();

if ($row[0] > 0) {
    echo json_encode([
        "successful" => false,
        "message" => "User already exists",
        "username" => "",
    ]);
    $stmtCheck->close();
    exit();
}
$stmtCheck->close();

// Inserisce il nuovo utente
$stmt = $dbConnection->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
$hashed_password = password_hash($input_password, PASSWORD_BCRYPT);
$stmt->bind_param("ss", $username, $hashed_password);
$stmt->execute();

session_regenerate_id(true);
$_SESSION["username"] = $username;

echo json_encode([
    "successful" => true,
    "message" => "User registered successfully",
    "username" => $username
]);

$stmt->close();
$dbConnection->close();
?>