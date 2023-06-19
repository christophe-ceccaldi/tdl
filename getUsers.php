<?php
session_start();
// appel de la class
require_once 'class/User.php';
require_once 'class/Rights.php';
// instance
$user = new User();
$rights = new Rights();

$allUsers = $user->getAllUsers();

if (isset($_GET['include_rights'])) {
  $ownerId = $user->getId();

  foreach ($allUsers as $index => $user) {
    $userId = $user['id'];

    $allUsers[$index]['has_rights'] = $rights->exists($ownerId, $userId);
  }

}

// encodage en json
echo json_encode($allUsers);