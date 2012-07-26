<?php 
function registerRegion() {
	$regionName = $_POST["regionName"];
	$country = $_POST["country"];
	$state_or_province = $_POST["state_or_province"];
	$regionDescription = $_POST["regionDescription"];
	
	$tabla="region";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idREGION, name, country, state_or_province, description) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$regionName'";
	$sql .= ", '$country'";
	$sql .= ", '$state_or_province'";
	$sql .= ", '$regionDescription'";
	$sql .= ");";
	
	mysql_query($sql);
}

function getRegion_IDS($pos) {
	$tabla="region";
	$sql = "SELECT Max(idREGION) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$id = $data[$pos];
		
	return $id;
}


?> 