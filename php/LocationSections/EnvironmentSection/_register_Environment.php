<?php 
function registerEnvironment() {
	
	$environment_select_option = $_POST["environment_0"];			// get the select option value
	if ($environment_select_option != "New")						// if its not "New", don't add anything
		return $environment_select_option;
		
	include_once('WeatherSection/_register_Weather.php');			// Weather
	$WEATHER_idWEATHER = registerWeather();
	
	include_once('VegetationSection/_register_Vegetation.php');		// Vegetation
	$VEGETATION_idVEGETATION = registerVegetation();
		
	$comments = $_POST["environmentComments_0"]; 			// Get the only comment in environment
	
	$tabla="environment";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idENVIRONMENT, comments/features, WEATHER_idWEATHER, VEGETATION_idVEGETATION) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$comments'";
	$sql .= ", '$WEATHER_idWEATHER'";
	$sql .= ", '$VEGETATION_idVEGETATION'";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idENVIRONMENT) from $tabla";					//	Get the last added register's id
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$ENVIRONMENT_idENVIRONMENT = $data[0];
	return $ENVIRONMENT_idENVIRONMENT;
	
}

?> 