<?php 
function registerAbsoluteLocation() {
	
	$latitude = $_POST["latitude"];
	$longitude = $_POST["longitude"];
	$elevation = $_POST["elevation"];
	
	$tabla="absolute_location";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idABSOLUTE_LOCATION, latitude, longitude, elevation) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$latitude'";
	$sql .= ", '$longitude'";
	$sql .= ", '$elevation'";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idABSOLUTE_LOCATION) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = $data[0];
	return $ABSOLUTE_LOCATION_idABSOLUTE_LOCATION;
}

?> 