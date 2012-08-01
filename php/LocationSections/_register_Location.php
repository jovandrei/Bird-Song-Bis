<?php 
include('../CommonSections/conexion.php');
$link = Conectarse();

include('/AbsoluteSection/_register_AbsoluteLocation.php');
$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = registerAbsoluteLocation();

include('/RelativeSection/_register_RelativeLocation.php');
$RELATIVE_LOCATION_idRELATIVE_LOCATION = registerRelativeLocation();

mysql_close(); 
header("location: ../../Location.php"); 
?> 