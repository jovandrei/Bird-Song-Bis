<?php 
function registerAbsoluteLocation() {
	
	$absolute_select_option = $_POST["absolute_location_0"];
	if ($absolute_select_option != "New")
		return $absolute_select_option;
		
	$latitude_degrees = $_POST["latitude_degrees_0"]; // There is only 1, so there is no need to have a counter
	$latitude_minutes = $_POST["latitude_minutes_0"];
	$latitude_seconds = $_POST["latitude_seconds_0"];
	$latitude_orientation = $_POST["latitude_orientation_0"];
	
	$longitude_degrees = $_POST["longitude_degrees_0"];
	$longitude_minutes = $_POST["longitude_minutes_0"];
	$longitude_seconds = $_POST["longitude_seconds_0"];
	$longitude_orientation = $_POST["longitude_orientation_0"];
	
	$elevation = $_POST["elevation_0"];
	
	$tabla="absolute_location";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idABSOLUTE_LOCATION, 
									latitude_degrees, latitude_minutes, latitude_seconds, latitude_orientation,
									longitude_degrees, longitude_minutes, longitude_seconds, longitude_orientation,
									 elevation) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$latitude_degrees'";
	$sql .= ", '$latitude_minutes'";
	$sql .= ", '$latitude_seconds'";
	$sql .= ", '$latitude_orientation'";
	
	$sql .= ", '$longitude_degrees'";
	$sql .= ", '$longitude_minutes'";
	$sql .= ", '$longitude_seconds'";
	$sql .= ", '$longitude_orientation'";
	
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