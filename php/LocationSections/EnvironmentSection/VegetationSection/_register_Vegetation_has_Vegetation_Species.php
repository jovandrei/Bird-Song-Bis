<?php 
function register_vegetation_has_vegetation_species($VEGETATION_idVEGETATION, $vegetationSpeciesIndex) {
	
	$vegetation_has_vegetation_species_select_option = $_POST["vegetation_has_vegetation_species_$vegetationSpeciesIndex"];	// get the select option value
	if ($vegetation_has_vegetation_species_select_option != "New")					// if its not "New", don't add anything
		return $vegetation_has_vegetation_species_select_option;
	
	include_once('Vegetation_Species/_register_vegetation_species.php');
	$VEGETATION_SPECIES_idVEGETATION_SPECIES = registerVegetationSpecies($vegetationSpeciesIndex);
	
	$average_density = $_POST["average_density_$vegetationSpeciesIndex"];
	$projected_cover = $_POST["projected_cover_$vegetationSpeciesIndex"];
	$average_height = $_POST["average_height_$vegetationSpeciesIndex"];
	
	$tabla="vegetation_has_vegetation_species";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (VEGETATION_idVEGETATION, VEGETATION_SPECIES_idVEGETATION_SPECIES,
								 average_density, projected_cover, average_height) VALUES (";
	$sql .= "'$VEGETATION_idVEGETATION'";
	$sql .= ", '$VEGETATION_SPECIES_idVEGETATION_SPECIES'";
	$sql .= ", '$average_density'";
	$sql .= ", '$projected_cover'";
	$sql .= ", '$average_height'";
	$sql .= ");";
	
	mysql_query($sql);

}

?> 