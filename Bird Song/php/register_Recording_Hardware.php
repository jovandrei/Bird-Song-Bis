<?php 
include('conexion.php');
$link = Conectarse();

$type_of_device = $_POST["type_of_device"];
$comments = $_POST["comments"];

$tabla="recording_hardware";   //NOMBRE DE LA TABLA A MOSTRAR

$sql = "INSERT INTO $tabla (idRECORDING_HARDWARE, type_of_device, comments) VALUES (";
$sql .= "NULL";
$sql .= ", '$type_of_device'";
$sql .= ", '$comments'";
$sql .= ");";

mysql_query($sql); 

mysql_close();
header("location: ../Recording_Hardware.html"); 
?> 