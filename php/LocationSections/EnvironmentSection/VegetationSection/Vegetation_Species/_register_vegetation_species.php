<?php 
function registerVegetationSpecies($vegetationSpeciesIndex) {
	
	$vegetation_species_select_option = $_POST["vegetation_species_$vegetationSpeciesIndex"];			// get the select option value
	if ($vegetation_species_select_option != "New")					// if its not "New", don't add anything
		return $vegetation_species_select_option;
		
	$scientific_name = $_POST["scientific_name_$vegetationSpeciesIndex"];
	$common_name = $_POST["common_name_$vegetationSpeciesIndex"];
	
	$tabla="vegetation_species";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idVEGETATION_SPECIES, scientific_name, common_name) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$scientific_name'";
	$sql .= ", '$common_name'";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idVEGETATION_SPECIES) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$VEGETATION_SPECIES_idVEGETATION = $data[0];
	return $VEGETATION_SPECIES_idVEGETATION;
}

?> 