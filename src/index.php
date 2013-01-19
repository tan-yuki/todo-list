<?php
require_once '../vendor/autoload.php';


$app = new \Slim\Slim();


$app->post('/api/task/register/', function () use ($app) {
	$req = $app->request();

	// params
	$params = list($user_id, $title, $description)
		= array($req->params('user_id'), $req->params('title'), $req->params('description'));

	foreach($param as $params) {
		if (empty($param)) {
			$app->render('error.php');
		}
	}

	var_dump($params);
});

$app->get('/api/task/:user_id/', function ($user_id) {
	echo "Hello, $user_id";
});

$app->run();
