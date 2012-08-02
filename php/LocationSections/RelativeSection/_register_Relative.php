<?php 
function registerRelativeLocation() {
	$tabla="relative_location";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idRELATIVE_LOCATION) VALUES (";
	$sql .= "NULL";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idRELATIVE_LOCATION) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$RELATIVE_LOCATION_idRELATIVE_LOCATION = $data[0];
	
	include('_register_Relatives.php');
	$numRelativeLocation =  $_COOKIE["nextRelativeLocation"]; // I read the cookie containing the number of relative locations
	// The index starts at -1, don't know why but it looks like it starts at -2 so +1 does it
	for ($relativeLocationIndex = 0; $relativeLocationIndex <= $numRelativeLocation+1; $relativeLocationIndex++) { 
		registerRelativeLocationhasMarker($RELATIVE_LOCATION_idRELATIVE_LOCATION, $relativeLocationIndex);
	}
	
	return $RELATIVE_LOCATION_idRELATIVE_LOCATION;
}

?> 