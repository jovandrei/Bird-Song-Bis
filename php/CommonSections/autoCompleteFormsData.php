<?php
// Este metodo recibe un campo y le pone su valor segun la opcion elegida en el menu desplegable asociado
	include('conexion.php');
	$link = Conectarse();

/* RECOVER POST VARIABLES*/
	$table = $_POST['table'];
	$id = $_POST['id'];
	$fieldNumber = $_POST['fieldNumber'];
	$fieldName = $_POST['fieldName'];
	$addZero = $_POST['addZero'];
	
	$dato = "";
	if ($id != "New")
		$dato = chooseTable($table);
	
	if ($fieldNumber < 10)
		$field = "0".$fieldNumber.$dato;
	else 
		$field = $fieldNumber.$dato;
	echo $field;
	
	
	function chooseTable($table) {
		global $sql, $id, $fieldName, $addZero;
		
		$counterId = substr($id, -1);	// counter to differentiate rows with the same Ids
		$id = substr($id, 0, -1);
		
		$query = mysql_query("select * from $table");
		$IDfield = mysql_fetch_field($query, 0);
		$sql = "SELECT $fieldName from $table where $IDfield->name='$id'";
		$result = mysql_query($sql);
		
		$counter = 0;
		while ($data=mysql_fetch_array($result)) {
			if ($counter++ == $counterId) {
				$dato = $data[0];
				if ($addZero == "true")
					$dato .= "0";
			}
		}
		//$data = mysql_fetch_array($result);
		//$dato = $data[0];
	
		return $dato;
	}

?>