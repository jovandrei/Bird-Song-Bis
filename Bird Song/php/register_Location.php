<?php 
include('conexion.php');
$link = Conectarse();

// Absolute Location //
$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];
$elevation = $_POST["elevation"];

// Relative Location //
$distance = $_POST["distance"];
$angle = $_POST["angle"];
// Point of reference
$country = $_POST["country"];
$state_or_province = $_POST["state_or_province"];
$description = $_POST["description"];

// Environment //
$comments = $_POST["comments"];
// Vegetation

// Add one because de the counter in html starts at 0,
// and the one in script starts at 1.
$numVegetation =  $_COOKIE["nextVegetation"] + 1;
for($i=0; $i<$numVegetation; $i++) {
	$average_density[$i] = $_POST["average_density$i"];
	echo ($average_density[$i]);
	$projected_cover[$i] = $_POST["projected_cover$i"];
	$average_height[$i] = $_POST["average_height$i"];
	// Vegetation Species
	$scientific_name[$i] = $_POST["scientific_name$i"];
	$common_name[$i] = $_POST["common_name$i"];
}
/************************************************/
$tabla="point_of_reference";   

$sql = "INSERT INTO $tabla (idPOINT_OF_REFERENCE, country, state_or_province, description) VALUES (";
$sql .= "NULL";
$sql .= ", '$country'";
$sql .= ", '$state_or_province'";
$sql .= ", '$description'";
$sql .= ");";

mysql_query($sql);
$sql = "SELECT MAX(idPOINT_OF_REFERENCE) from $tabla";
$result = mysql_query($sql);
$data = mysql_fetch_array($result);
$POINT_OF_REFERENCE_idPOINT_OF_REFERENCE = $data[0];
/************************************************/
$tabla="relative_location"; 

$sql = "INSERT INTO $tabla (idRELATIVE_LOCATION, distance, angle, POINT_OF_REFERENCE_idPOINT_OF_REFERENCE) VALUES (";
$sql .= "NULL";
$sql .= ", '$distance'";
$sql .= ", '$angle'";
$sql .= ", '$POINT_OF_REFERENCE_idPOINT_OF_REFERENCE'";
$sql .= ");";


mysql_query($sql);
$sql = "SELECT Max(idRELATIVE_LOCATION) from $tabla";
$result = mysql_query($sql);
$data = mysql_fetch_array($result);
$RELATIVE_LOCATION_idRELATIVE_LOCATION = $data[0];
/************************************************/
$tabla="absolute_location";

$sql = "INSERT INTO $tabla (idABSOLUTE_LOCATION, longitude, latitude, elevation) VALUES (";
$sql .= "NULL";
$sql .= ", '$longitude'";
$sql .= ", '$latitude'";
$sql .= ", '$elevation'";
$sql .= ");";

mysql_query($sql);
$sql = "SELECT Max(idABSOLUTE_LOCATION) from $tabla";
$result = mysql_query($sql);
$data = mysql_fetch_array($result);
$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = $data[0];
/************************************************/
$tabla="environment";

$sql = "INSERT INTO $tabla (idENVIRONMENT, comments) VALUES (";
$sql .= "NULL";
$sql .= ", '$comments'";
$sql .= ");";

mysql_query($sql);
$sql = "SELECT Max(idENVIRONMENT) from $tabla";
$result = mysql_query($sql);
$data = mysql_fetch_array($result);
$ENVIRONMENT_idENVIRONMENT = $data[0];
/************************************************/
/************************************************/
for($i=0; $i<$numVegetation; $i++) {
	$tabla="vegetation_species";

	$sql = "INSERT INTO $tabla (idVEGETATION_SPECIES, scientific_name, common_name) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$scientific_name[$i]'";
	$sql .= ", '$common_name[$i]'";
	$sql .= ");";

	mysql_query($sql);
	$sql = "SELECT Max(idVEGETATION_SPECIES) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$VEGETATION_SPECIES_idVEGETATION_SPECIES = $data[0];
	/************************************************/
	$tabla="vegetation";

	$sql = "INSERT INTO $tabla (idVEGETATION, average_density, projected_cover, average_height, ";
	$sql .= "VEGETATION_SPECIES_idVEGETATION_SPECIES, ENVIRONMENT_idENVIRONMENT) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$average_density[$i]'";
	$sql .= ", '$projected_cover[$i]'";
	$sql .= ", '$average_height[$i]'";
	$sql .= ", '$VEGETATION_SPECIES_idVEGETATION_SPECIES'";
	$sql .= ", '$ENVIRONMENT_idENVIRONMENT'";
	$sql .= ");";

	mysql_query($sql);
}
/************************************************/
/************************************************/
$tabla="location";

$sql = "INSERT INTO $tabla (idLOCATION, ABSOLUTE_LOCATION_idABSOLUTE_LOCATION, RELATIVE_LOCATION_idRELATIVE_LOCATION,";
$sql .= "ENVIRONMENT_idENVIRONMENT) VALUES (";
$sql .= "NULL";
$sql .= ", '$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION'";
$sql .= ", '$RELATIVE_LOCATION_idRELATIVE_LOCATION'";
$sql .= ", '$ENVIRONMENT_idENVIRONMENT'";
$sql .= ");";

mysql_query($sql);

mysql_close();
header("location: ../Location.php"); 
?> 