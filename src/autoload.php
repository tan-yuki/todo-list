<?php

function __autoload($name) {
	echo "aaaa";
	echo $name;
	require_once('./classes/' . $name . '.php');
}

