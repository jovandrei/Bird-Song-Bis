<?php 
function registerResearcher() {
	
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$email = $_POST["email"];
	
	$tabla="researcher";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idRESEARCHER, first_name, last_name, email) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$first_name'";
	$sql .= ", '$last_name'";
	$sql .= ", '$email'";
	$sql .= ");";
	
	mysql_query($sql); 
	
	$sql = "SELECT Max(idRESEARCHER) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$idRESEARCHER = $data[0];
	return $idRESEARCHER;
}


?>