<?php

$data = json_decode(file_get_contents("php://input"));


try {

 if (!is_dir('./../../db/'.$data->user->login)) {
 echo json_encode(['status' => 'success', 'message' => 'empty data', 'verData' => 0]);
 return;
}

$verData = (int)file_get_contents('./../../db/'.$data->user->login.'/verData.json');

if ($verData > (int)$data->verData) {
  $questions = json_decode(file_get_contents('./../../db/'.$data->user->login.'/questions.json'));
  echo json_encode(['status' => 'success', 'message' => 'data full', 'verData' => $verData, 'questions' => $questions ]);
  return;
}

echo json_encode(['status' => 'success', 'message' => 'ver old', 'verData' => 0]);

} catch(Error $e) {

echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}


