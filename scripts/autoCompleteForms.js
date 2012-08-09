// Php que recupera los valores de los campos deseados
var file = "php/CommonSections/autoCompleteFormsData.php";

// Valor constante "New" para los select
var NEW = "New";

//Esta bandera indica si el cambio en un select viene por el efecto cascada o es un cambio directo
var cascadeChange = false; 

var matriz = [["#researcher_$_id","#first_name_$_id", "#last_name_$_id", "#email_$_id"],									// 0
              ["#absolute_location_$_id",
               		"#longitude_degrees_$_id", "#longitude_minutes_$_id","#longitude_seconds_$_id","#longitude_orientation_$_id",
               		"#latitude_degrees_$_id", "#latitude_minutes_$_id", "#latitude_seconds_$_id","#latitude_orientation_$_id",
               		"#elevation_$_id"],																						// 1
               	["#relative_location_has_marker_$_id","#relativeDistance_$_id", "#relativePosition_$_id"],					// 2
               	["#Marker_$_id","#markerName_$_id", "#markerDescription_$_id"],												// 3
               	["#Area_$_id","#areaName_$_id", "#areaDescription_$_id"],													// 4
               	["#Region_$_id","#regionName_$_id", "#country_$_id", "#state_or_province_$_id", "#regionDescription_$_id"],	// 5
				["#environment_$_id", "#environmentComments_$_id"],
				["#weather_$_id", "#weatherDescription_$_id"],
				["#vegetation_$_id", "#vegetationType_$_id"]
				];

var matrizFields = [["first_name" , "last_name", "email"], 
                    ["longitude_degrees", "longitude_minutes", "longitude_seconds", "longitude_orientation",
			          "latitude_degrees", "latitude_minutes", "latitude_seconds", "latitude_orientation", 
			          "elevation"],
					["distance", "position"],
					["name", "description"],
					["name", "description"],
					["name", "country", "state_or_province", "description"],
					["comments/features"],
					["description"],
					["vegetation_type"]
					];

// Cuando se selecciona una opcion de algun menu desplegable, se rellenan los campos de la forma 
$(document).ready(function(){
 	$('select').change(function() {
 		formType = "#" + $(this).attr('id');					// #relativeLocation_1_id
 		var idMenu = $(formType).val();							// ID of Option selected
 		var type = formType.substr(1,formType.length-4);		// #relativeLocation_1_id -> relativeLocation_1
 		var index = type.substr(type.length-1,type.length-0);	// relativeLocation_1 -> 1
 		var etiquetas = new Array();
 		var fields = new Array();
 		type = formType.substr(1,formType.length-6); 		// #relativeLocation_1_id -> relativeLocation 
 		
 		changeMatrixElementsId (0, matriz.length-1, index);
 		switch (type) {	// I intend to catch all new types id, with number recognition
 		
 			case 'researcher':
 				//changeMatrixElementsId (0, matriz.length, index);
				etiquetas = matriz[0];	// Researcher
				fields = matrizFields[0];
			break;
			
 			case 'absolute_location':
 				//changeMatrixElementsId (1, 1, index);
				etiquetas = matriz[1];	// Absolute Location
				fields = matrizFields[1];
			break;
			
 			case 'relative_location_has_marker':
 				//changeMatrixElementsId (0, 5, index);	// change all his and its child's field index
				etiquetas = matriz[2];	// Relative Location
				fields = matrizFields[2];
		 		retrieveData(type, idMenu, matriz[3][0], "MARKER_idMARKER");	// Marker_id
			break;
			
 			case 'Marker':
 				//changeMatrixElementsId (3, 5, index);
 				etiquetas = matriz[3];	// Marker
 				fields = matrizFields[3];
 				cascadeChangeFunction(matriz[3][0]); // Marker_id
 		 		retrieveData(type, idMenu, matriz[4][0], "AREA_idAREA");		// Area_id
 			break;
 			
 			case 'Area':
 				//changeMatrixElementsId (4, 5, index);
 				etiquetas = matriz[4];	// Changes de id on the fields in Area, Region
 				fields = matrizFields[4];
 				cascadeChangeFunction(matriz[4][0]); // Area_id
 		 		retrieveData(type, idMenu, matriz[5][0], "REGION_idREGION");	// Region_id
 			break;
 			
 			case 'Region':
 				//changeMatrixElementsId (5, 5, index);
 				etiquetas = matriz[5];	// Region
 				fields = matrizFields[5];
 				cascadeChangeFunction(matriz[5][0]); // Region_id
 			break;
 			
 			case 'environment':
 				etiquetas = matriz[6];	
 				fields = matrizFields[6];
 		 		retrieveData(type, idMenu, matriz[7][0], "WEATHER_idWEATHER");	 		
 		 		retrieveData(type, idMenu, matriz[8][0], "VEGETATION_idVEGETATION");
 			break;
 			
 			case 'weather':
 				etiquetas = matriz[7];
 				fields = matrizFields[7];
 				cascadeChangeFunction(matriz[7][0]);
 			break;
 			
 			case 'vegetation':
 				etiquetas = matriz[8];
 				fields = matrizFields[8];
 				cascadeChangeFunction(matriz[8][0]);
 			break;
 				
 		}
 		
 		loadData(type, idMenu, etiquetas, fields);
	});
 	
 	// Saber si algun valor en algun campo a cambiado
 	$('input').change(function() { setNew(this); });
 	$('textarea').change(function() { setNew(this); });
 	$('select').change(function() { setNew(this); });
});

