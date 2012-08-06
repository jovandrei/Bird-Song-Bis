<?php 
include('../CommonSections/conexion.php');
$link = Conectarse();

include('/AbsoluteSection/_register_Absolute.php');
$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = registerAbsoluteLocation();

include('/RelativeSection/_register_Relative.php');
$RELATIVE_LOCATION_idRELATIVE_LOCATION = registerRelativeLocation();

include('/EnvironmentSection/_register_Environment.php');
//registerEnvironment();

mysql_close(); 
header("location: ../../Location.php"); 
?> 