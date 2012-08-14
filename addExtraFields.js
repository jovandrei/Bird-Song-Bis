// It's called to add sections 

//Temporary measure to load sections
//The ideal would be to recognize which section (location, analysis, view,...) is selected
//and load its elements
$(window).load(function() {
	myMap = {};
	
	myMap['nextRelativeLocation'] = -1;
	document.cookie = 'nextRelativeLocation' + '=' + ++myMap['nextRelativeLocation'] + '; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	
	myMap['nextFile'] = -1;
	document.cookie = 'nextFile' + '=' + ++myMap['nextFile'] + '; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	
	myMap['nextVegetationSpecies'] = -1;
	AddElement('nextVegetationSpecies', '#extraVegetationSpecies', 
	'/php/LocationSections/EnvironmentSection/VegetationSection/_AddVegetationSpeciesSection.php');
	
	
	
	myInitializeFocus();
	
});

function AddElement(nameElement, containerName, sectionPath){
	var file = "addExtraFieldsData.php";
	 
	document.cookie = nameElement + '=' + ++myMap[nameElement] + '; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	$.post(file, {index: myMap[nameElement], path: sectionPath},
		function(data) {
			resultado = data.substr(0,data.length-1); // hack to eliminate an extra 1 at the end of the "string"
			
			$(containerName).append(resultado).children().eq(5*(myMap[nameElement])).fadeOut(250).fadeIn(500);
			
			// Recognize newly added Elements in the highlight_array
			initializeFocus();
			
			// Recognize newly added Element in the show/hide array
			myInitializeFocus();
	},'html');
	
}