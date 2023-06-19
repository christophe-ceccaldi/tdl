<?php

session_start();

require './class/User.php';

$user = new User();

$success = $user->disconnect();

header('Location: index.php');
