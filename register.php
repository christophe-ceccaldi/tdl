<?php

session_start();

require './class/User.php';

$user = new User();

$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$login = $_POST['login'];
$password = $_POST['password'];

$success = $user->register($nom, $prenom, $login, $password);

echo json_encode(['success' => $success]);
