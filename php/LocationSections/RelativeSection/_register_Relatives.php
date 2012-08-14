<?php 
function registerRelativeLocationhasMarker($RELATIVE_LOCATION_idRELATIVE_LOCATION, $relativeLocationIndex) {
	
	include_once('MarkerSection/_register_Marker.php');
	$MARKER_idMARKER = registerMarker($relativeLocationIndex);
		
	$distance = $_POST["relativeDistance_$relativeLocationIndex"];
	$position = $_POST["relativePosition_$relativeLocationIndex"];
	
	$tabla="relative_location_has_marker";   //NOMBRE DE LA TABLA A MOSTRAR
	$sql = "INSERT INTO $tabla (RELATIVE_LOCATION_idRELATIVE_LOCATION, MARKER_idMARKER, distance, position) VALUES (";
	$sql .= "'$RELATIVE_LOCATION_idRELATIVE_LOCATION'";
	$sql .= ", '$MARKER_idMARKER'";
	$sql .= ", '$distance'";
	$sql .= ", '$position'";
	$sql .= ");";
	
	mysql_query($sql);
}

?>