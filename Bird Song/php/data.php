<?php 
include('conexion.php');
$link = Conectarse();

function researcherData() {
	$tabla="researcher";
	$sql = "SELECT idRESEARCHER, first_name, last_name FROM $tabla"; 
	$result = mysql_query($sql);

	$options=""; 

	while ($row=mysql_fetch_array($result)) { 

		$idRESEARCHER=$row["idRESEARCHER"]; 
	    $first_name=$row["first_name"]; 
	    $last_name=$row["last_name"]; 
	    $options .= "<option value=\"$idRESEARCHER\" >$first_name $last_name</option>";
	}
	return $options;
}

function experimentData() {
	$tabla="experiment";
	$sql = "SELECT idEXPERIMENT, first_name, last_name FROM $tabla"; 
	$result = mysql_query($sql);

	$options=""; 

	while ($row=mysql_fetch_array($result)) { 

		$idEXPERIMENT=$row["idEXPERIMENT"]; 
	    $first_name=$row["first_name"]; 
	    $last_name=$row["last_name"]; 
	    $options .= "<option value=\"$idEXPERIMENT\" >$first_name $last_name</option>";
	}
	return $options;
}

function locationData() {
	$tabla="location";
	$sql = "SELECT idLOCATION FROM $tabla"; 
	$result = mysql_query($sql);

	$options=""; 

	while ($row=mysql_fetch_array($result)) { 

		$idLOCATION=$row["idLOCATION"]; 
	    $options .= "<option value=\"$idLOCATION\" >Location $idLOCATION</option>";
	}
	return $options;
}
?> 