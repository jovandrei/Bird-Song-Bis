<?php
	require_once('php/CommonSections/headerSection.php');
	
	/* RECOVER POST VARIABLES */
	$index = $_POST['index'];
	$path = $_POST['path'];
	$field = include($path);
	echo $field;

?>