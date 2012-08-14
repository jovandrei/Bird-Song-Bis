<?php 
function _REGISTER_location_has_file($LOCATION_RELATIVE_LOCATION_idRELATIVE_LOCATION, $LOCATION_ABSOLUTE_LOCATION_idABSOLUTE_LOCATION) {
	$tabla="location_has_file";   //NOMBRE DE LA TABLA A MOSTRAR
	
	include('../GeneralSections/SECTION_file/_REGISTER_file.php');
	$numFiles =  $_COOKIE["nextFile"]; // I read the cookie containing the number of files
	
	for ($fileIndex = 0; $fileIndex <= $numFiles; $fileIndex++) {
			$FILE_idFILE = REGISTER_file($fileIndex);
			
			$sql = "INSERT INTO $tabla (LOCATION_RELATIVE_LOCATION_idRELATIVE_LOCATION, 
										LOCATION_ABSOLUTE_LOCATION_idABSOLUTE_LOCATION,
										FILE_idFILE) VALUES (";
			$sql .= "$LOCATION_RELATIVE_LOCATION_idRELATIVE_LOCATION";
			$sql .= ", '$LOCATION_ABSOLUTE_LOCATION_idABSOLUTE_LOCATION'";
			$sql .= ", '$FILE_idFILE'";
			$sql .= ");";
			
			mysql_query($sql);
	}
	
}

?> 