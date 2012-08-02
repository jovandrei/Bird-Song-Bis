<?php 
function registerRelativeLocationhasMarker($RELATIVE_LOCATION_idRELATIVE_LOCATION, $relativeLocationIndex) {
	
	include_once('Marker/_register_Marker.php');
	registerMarker($relativeLocationIndex);
	$MARKER_idMARKER = getMarker_IDS(0);
		
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