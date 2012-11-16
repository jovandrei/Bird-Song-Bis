<?php

include('conexion.php');
$link = Conectarse();

$selectOptionElements = array(
	"researcher"						=>	array ("first_name"," ",	"last_name"),
	"location"							=>	array ("comment"),
	"absolute_location"					=>	array ("latitude_degrees","°",	"latitude_minutes","\"",	"latitude_seconds","'"," ",		"latitude_orientation",		", ",
													"longitude_degrees","°","longitude_minutes","\"",	"longitude_seconds","'"," ",	"longitude_orientation",	", ",
													"elevation", "m "),
	"relative_location_has_marker"		=>	array ("distance",	" m ",	"position",
													"$",		"MARKER_idMARKER",		"MARKER",	"name",		"$"),
	"Marker"							=>	array ("name", ", ", "description",	", ",
													"$",		"AREA_idAREA",		"AREA",	"name",		"$"),
	"Area"								=>	array ("name"),
	"Region"							=>	array ("name"),
	"environment"						=>	array ("comments_features"),
	"weather"							=>	array ("description"),
	"vegetation"						=>	array ("vegetation_type"),
	"vegetation_has_vegetation_species"	=>	array ("average_density",	", "	, "projected_cover",	", ",	 "average_height"),
	"vegetation_species"				=>	array ("scientific_name", 	", "	,"common_name"),
	"method"							=>	array ("description"),
	"track_has_subject"					=>	array ("$",		"SUBJECT_idSUBJECT",	"SUBJECT",	"name",		"$",	", ",	"recording_date"),
	"subject_species"					=>	array ("scientific_name", ", ", "common_name"),
	"recording_hardware"				=>	array ("type_of_device", ", ", "recorder"),
	"subject"							=>	array ("name",			", "	, 
													"$",	"SUBJECT_SPECIES_idSPECIES",	"SUBJECT_SPECIES",	"$"),
	"track"								=>	array ("$",		"RESEARCHER_idRESEARCHER",		"RESEARCHER",	"first_name", "last_name",		"$")
  );

// Metodo que jala de la BD todos los registros de la tabla $type
// y regresa las opciones en formato HTML
// Es llamado por el metodo options_section
function sectionData($table) {
	global $selectOptionElements;
	$sql = "SELECT * FROM $table"; 
	$result = mysql_query($sql);
	
	// Extract primary key column names
	$primaryKeyName = primaryKeyColumnNames($table);
	
	$options = ""; 
	$count = 0;
	/*****************************/
	$sameKeyCount = 0;
	$lastPrimaryKeyValue = 0;
	/*******/
	$checkChild = false;
	$checkChildIndex = 0;
	$child_id_column_name = ""; 
	$child_table_name = "";	
	$child_column_name = "";
	/*******/
	
	if ($result) { // If the mysql query returned results
		while ($row=mysql_fetch_array($result)) { // I extract row by row
			/*****************************/
			$nextValue = $row[$primaryKeyName];
			if ($lastPrimaryKeyValue != $nextValue) {
				$lastPrimaryKeyValue = $nextValue;
				$sameKeyCount = 0;
			} else {
				$sameKeyCount++;
			}
			/*****************************/
			
			$nextValue .= $sameKeyCount;	// I add a counter at the end to differentiate rows with the same primary key
		    $options .= "<option value=\"".$nextValue."\" >".++$count.". "; // the value is the row primary key
		    			
    		for ($i=0; $i<count($selectOptionElements[$table]); $i++) {
    			$val = $selectOptionElements[$table][$i]; // for easier syntax
    			
    			if ($val == "$") {
    				$checkChild = !$checkChild;// Start or end child checking
    				$checkChildIndex = 0;
    			} else if ($checkChild) { // If child started
    				if ($checkChildIndex == 0) { 
    					$child_id_column_name = $val; 
    					$checkChildIndex++; 
    				} else if ($checkChildIndex == 1) { 
    					$child_table_name = $val;
    					$checkChildIndex++; 
    				} else if ($checkChildIndex >= 2) { 
    					$child_column_name = $val; 
    					$checkChildIndex++;
    					$options .= " ".selectChildInfo ($row, $child_id_column_name, $child_table_name, $child_column_name);
    				}
    			} else if ($val == ". " || $val == ", " || $val == " " || $val == " m "
    						|| $val == "°" || $val == "m " || $val == "'"|| $val == "\"") { // If the array has a special character
    				$options .= $val;
    			} else { // if not a special character, search it as a column name
    				$options .= $row[$val];
    			}
    			
    		}
    		$options .= "</option>";	
		}
	}
	
	return $options;
}

function selectChildInfo ($row, $child_id_column_name, $child_table_name, $child_column_name) {
	$child_id = $row[$child_id_column_name];
	$child_primary_column_name = primaryKeyColumnNames($child_table_name);
	
	$sql = "SELECT * FROM $child_table_name WHERE $child_primary_column_name=$child_id";
	$result = mysql_query($sql);
	
	$data = mysql_fetch_array($result);
	$childInfo = $data[$child_column_name];
	return $childInfo;
} 

function primaryKeyColumnNames($table) {
	$sqlPrimaryKey = "SELECT COLUMN_NAME FROM information_schema.COLUMNS
						WHERE (TABLE_SCHEMA = 'bird_tracks')
  						AND (TABLE_NAME = '$table')
  						AND (COLUMN_KEY = 'PRI')";
	
	$resultBis = mysql_query($sqlPrimaryKey);
	$rowBis = mysql_fetch_array($resultBis);
	$primaryKeyName = $rowBis[0];
	while ($rowBis=mysql_fetch_array($resultBis)) {
		//$primaryKeyName .= "/".$rowBis[0];	// if the primary key is composite then it separates them with commas
	}
	return $primaryKeyName;
}

// It returns a HTML select section with data extracted from the db
function options_section2($type, $index) {
	$content = optionsCommon($type, $index);
	$options = "<li class=\"notranslate\">
					<div>
						<select class=\"field select medium\" $content
					</div>
				</li>";
	return $options;
}

// It returns a HTML select section with data extracted from the db
// Select within another select
function options_section_in2($type, $index) {
	$content = optionsCommon($type, $index);
	$options = "<div>
					<span class = \"left\">
						<select class=\"field select addr\" $content
					</span>
				</div>";
	return $options;
}

// Common section for both selects.
function optionsCommon ($type, $index) {
	$nameId = $type."_".$index."_id";
	$name = $type."_".$index;
	$optionsAvailable = sectionData($type);
	
	$options = "id=\"$nameId\" name=\"$name\">
					<option value=\"New\" selected=\"selected\">Select $type</option>
					<option value=\"\" disabled=\"disabled\">--------</option>
					$optionsAvailable
				</select>";
	return $options;
}

?>