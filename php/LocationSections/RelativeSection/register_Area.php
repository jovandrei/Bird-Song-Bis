<?php 
function registerArea($relativeLocationIndex) {
	
	include_once('register_Region.php');
	registerRegion($relativeLocationIndex);
	$REGION_idREGION = getRegion_IDS(0);
	
	$areaName = $_POST["areaName_$relativeLocationIndex"];
	$areaDescription = $_POST["areaDescription_$relativeLocationIndex"];
	
	$tabla="area";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idAREA, REGION_idREGION, name, description) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$REGION_idREGION'";
	$sql .= ", '$areaName'";
	$sql .= ", '$areaDescription'";
	$sql .= ");";
	
	mysql_query($sql);
}

function getArea_IDS($pos) {
	$tabla="area";
	$sql = "SELECT Max(idAREA) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$id = $data[$pos];
		
	return $id;
}

?> 