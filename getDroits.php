<?php
session_start();
// appel de la class
require_once 'class/User.php';
require_once 'class/Rights.php';

// instance
$user = new User();
$rights = new Rights();

$userId = $user->getId();

$droits = $rights->findAllByUserId($userId);

if (isset($_GET['include_owner'])) {
    $droits[] = [
        'id' => $userId,
        'login' => $user->getLogin()
    ];
  
  }
  
// encodage en json
echo json_encode($droits);