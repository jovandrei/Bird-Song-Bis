<?php 
include('conexion.php');
$link = Conectarse();

echo $miVariable;

$day_performed = $_POST["day_performed"];
$month_performed = $_POST["month_performed"];
$year_performed = $_POST["year_performed"];

$date = '10/30/2004';
$date = "$day_performed/$month_performed/$year_performed";
echo ($date);
list($month, $day, $year) = explode('/', $date);
$date_performed = $year . '-' . $month . '-' . $day;

$experimentDescription = $_POST["experimentDescription"];

$methodDescription = $_POST["methodDescription"];
/************************************/
$tabla="experiment";

$sql = "INSERT INTO $tabla (idEXPERIMENT, date_performed, description) VALUES (";
$sql .= "NULL";
$sql .= ", '$date_performed'";
$sql .= ", '$experimentDescription'";
$sql .= ");";

mysql_query($sql); 
echo ($sql);
$sql = "SELECT MAX(idEXPERIMENT) from $tabla";
$result = mysql_query($sql);
$data = mysql_fetch_array($result);
$EXPERIMENT_idEXPERIMENT = $data[0];
/************************************/
$tabla="method";

$sql = "INSERT INTO $tabla (idMETHOD, description) VALUES (";
$sql .= "NULL";
$sql .= ", '$new_date'";
$sql .= ", '$methodDescription'";
$sql .= ");";

mysql_query($sql);
$sql = "SELECT MAX(idMETHOD) from $tabla";
$result = mysql_query($sql);
$data = mysql_fetch_array($result);
$METHOD_idMETHOD = $data[0];
/************************************/
$tabla="experiment_has_method";

$sql = "INSERT INTO $tabla (EXPERIMENT_idEXPERIMENT, METHOD_idMETHOD) VALUES (";
$sql .= "NULL";
$sql .= ", '$EXPERIMENT_idEXPERIMENT'";
$sql .= ", '$METHOD_idMETHOD'";
$sql .= ");";

mysql_query($sql); 
/************************************/
$tabla="experiment_has_track";  // esta en un ciclo

$sql = "INSERT INTO $tabla (EXPERIMENT_idEXPERIMENT, TRACK_idTRACK) VALUES (";
$sql .= "NULL";
$sql .= ", '$EXPERIMENT_idEXPERIMENT'";
$sql .= ", '$TRACK_idTRACK'"; // FALTA RECOLECTARLO
$sql .= ");";

mysql_query($sql); 
/************************************/
$tabla="experiment_has_researcher"; // esta en un ciclo

$sql = "INSERT INTO $tabla (EXPERIMENT_idEXPERIMENT, RESEARCHER_idRESEARCHER) VALUES (";
$sql .= "NULL";
$sql .= ", '$EXPERIMENT_idEXPERIMENT'";
$sql .= ", '$RESEARCHER_idRESEARCHER'"; // FALTA RECOLECTARLO
$sql .= ");";

mysql_query($sql); 
/************************************/
$tabla="experiment_has_researcher"; // esta en un ciclo

$sql = "INSERT INTO $tabla (EXPERIMENT_idEXPERIMENT, RESEARCHER_idRESEARCHER) VALUES (";
$sql .= "NULL";
$sql .= ", '$EXPERIMENT_idEXPERIMENT'";
$sql .= ", '$TRACK_idTRACK'"; // FALTA RECOLECTARLO
$sql .= ");";

mysql_query($sql); 
/************************************/
$tabla="experiment_has_file"; // esta en un ciclo

$sql = "INSERT INTO $tabla (EXPERIMENT_idEXPERIMENT, FILE_idFILE) VALUES (";
$sql .= "NULL";
$sql .= ", '$EXPERIMENT_idEXPERIMENT'";
$sql .= ", '$FILE_idFILE'"; // FALTA RECOLECTARLO
$sql .= ");";

mysql_query($sql); 
/************************************/

mysql_close(); 
//header("location: ../Experiment.html"); 
?> 