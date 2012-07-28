// Php que recupera los valores de los campos deseados
var file = "php/CommonSections/autoCompleteFormsData.php";

// Valor constante "New" para los select
var NEW = "New";

//Esta bandera indica si el cambio en un select viene por el efecto cascada o es un cambio directo
var cascadeChange = false; 

var matriz = [["#researcher_id","#first_name_id", "#last_name_id", "#email_id"],									// 0
              ["#absolute_location_id","#longitude_id", "#latitude_id", "#elevation_id"],							// 1
              ["#relative_location_0_id","#relativeDistance_0_id", "#relativePosition_0_id"],						// 2
              ["#Marker_0_id","#markerName_0_id", "#markerDescription_0_id"],												// 3
              ["#Area_0_id","#areaName_0_id", "#areaDescription_0_id"],													// 4
              ["#Region_0_id","#regionName_0_id", "#country_0_id", "#state_or_province_0_id", "#regionDescription_0_id"]];	// 5

// Cuando se selecciona una opcion de algun menu desplegable, se rellenan los campos de la forma 
$(document).ready(function(){
 	$('select').change(function() {
 		formType = "#" + $(this).attr('id');				// #relativeLocation_1_id
 		var idMenu = $(formType).val();
 		var type = formType.substr(1,formType.length-4);	// #relativeLocation_1_id -> relativeLocation_1
 		var index = type.substr(type.length-1,type.length-0);	// relativeLocation_1 -> 1
 		var etiquetas = new Array();
 		var fields = new Array();
 		type2 = formType.substr(1,formType.length-6); 		// #relativeLocation_1_id -> relativeLocation 
 		
 		switch (type)
 		{
 		
 			case 'researcher':
 				etiquetas = matriz[0];	// Researcher
 				fields = ["first_name" , "last_name", "email"];
 			break;
 		 
 			case 'absolute_location':
 				etiquetas = matriz[1];	// Absolute Location
 				fields = ["longitude", "latitude", "elevation"];
 			break;
 			 
 		}
 		type2 = formType.substr(1,formType.length-6); 
 		switch (type2) {	// I intend to catch all new types id, with number recognition 
 			case 'relative_location':
 				for (var i = 2; i < 6; i++) { // Changes de id on the fields in Relative, Marker, Area, Region
					for (var j = 0; j < matriz[i].length; j++) {
						matriz[i][j] = matriz[i][j].substr(0, matriz[i][j].length-4) + index + "_id"; // changes the last id number to the desired index
					}
 				}
				etiquetas = matriz[2];	// Relative Location
				fields = ["distance", "position"];
				type = "relative_location_has_marker";
		 		retrieveData(type, idMenu, matriz[3][0], "MARKER_idMARKER");	// Marker_id
			break;
			
 			case 'Marker':
 				for (var i = 3; i < 6; i++) { // Changes de id on the fields in Marker, Area, Region
	 				for (var j = 0; j < matriz[i].length; j++) {
						matriz[i][j] = matriz[i][j].substr(0, matriz[i][j].length-4) + index + "_id"; // changes the last id number to the desired index
					}
 				}
 				etiquetas = matriz[3];	// Marker
 				fields = ["name", "description"];
 				cascadeChangeFunction(matriz[3][0]); // Marker_id
 				type = "Marker";
 		 		retrieveData(type, idMenu, matriz[4][0], "AREA_idAREA");		// Area_id
 			break;
 			
 			case 'Area':
 				for (var i = 4; i < 6; i++) { // Changes de id on the fields in Area
	 				for (var j = 0; j < matriz[i].length; j++) {
						matriz[i][j] = matriz[i][j].substr(0, matriz[i][j].length-4) + index + "_id"; // changes the last id number to the desired index
					}
 				}
 				etiquetas = matriz[4];	// Changes de id on the fields in Area, Region
 				fields = ["name", "description"];
 				cascadeChangeFunction(matriz[4][0]); // Area_id
 				type = "Area";
 		 		retrieveData(type, idMenu, matriz[5][0], "REGION_idREGION");	// Region_id
 			break;
 			
 			case 'Region':
 				for (var i = 5; i < 6; i++) { // Changes de id on the fields in Region
	 				for (var j = 0; j < matriz[i].length; j++) {
						matriz[i][j] = matriz[i][j].substr(0, matriz[i][j].length-4) + index + "_id"; // changes the last id number to the desired index
					}
 				}
 				etiquetas = matriz[5];	// Region
 				fields = ["name", "country", "state_or_province", "description"];
 				cascadeChangeFunction(matriz[5][0]); // Region_id
 				type = "Region";
 			break;
 		}
 		
 		loadData(type, idMenu, etiquetas, fields);
	});
 	
 	// Saber si algun valor a cambiado
 	$('input').change(function() { setNew(this); });
 	$('textarea').change(function() { setNew(this); });
 	$('select').change(function() { setNew(this); });
});

// Cuando un campo cambia su valor, cambia a new su select asociado asi como los select padres
function setNew(thisElement) {
	var fieldId = "#" + $(thisElement).attr('id');
	for (var numEtiqueta = 0; numEtiqueta < matriz.length; numEtiqueta++) {
		for (var numCampo = 1; numCampo < matriz[numEtiqueta].length; numCampo++) {
			var str = matriz[numEtiqueta][numCampo];
			if (str == fieldId) {
				$(matriz[numEtiqueta][0]).val(NEW);
				cascadeChangeFunction(matriz[numEtiqueta][0]);
			}
		}
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
			
		}
	}
}

// cambia los valores de los campos asociados a un select cuando se selecciona una opcion
function loadData(dataType, idMenu, etiquetas, fields) {
	for (var numCampo = 0; numCampo < etiquetas.length-1; numCampo++) {
		$.post(file, {table: dataType, id: idMenu, fieldNumber: numCampo, fieldName: fields[numCampo]},
			function(output){
				if (output[0] == "0")     // if first value is 0
					numDato = parseInt(output[1]) + 1;  // is a single digit number
				else 
					numDato = parseInt(output.substr(0,2)) + 1;
	
				str = output.substr(2,output.length);  // the first two digits are the ID digits
				$(etiquetas[numDato]).val(str)();
			});
	}
}

// obtiene los id de los hijos, cambia la opcion de sus select y carga sus campos asociados
function retrieveData(dataType, idMenu, fieldTable, field) {
	$.post(file, {table: dataType, id: idMenu, fieldNumber: 0, fieldName: field},
		function(output){
			str = output.substr(2,output.length);
			if (idMenu == NEW) str = NEW;
			$(fieldTable).val(str);
			cascadeChange = true;
			$(fieldTable).change();
			cascadeChange = false;
		});
}
