<?php 
function registerMarker($relativeLocationIndex) {
	
	include_once('Area/_register_Area.php');
	registerArea($relativeLocationIndex);
	$AREA_idAREA = getArea_IDS(0);
	$AREA_REGION_idREGION = getRegion_IDS(0);
	
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
}

function getMarker_IDS($pos) {
	$tabla="marker";
	$sql = "SELECT Max(idMARKER) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$id = $data[$pos];
		
	return $id;
}

?> 