<?php

require_once("../../config/cors.php");

if (!isset($_SESSION)) {
    session_start();
}

if(!isset($_SESSION["username"]) || $_SESSION["username"]===""){
    echo json_encode([
        "successful"=>false,
        "message"=>"You are not authenticated",
        "username"=>""
    ]);
}
else{
    echo json_encode([
        "successful"=>true,
        "message"=>"Logged out successfully",
        "username"=>$_SESSION["username"]
    ]);
}
session_unset();
session_destroy();

