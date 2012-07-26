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
	
	include('register_RelativeLocationhasMarker.php');
	registerRelativeLocationhasMarker($RELATIVE_LOCATION_idRELATIVE_LOCATION);
	
	return $RELATIVE_LOCATION_idRELATIVE_LOCATION;
}

?> 