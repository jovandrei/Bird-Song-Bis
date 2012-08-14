<?php 
function registerMarker($relativeLocationIndex) {
	
	$MARKER_idMARKER = $_POST["Marker_0"];
	if ($MARKER_idMARKER != "New")
		return substr($MARKER_idMARKER, 0, -1);
		
		
	include_once('AreaSection/_register_Area.php');
	$AREA_idAREA = registerArea($relativeLocationIndex);
	
	$markerDescription = $_POST["markerDescription_$relativeLocationIndex"];
	$markerName = $_POST["markerName_$relativeLocationIndex"];
	
	$tabla="marker";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idMARKER, AREA_idAREA, name, description) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$AREA_idAREA'";
	$sql .= ", '$markerName'";
	$sql .= ", '$markerDescription'";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idMARKER) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$MARKER_idMARKER = $data[0];
	return $MARKER_idMARKER;
}

?> 