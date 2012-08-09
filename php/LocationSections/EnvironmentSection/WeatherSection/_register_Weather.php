<?php 
function registerWeather() {
	
	$weather_select_option = $_POST["weather_0"];			// get the select option value
	if ($weather_select_option != "New")					// if its not "New", don't add anything
		return $weather_select_option;
		
	$weatherDescription = $_POST["weatherDescription_0"];
	
	$tabla="weather";   //NOMBRE DE LA TABLA A MOSTRAR
	
	$sql = "INSERT INTO $tabla (idWEATHER, description) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$weatherDescription'";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idWEATHER) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$WEATHER_idWEATHER = $data[0];
	return $WEATHER_idWEATHER;
}

?> 