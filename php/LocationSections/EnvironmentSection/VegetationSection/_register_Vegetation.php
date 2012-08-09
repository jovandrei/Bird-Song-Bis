<?php 
function registerVegetation() {
	
	$vegetation_select_option = $_POST["vegetation_0"];			// get the select option value
	if ($vegetation_select_option != "New")					// if its not "New", don't add anything
		return $vegetation_select_option;
		
	$vegetationType = $_POST["vegetationType_0"];
	
	$tabla="vegetation";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idVEGETATION, vegetation_type) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$vegetationType'";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idVEGETATION) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$VEGETATION_idVEGETATION = $data[0];
	return $VEGETATION_idVEGETATION;
}

?> 