<?php 
function registerArea($relativeLocationIndex) {
	
	$AREA_idAREA = $_POST["Area_0"];
	if ($AREA_idAREA != "New")
		return substr($AREA_idAREA, 0, -1);
		
	include_once('RegionSection/_register_Region.php');
	$REGION_idREGION = registerRegion($relativeLocationIndex);
	
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
	
	$sql = "SELECT Max(idAREA) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$AREA_idAREA = $data[0];
	return $AREA_idAREA;
}

?> 