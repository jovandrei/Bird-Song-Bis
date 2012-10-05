<?php 

include('../../CommonSections/conexion.php');
$link = Conectarse();

registerResearcher();
function registerResearcher() {
	
	$first_name = $_POST["first_name_0"];
	$last_name = $_POST["last_name_0"];
	$email = $_POST["email_0"];
	
	$tabla="RESEARCHER";   //NOMBRE DE LA TABLA A MOSTRAR
	
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