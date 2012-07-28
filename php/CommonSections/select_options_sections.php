<?php

include('conexion.php');
$link = Conectarse();


// Metodo que jala de la BD todos los registros de la tabla $type
// y regresa las opciones en formato HTML

// Es llamado por el metodo options_section
function sectionData($type) {
	$tabla=$type;
	$sql = "SELECT * FROM $tabla"; 
	$result = mysql_query($sql);

	$options=""; 
	$count=0;
	switch ($tabla) {
		case "researcher":
			while ($row=mysql_fetch_array($result)) { 
			    $options .= "<option value=\"".$row["idRESEARCHER"]."\" >"
			    			.++$count.". ".$row["first_name"]." ".$row["last_name"]."</option>";				
			}
			break;
			
		case "Location":
			while ($row=mysql_fetch_array($result)) { 
			    $options .= "<option value=\"".$row["idLOCATION"]."\" >"
			    			."Location ".++$count."</option>";	
			}
			break;
		
		case "absolute_location":
			while ($row=mysql_fetch_array($result)) { 
			    $options .= "<option value=\"".$row["idABSOLUTE_LOCATION"]."\" >"
			    			.++$count.". ".$row["latitude"].", ".$row["longitude"].", ".$row["elevation"]."</option>";	
			}
			break;
			
		case "relative_location":
			$sql = "SELECT * FROM RELATIVE_LOCATION_HAS_MARKER"; 
			$result = mysql_query($sql);
			
			while ($row=mysql_fetch_array($result)) {
				$idMarker = $row["MARKER_idMARKER"];
				$sql2 = "SELECT NAME FROM MARKER WHERE idMARKER=$idMarker";
				$result2 = mysql_query($sql2);
				$data = mysql_fetch_array($result2);
				$markerName = $data[0];
		
			    $options .= "<option value=\"".$row["RELATIVE_LOCATION_idRELATIVE_LOCATION"]."\" >"
			    			.++$count.". ".$row["distance"]." m ".$row["position"]." ".$markerName."</option>";	
			}
			break;
		
		case "Marker":
			while ($row=mysql_fetch_array($result)) { 
			    $options .= "<option value=\"".$row["idMARKER"]."\" >"
					.++$count.". ".$row["name"]."</option>";	
			}
			break;
			
		case "Area":
			while ($row=mysql_fetch_array($result)) { 
			    $options .= "<option value=\"".$row["idAREA"]."\" >"
					.++$count.". ".$row["name"]."</option>";	
			}
			break;
			
		case "Region":
			while ($row=mysql_fetch_array($result)) { 
			    $options .= "<option value=\"".$row["idREGION"]."\" >"
					.++$count.". ".$row["name"]."</option>";	
			}
			break;
			
	}
	
	return $options;
}

// Regresa un menu desplegable HTML con los valores de la tabla $type
function options_section($type) {
	$nameId = $type . "_id";
	$optionsAvailable = sectionData($type);
	
	$options = "<li class=\"notranslate\">
					<div>
						<select id=\"$nameId\" name=\"$type\" class=\"field select medium\" >
							<option value=\"New\" selected=\"selected\">New $type</option>
							<option value=\"\" disabled=\"disabled\">--------</option>
				 			$optionsAvailable
						</select>
					</div>
				</li>";
	return $options;
}

function options_section2($type, $index) {
	$nameId = $type."_".$index."_id";
	$optionsAvailable = sectionData($type);
	
	$options = "<li class=\"notranslate\">
					<div>
						<select id=\"$nameId\" name=\"$type$index\" class=\"field select medium\" >
							<option value=\"New\" selected=\"selected\">New $type</option>
							<option value=\"\" disabled=\"disabled\">--------</option>
				 			$optionsAvailable
						</select>
					</div>
				</li>";
	return $options;
}

function options_section_in($type) {
	$nameId = $type . "_id";
	$optionsAvailable = sectionData($type);

	$options = "<div>
					<span class = \"left\">
						<select id=\"$nameId\" name=\"$type\" class=\"field select addr\"> 
							<option value=\"New\" selected=\"selected\">New $type</option>
							<option value=\"\" disabled=\"disabled\">--------</option>
				 			$optionsAvailable
						</select>
					</span>
				</div>";
	return $options;
}

function options_section_in2($type, $index) {
	$nameId = $type."_".$index."_id";
	$optionsAvailable = sectionData($type);

	$options = "<div>
					<span class = \"left\">
						<select id=\"$nameId\" name=\"$type$index\" class=\"field select addr\"> 
							<option value=\"New\" selected=\"selected\">New $type</option>
							<option value=\"\" disabled=\"disabled\">--------</option>
				 			$optionsAvailable
						</select>
					</span>
				</div>";
	return $options;
}
?>