<?php

$data = json_decode(file_get_contents("php://input"));


try {

 if (!is_dir('./../../db/'.$data->user->login)) {
  // dir doesn't exist, make it
  mkdir('./../../db/'.$data->user->login);
}

file_put_contents('./../../db/'.$data->user->login.'/questions.json', json_encode($data->questions));
file_put_contents('./../../db/'.$data->user->login.'/verData.json', json_encode($data->verData));


echo json_encode(['status' => 'success', 'message' => 'data saved successfully']);
} catch(Error $e) {

echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

