<?php 
include('../CommonSections/conexion.php');
$link = Conectarse();

$tabla = "location";
$locationDescription = $_POST["locationDescription_0"];

include('/AbsoluteSection/_register_Absolute.php');
$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = registerAbsoluteLocation();

include('/RelativeSection/_register_Relative.php');
$RELATIVE_LOCATION_idRELATIVE_LOCATION = registerRelativeLocation();

include('/EnvironmentSection/_register_Environment.php');
$ENVIRONMENT_idENVIRONMENT = registerEnvironment();

include('/location_has_file_SECTION/_REGISTER_location_has_file.php');
_REGISTER_location_has_file($RELATIVE_LOCATION_idRELATIVE_LOCATION, 
							$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION);

$sql = "INSERT INTO $tabla (
							ABSOLUTE_LOCATION_idABSOLUTE_LOCATION, 
							RELATIVE_LOCATION_idRELATIVE_LOCATION,
							ENVIRONMENT_idENVIRONMENT,
							comment
							) VALUES (";
	$sql .= "'$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION'";
	$sql .= ", '$RELATIVE_LOCATION_idRELATIVE_LOCATION'";
	$sql .= ", '$ENVIRONMENT_idENVIRONMENT'";
	$sql .= ", '$locationDescription'";
	$sql .= ");";
	
	mysql_query($sql);
	
mysql_close(); 
header("location: ../../Location.php"); 
?> 