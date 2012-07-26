<?php 
include('../CommonSections/conexion.php');
$link = Conectarse();

include('/AbsoluteSection/register_AbsoluteLocation.php');
$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = registerAbsoluteLocation();

include('/RelativeSection/register_RelativeLocation.php');
$RELATIVE_LOCATION_idRELATIVE_LOCATION = registerRelativeLocation();

mysql_close(); 
header("location: ../../Location.php"); 
?> 