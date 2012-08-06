<?php 
include('conexion.php');
$link = Conectarse();

$first_name = $_POST["first_name"];
$last_name = $_POST["last_name"];
$email = $_POST["email"];

$tabla="researcher";   //NOMBRE DE LA TABLA A MOSTRAR

$sql = "INSERT INTO $tabla (idRESEARCHER, first_name, last_name, email) VALUES (";
$sql .= "NULL";
$sql .= ", '$first_name'";
$sql .= ", '$last_name'";
$sql .= ", '$email'";
$sql .= ");";

mysql_query($sql); 

mysql_close(); 
header("location: ../Researcher.php"); 
?> 