<?php

$session_options = [
    'cookie_lifetime' => 86400,
    'cookie_path'     => '/',
    'cookie_domain'   => '', // Lascia vuoto per il dominio corrente
    'cookie_secure'   => true, // Obbligatorio se SameSite è None
    'cookie_httponly' => true, // Protegge da attacchi XSS
    'cookie_samesite' => 'None', // Permette cross-origin (React -> PHP)
];

if (!isset($_SESSION)) {
    session_start($session_options);
}

// get request's origin
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// create an array with authorized origins (in this case it's react frontend)
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1',
];

// if request comes from allowed origins or if the request is empty (this condition was added because i use postman (postman origin is generally empty))
// it is allowed (i would use * directly but doing so apparently makes session not work)
if (in_array($origin, $allowed_origins) || empty($origin)) {
    header("Access-Control-Allow-Origin: " . ($origin ?: '*'));
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("content-type: application/json; charset=UTF-8");