// Changes the Id of the subelements when there are many instances
function changeMatrixElementsId (fromRow, toRow, newIndex) {
	for (var row = fromRow; row <= toRow; row++) { // Changes de id on the fields in Relative, Marker, Area, Region
		for (var elementIndex = 0; elementIndex < matriz[row].length; elementIndex++) {
			matriz[row][elementIndex] = matriz[row][elementIndex].substr(0, matriz[row][elementIndex].length-4) + newIndex + "_id"; // changes the last id number to the desired index
		}
	}
}

// Cuando un campo cambia su valor, cambia a new su select asociado asi como los select padres
function setNew(thisElement) {
	var fieldId = "#" + $(thisElement).attr('id');
	for (var numEtiqueta = 0; numEtiqueta < matriz.length; numEtiqueta++) { // Check all rows of matrix
		//var flag = false;
		//for (var index = 0; index < 10; index++) {
			//changeMatrixElementsId (2, 5, index);
		
			/****/
	 		var type = fieldId.substr(1,fieldId.length-4);		// #relativeLocation_1_id -> relativeLocation_1
	 		var index = type.substr(type.length-1,type.length-0);
	 		changeMatrixElementsId (0, matriz.length-1, index);
	 		/*****/
			for (var numCampo = 1; numCampo < matriz[numEtiqueta].length; numCampo++) { // Check all fields of the row
				var str = matriz[numEtiqueta][numCampo];
				if (str == fieldId) {// if the field of the matrix and fieldId obtained are the same, change its values
					$(matriz[numEtiqueta][0]).val(NEW);
					cascadeChangeFunction(matriz[numEtiqueta][0]);
				}
			}
		//}
	}
}

// Cambio a New los select padres cuando un hijo tiene un cambio en algun campo
function cascadeChangeFunction(type) {
	if (!cascadeChange) { // Only activated if the change comes from a select_in
		switch (type) {
			case matriz[5][0]:	// Region_id
				$(matriz[4][0]).val(NEW); // Area_id

			case matriz[4][0]:	// Area_id
				$(matriz[3][0]).val(NEW); // Marker_id
			
			case matriz[3][0]:	// Marker_id
				$(matriz[2][0]).val(NEW); // relative_location
			break;
			
			case matriz[8][0]:	// vegetation_id
				$(matriz[6][0]).val(NEW); // environment_id
			break;
			
			case matriz[7][0]:	// weather_id
				$(matriz[6][0]).val(NEW); // environment_id
			break;		
		}
	}
}

// cambia los valores de los campos asociados a un select cuando se selecciona una opcion
function loadData(dataType, idMenu, etiquetas, fields) {
	for (var numCampo = 0; numCampo < etiquetas.length-1; numCampo++) {
		$.post(file, {table: dataType, id: idMenu, fieldNumber: numCampo, fieldName: fields[numCampo], addZero: false},
			function(output){
				if (output[0] == "0")     // if first value is 0
					numDato = parseInt(output[1]) + 1;  // is a single digit number
				else 
					numDato = parseInt(output.substr(0,2)) + 1;
	
				str = output.substr(2,output.length);  // the first two digits are the ID digits
				
				$(etiquetas[numDato]).val(str)();
				changeMatrixElementsId (0, 0, 0)
			});
	}
}

// Obtains child's ids, change their select options and the fields associated with them.
function retrieveData(dataType, idMenu, fieldTable, field) {
	$.post(file, {table: dataType, id: idMenu, fieldNumber: 0, fieldName: field, addZero: true},	// I ask for a field value in the database
		function(output){
			str = output.substr(2,output.length);
			if (idMenu == NEW) str = NEW;
			$(fieldTable).val(str);
			cascadeChange = true;
			$(fieldTable).change();
			cascadeChange = false;
		});
}
