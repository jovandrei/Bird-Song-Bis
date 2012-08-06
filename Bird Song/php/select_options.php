<?php 
include('conexion.php');
$link = Conectarse();

function sectionData($type) {
	$tabla=$type;
	$sql = "SELECT * FROM $tabla"; 
	$result = mysql_query($sql);

	$options=""; 
	switch ($tabla) {
		case "Researcher":
			while ($row=mysql_fetch_array($result)) { 
				$idRESEARCHER=$row["idRESEARCHER"]; 
			    $first_name=$row["first_name"]; 
			    $last_name=$row["last_name"]; 
			    $options .= "<option value=\"$idRESEARCHER\" >$first_name $last_name</option>";				
			}
			break;
			
		case "Location":
			while ($row=mysql_fetch_array($result)) { 
				$idLOCATION=$row["idLOCATION"]; 
			    $options .= "<option value=\"$idLOCATION\" >Location $idLOCATION</option>";
			}
			break;
		
		case "Experiment":
			break;
	}
	
	return $options;
}
?> 