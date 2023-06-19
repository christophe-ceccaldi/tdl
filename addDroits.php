<?php
session_start();
// appel de la class
require_once 'class/User.php';
require_once 'class/Rights.php';

// instance
$user = new User();
$rights = new Rights();

$ownerId = $user->getId();

$users = explode(',', $_GET['ids']);
$success = false;

foreach ($users as $userId) {
    $success = $rights->create($ownerId, $userId);
}


// encodage en json
echo json_encode(['success' => $success, 'message' => count($users) . " users have been granted access", 'users' => $users]);