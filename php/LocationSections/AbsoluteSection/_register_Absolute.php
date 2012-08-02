<?php 
function registerAbsoluteLocation() {
	
	$latitude = $_POST["latitude_0"]; // There is only 1, so there is no need to have a counter
	$longitude = $_POST["longitude_0"];
	$elevation = $_POST["elevation_0"];
	
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