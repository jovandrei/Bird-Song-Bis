<?php 
function registerVegetation() {
	
	$vegetation_select_option = $_POST["vegetation_0"];			// get the select option value
	if ($vegetation_select_option != "New")					// if its not "New", don't add anything
		return substr($vegetation_select_option, 0, -1);
		
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
	
	include('_register_Vegetation_has_Vegetation_Species.php');
	$numVegetationSpecies =  $_COOKIE["nextVegetationSpecies"]; // I read the cookie containing the number of relative locations
	
	for ($vegetationSpeciesIndex = 0; $vegetationSpeciesIndex <= $numVegetationSpecies; $vegetationSpeciesIndex++) {
		$vegetation_has_vegetation_species_select_option = $_POST["vegetation_has_vegetation_species_$vegetationSpeciesIndex"];
		if ($vegetation_has_vegetation_species_select_option == "New")
			register_vegetation_has_vegetation_species($VEGETATION_idVEGETATION, $vegetationSpeciesIndex);
	}
	
	return $VEGETATION_idVEGETATION;
}

?> 