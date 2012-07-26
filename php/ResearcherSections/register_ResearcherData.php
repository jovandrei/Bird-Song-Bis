<?php 
include('../CommonSections/conexion.php');
$link = Conectarse();

$idRESEARCHER = $_POST["researcher"];
if ($idRESEARCHER == "New") {
	include('register_Researcher.php');
	$idRESEARCHER = registerResearcher();
}
	
mysql_close(); 
header("location: ../../Researcher.php"); 
?> 