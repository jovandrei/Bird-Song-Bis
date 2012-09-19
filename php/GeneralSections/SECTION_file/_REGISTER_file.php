<?php 
function REGISTER_file($fileIndex) {
	
	$file_type = $_POST["file_type_$fileIndex"];
	
	$tabla="file";   //NOMBRE DE LA TABLA A MOSTRAR
	
	// Where the file is going to be placed 
	$target_path = "/";

	/* Add the original filename to our target path.  
	Result is "/filename.extension" */
	$uploadedFile = "file_$fileIndex";
	$target_path = $target_path . basename( $_FILES['file_0']['name']); 

	/*
	if(move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"])) {
	    echo "The file ".  basename( $_FILES["file"]['name']). 
	    " has been uploaded";
	} else{
	    echo "There was an error uploading the file, please try again!";
	}
	*//*
	if ($_FILES["file"]["error"] > 0) {
    	echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    } else {
	    if (file_exists("upload/" . $_FILES["file"]["name"])) {
		} else {
			move_uploaded_file($_FILES["file"]["tmp_name"],
			"upload/" . $_FILES["file"]["name"]);
		}
	}*/
	//move_uploaded_file($_FILES["file"]["tmp_name"],"" . $_FILES["file"]["name"]);
	include('../../uploader.php');
	/*
	$sql = "INSERT INTO $tabla (idABSOLUTE_LOCATION, ) VALUES (";
	$sql .= "NULL";
	$sql .= ", '$latitude_degrees'";
	$sql .= ");";
	
	mysql_query($sql);
	
	$sql = "SELECT Max(idABSOLUTE_LOCATION) from $tabla";
	$result = mysql_query($sql);
	$data = mysql_fetch_array($result);
	$ABSOLUTE_LOCATION_idABSOLUTE_LOCATION = $data[0];
	return $ABSOLUTE_LOCATION_idABSOLUTE_LOCATION;
	*/
}

?> 