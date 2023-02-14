<?php

$data = json_decode(file_get_contents("php://input"));

$users = json_decode(file_get_contents("./../../db/users.json"));


$findUser = null;

foreach($users as $user) {
  if (($data->login === $user->login) && ($data->password === $user->password)) {
    $findUser = $user;
  }
}

if (!$findUser) {
  echo json_encode(['status' => 'error']);
}

unset($user->password);

echo json_encode(['status' => 'success', 'user' => $findUser]);