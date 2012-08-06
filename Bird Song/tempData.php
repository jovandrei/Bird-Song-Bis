<?php
	include('php/conexion.php');
	$link = Conectarse();

	$id = $_POST['id'];
	$campo = $_POST['campo'];
	//$id = mysql_real_escape_string($_POST['name']);

	$tabla = "researcher";
	$sql = "SELECT first_name,last_name from $tabla where idRESEARCHER='$id'";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$nombre = $data[$campo];
	echo $nombre;	
?>