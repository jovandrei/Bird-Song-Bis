// Php que recupera los valores de los campos deseados
var file = "php/CommonSections/autoCompleteFormsData.php";

// Valor constante "New" para los select
var NEW = "New";

//Esta bandera indica si el cambio en un select viene por el efecto cascada o es un cambio directo
var cascadeChange = false; 

var matriz = [["#researcher_$_id","#first_name_$_id", "#last_name_$_id", "#email_$_id"],										
              ["#absolute_location_$_id",
               		"#longitude_degrees_$_id", "#longitude_minutes_$_id","#longitude_seconds_$_id","#longitude_orientation_$_id",
               		"#latitude_degrees_$_id", "#latitude_minutes_$_id", "#latitude_seconds_$_id","#latitude_orientation_$_id",
               		"#elevation_$_id"],																							
               	["#relative_location_has_marker_$_id","#relativeDistance_$_id", "#relativePosition_$_id"],						
               	["#Marker_$_id","#markerName_$_id", "#markerDescription_$_id"],													
               	["#Area_$_id","#areaName_$_id", "#areaDescription_$_id"],														
               	["#Region_$_id","#regionName_$_id", "#country_$_id", "#state_or_province_$_id", "#regionDescription_$_id"],		
				["#environment_$_id", "#environmentComments_$_id"],
				["#weather_$_id", "#weatherDescription_$_id"],
				["#vegetation_$_id", "#vegetationType_$_id"],
				["#vegetation_has_vegetation_species_$_id", "#average_density_$_id", "#projected_cover_$_id", "#average_height_$_id"],
				["#vegetation_species_$_id", "#common_name_$_id", "#scientific_name_$_id"]

				];

// fields of each table
var matrizFields = [["first_name" , "last_name", "email"], 
                    ["longitude_degrees", "longitude_minutes", "longitude_seconds", "longitude_orientation",
			          "latitude_degrees", "latitude_minutes", "latitude_seconds", "latitude_orientation", 
			          "elevation"],
					["distance", "position"],
					["name", "description"],
					["name", "description"],
					["name", "country", "state_or_province", "description"],
					["comments_features"],
					["description"],
					["vegetation_type"],
					["average_density", "projected_cover", "average_height"],
					["scientific_name", "common_name"]

					];

var matrizTableParentsChilds = [//table							parent_id,	parent_child_id_name
                                ["RESEARCHER", 						-1,		 	""],
                                ["ABSOLUTE_LOCATION", 				-1, 		""],
                                ["RELATIVE_LOCATION_HAS_MARKER", 	-1,			""],
                                ["MARKER", 							 2, 	 	"MARKER_idMARKER"],
                                ["AREA", 							 3,		 	"AREA_idAREA"],
                                ["REGION",							 4,			"REGION_idREGION"],
                                ["ENVIRONMENT",						-1,			""],
                                ["WEATHER",							 6,			"WEATHER_idWEATHER"],
                                ["VEGETATION",						 6,			"VEGETATION_idVEGETATION"],
                                ["VEGETATION_HAS_VEGETATION_SPECIES",8,			"idVEGETATION"],
                                ["VEGETATION_SPECIES",				 9,			"VEGETATION_SPECIES_idVEGETATION_SPECIES"]
                                
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
 		var typeNum;
 		
 		changeMatrixElementsId (0, matriz.length-1, index);
 		
 		// Get the index of the type of select
 		for (var i = 0; i < matrizTableParentsChilds.length; i++) {
 			if (matrizTableParentsChilds[i][0] == type) {
 				typeNum = i;
 				break;
 			}
 		}
 		
 		// with the index search all childs related to the select
 		for (var i = 0; i < matrizTableParentsChilds.length; i++) {
 			if (matrizTableParentsChilds[i][1] == typeNum) {
 				retrieveData(type, idMenu, matriz[i][0], matrizTableParentsChilds[i][2]);
 			}
 		}
 		
 		etiquetas = matriz[typeNum];
		fields = matrizFields[typeNum];
 		loadData(type, idMenu, etiquetas, fields);
	});
 	
 	// if some field has changed, set the select to new
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

//Cambio a New los select padres cuando un hijo tiene un cambio en algun campo
function cascadeChangeFunction(type) {
	if (!cascadeChange) { // Only activated if the change comes from a select_in
		var typeNum;
		
		// get the index of the type of table
		for (var i = 0; i < matriz.length; i++) {
 			if (matriz[i][0] == type) {
 				typeNum = i;
 				break;
 			}
 		}
	
		// set all parents select to new
		while (true) {
			typeNum = matrizTableParentsChilds[typeNum][1];
			if (typeNum == -1)
				break;
			$(matriz[typeNum][0]).val(NEW);
			
		}
	}
}

// Cuando un campo cambia su valor, cambia a new su select asociado asi como los select padres
function setNew(thisElement) {
	var fieldId = "#" + $(thisElement).attr('id');
	for (var numEtiqueta = 0; numEtiqueta < matriz.length; numEtiqueta++) { // Check all rows of matrix
		
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
