<?php

include('conexion.php');
$link = Conectarse();

$selectOptionElements = array(
	"researcher"=> array ("first_name", " ", "last_name"),
	"Location"=> array (" "),
	"absolute_location"=> array ("latitude", ", " ,"longitude", ", " ,"elevation"),
	"relative_location_has_marker"=> array ("distance", " m ", "position"),
	"Marker"=> array ("name"),
	"Area"=> array ("name"),
	"Region"=> array ("name")
  );

// Metodo que jala de la BD todos los registros de la tabla $type
// y regresa las opciones en formato HTML

// Es llamado por el metodo options_section
function sectionData($tabla) {
	global $selectOptionElements;
	$sql = "SELECT * FROM $tabla"; 
	$result = mysql_query($sql);
	
	/*************************/
	$sqlPrimaryKey = "SELECT COLUMN_NAME FROM information_schema.COLUMNS
						WHERE (TABLE_SCHEMA = 'bird_tracks')
  						AND (TABLE_NAME = '$tabla')
  						AND (COLUMN_KEY = 'PRI')";
	$resultBis = mysql_query($sqlPrimaryKey);
	
	/*************************/
	
	$options = ""; 
	$count = 0;
	$rowBis = mysql_fetch_array($resultBis);
	$primaryKeyName = $rowBis[0];
	while ($rowBis=mysql_fetch_array($resultBis)) {
		//$primaryKeyName .= "/".$rowBis[0];	
	}
	if ($result) {
		while ($row=mysql_fetch_array($result)) { 
		    $options .= "<option value=\"".$row[$primaryKeyName]."\" >"
		    			.++$count.". ";
		    			
		    			for ($i=0; $i<count($selectOptionElements[$tabla]); $i++) {
		    				$val = $selectOptionElements[$tabla][$i]; // for easier syntax
		    				if ($val == ". " || $val == ", " || $val == " " || $val == " m ") {
		    					$options .= $val;
		    				} else {
		    					$options .= $row[$val];
		    				}
		    			}
		    			if ($tabla == "relative_location_has_marker") {
		    				$idMarker = $row["MARKER_idMARKER"];
							$sql2 = "SELECT * FROM MARKER WHERE idMARKER=$idMarker";
							$result2 = mysql_query($sql2);
							$data = mysql_fetch_array($result2);
							$markerName = $data['name'];
							$options .= " ". $markerName;
		    			}
		    			
		    			$options .= "</option>";	
		}
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
	$name = $type."_".$index;
	$optionsAvailable = sectionData($type);
	
	$options = "<li class=\"notranslate\">
					<div>
						<select id=\"$nameId\" name=\"$name\" class=\"field select medium\" >
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
	$name = $type."_".$index;
	$optionsAvailable = sectionData($type);

	$options = "<div>
					<span class = \"left\">
						<select id=\"$nameId\" name=\"$name\" class=\"field select addr\"> 
							<option value=\"New\" selected=\"selected\">New $type</option>
							<option value=\"\" disabled=\"disabled\">--------</option>
				 			$optionsAvailable
						</select>
					</span>
				</div>";
	return $options;
}
?>