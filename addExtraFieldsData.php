<?php
	require_once('/php/CommonSections/headerSection.php');
	
	/* RECOVER POST VARIABLES */
	$index = $_POST['index'];
	$field = include('/php/LocationSections/RelativeSection/RelativeTestSection.php');
	echo $field;

?>