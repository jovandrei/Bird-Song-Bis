$(document).ready(function(){
 	$('#Researcher_id').change(function() {
		var idMenu = $('#Researcher_id').val();
 		var type = "Researcher";
 		
 		var etiquetas = new Array();
 		etiquetas = ["#first_name", "#last_name", "#email"]
		
		loadData(type, idMenu, etiquetas);
	});
	
 	$('#Location_id').change(function() { 
 		var idMenu = $('#Location_id').val();
 		var type = "Location";

 		var etiquetas = new Array();
		etiquetas = ["#longitude", "#latitude", "#elevation", 
				"#distance", "#angle", "#state_or_province", 
				"#country", "#description", "#comments"];

		var numVegetations = 1;
		for (var i = 0; i < numVegetations; i++) {
			etiquetas.push("#average_density"+i);
			etiquetas.push("#projected_cover"+i);
			etiquetas.push("#average_height"+i);
			etiquetas.push("#scientific_name"+i);
			etiquetas.push("#common_name"+i);
		}
		loadData(type, idMenu, etiquetas);
	});
});


function loadData(dataType, idMenu, etiquetas) {
	var file = "php/data_Forms.php";
	for (var numCampo = 0; numCampo < etiquetas.length; numCampo++) {
		$.post(file, {type: dataType, id: idMenu, campo: numCampo},
		function(output){
			if (output[0] == "0")     // if first value is 0
				numDato = output[1];  // is a single digit number
			else 
				numDato = parseInt(output.substr(0,2));

			str = output.substr(2,output.length);  // the rest is data
			if (idMenu == 0) {
				$(etiquetas[numDato]).val("")();	
			}
			else {
				$(etiquetas[numDato]).val(str)();
			}
		});
	}
}
