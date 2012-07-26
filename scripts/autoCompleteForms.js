// Php que recupera los valores de los campos deseados
var file = "php/CommonSections/autoCompleteFormsData.php";

// Valor constante "New" para los select
var NEW = "New";

//Esta bandera indica si el cambio en un select viene por el efecto cascada o es un cambio directo
var cascadeChange = false; 

var matriz = [["#researcher_id","#first_name_id", "#last_name_id", "#email_id"],									// 0
              ["#absolute_location_id","#longitude_id", "#latitude_id", "#elevation_id"],							// 1
              ["#relative_location_id","#relativeDistance_id", "#relativePosition_id"],								// 2
              ["#Marker_id","#markerName_id", "#markerDescription_id"],												// 3
              ["#Area_id","#areaName_id", "#areaDescription_id"],													// 4
              ["#Region_id","#regionName_id", "#country_id", "#state_or_province_id", "#regionDescription_id"]];	// 5

// Cuando se selecciona una opcion de algun menu desplegable, se rellenan los campos de la forma 
$(document).ready(function(){
 	$('select').change(function() {
 		formType = "#" + $(this).attr('id');
 		var idMenu = $(formType).val();
 		var type = formType.substr(1,formType.length-4);
 		var etiquetas = new Array();
 		var fields = new Array();
 		
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
 			
 			case 'relative_location_1':
 				etiquetas = matriz[2];	// Relative Location
 				fields = ["distance", "position"];
 				type = "relative_location_has_marker";
 		 		retrieveData(type, idMenu, matriz[3][0], "MARKER_idMARKER");	// Marker_id
 			break;
 			
 			case 'relative_location_2':
 				etiquetas = matriz[2];	// Relative Location
 				fields = ["distance", "position"];
 				type = "relative_location_has_marker";
 		 		retrieveData(type, idMenu, matriz[3][0], "MARKER_idMARKER");	// Marker_id
 			break;
 			
 			case 'Marker':
 				etiquetas = matriz[3];	// Marker
 				fields = ["name", "description"];
 				cascadeChangeFunction(matriz[3][0]); // Marker_id
 		 		retrieveData(type, idMenu, matriz[4][0], "AREA_idAREA");		// Area_id
 			break;
 			
 			case 'Area':
 				etiquetas = matriz[4];	// Area
 				fields = ["name", "description"];
 				cascadeChangeFunction(matriz[4][0]); // Area_id
 		 		retrieveData(type, idMenu, matriz[5][0], "REGION_idREGION");	// Region_id
 			break;
 			
 			case 'Region':
 				etiquetas = matriz[5];	// Region
 				fields = ["name", "country", "state_or_province", "description"];
 				cascadeChangeFunction(matriz[5][0]); // Region_id
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
	if (!cascadeChange) {
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