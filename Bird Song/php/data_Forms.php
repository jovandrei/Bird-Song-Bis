<?php
	include('conexion.php');
	$link = Conectarse();

/* RECOVER POST VARIABLES*/
	//*
	$type = $_POST['type'];
	$id = $_POST['id'];
	$campo = $_POST['campo'];
	//*/
	if ($type === "Location") data_Location();
	else if ($type === "Researcher") data_Researcher();
	
	//mysql_query("INSERT INTO researcher (idRESEARCHER, first_name, last_name, email) VALUES (NULL, 'first', 'last', 'mail');");
/* FUNCTION DECLARATIONS */
	function data_Location() {
		// take the global information
		global $id, $campo;
		// retrieve absolute, relative and environmet location id's from location table.
		$tabla = "location";
		$sql = "SELECT ABSOLUTE_LOCATION_idABSOLUTE_LOCATION, RELATIVE_LOCATION_idRELATIVE_LOCATION,";
		$sql .= "ENVIRONMENT_idENVIRONMENT from $tabla where idLOCATION='$id'";
		$result = mysql_query($sql);
		$data = mysql_fetch_array($result);
		$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = $data[0];
		$RELATIVE_LOCATION_idRELATIVE_LOCATION = $data[1];
		$ENVIRONMENT_idENVIRONMENT = $data[2];
		
		// retrive absolute location data.
		if ($campo <=2){
			$tabla = "absolute_location";
			$sql = "SELECT longitude, latitude, elevation from $tabla ";
			$sql .= "where idABSOLUTE_LOCATION='$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$dato = $data[$campo];
		}
		// retrive relative location data.
		else if ($campo <=4){
			$campo = $campo - 3; // relative position of camp
			$tabla = "relative_location";
			$sql = "SELECT distance, angle from $tabla ";
			$sql .= "where idRELATIVE_LOCATION='$RELATIVE_LOCATION_idRELATIVE_LOCATION'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$dato = $data[$campo];
			$campo = $campo + 3; // absolute position of camp
		
		}
		// retrive point of reference data.
		else if ($campo <=7){
			// retrive point of reference id from relative location table
			$tabla = "relative_location";
			$sql = "SELECT POINT_OF_REFERENCE_idPOINT_OF_REFERENCE from $tabla ";
			$sql .= "where idRELATIVE_LOCATION='$RELATIVE_LOCATION_idRELATIVE_LOCATION'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$POINT_OF_REFERENCE_idPOINT_OF_REFERENCE = $data[0];

			// retrieve point of reference data
			$campo = $campo - 5; // relative position of camp
			$tabla = "point_of_reference";
			$sql = "SELECT state_or_province, country, description from $tabla ";
			$sql .= "where idPOINT_OF_REFERENCE='$POINT_OF_REFERENCE_idPOINT_OF_REFERENCE'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$dato = $data[$campo];
			$campo = $campo + 5; // absolute position of camp
		
		}
		// retrieve environment data
		else if ($campo <= 8) {
			$campo = $campo - 8;
			$tabla = "environment";
			$sql = "SELECT comments from $tabla ";
			$sql .= "where idENVIRONMENT='$ENVIRONMENT_idENVIRONMENT'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$dato = $data[$campo];
			$campo = $campo + 8; // absolute position of camp
			
		}
		// retrieve multiple vegetation data.
		else if ($campo <= 11) {
			$campo = $campo - 9;
			$tabla = "vegetation";
			$sql = "SELECT average_density, projected_cover, average_height from $tabla ";
			$sql .= "where ENVIRONMENT_idENVIRONMENT='$ENVIRONMENT_idENVIRONMENT'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$dato = $data[$campo];
			$campo = $campo + 9; // absolute position of camp
			
		}
		// retrieve multiple vegetation species data
		else if ($campo <= 13) {
			// retrive point of reference id from relative location table
			$tabla = "vegetation";
			$sql = "SELECT VEGETATION_SPECIES_idVEGETATION_SPECIES from $tabla ";
			$sql .= "where ENVIRONMENT_idENVIRONMENT='$ENVIRONMENT_idENVIRONMENT'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$VEGETATION_SPECIES_idVEGETATION_SPECIES = $data[0];

			// retrieve multiple vegetation species data
			$campo = $campo - 12;
			$tabla = "vegetation_species";
			$sql = "SELECT scientific_name, common_name from $tabla ";
			$sql .= "where idVEGETATION_SPECIES='$VEGETATION_SPECIES_idVEGETATION_SPECIES'";
			$result = mysql_query($sql);
			$data = mysql_fetch_array($result);
			$dato = $data[$campo];
			$campo = $campo + 12; // absolute position of camp
		}

		if ($campo < 10)
			$field = "0".$campo.$dato;
		else 
			$field = $campo.$dato;
		echo $field;
		

	}

	function data_Researcher() {
		global $id, $campo;
		$tabla = "researcher";
		$sql = "SELECT first_name,last_name, email from $tabla where idRESEARCHER='$id'";
		$result = mysql_query($sql);
		$data = mysql_fetch_array($result);
		$dato = $data[$campo];
		
		if ($campo < 10)
			$field = "0".$campo.$dato;
		else 
			$field = $campo.$dato;
		echo $field;
	}

?>