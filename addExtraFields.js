// It's called to add sections 
var nextVegetation = 1;
var myMap = {};
myMap['nextSubArray'] = 1; 

function AddElement(nameElement){
	var file = "addExtraFieldsData.php";
	document.cookie = nameElement + '=' + myMap[nameElement] + '; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	
	$.post(file, {index: myMap[nameElement]},
		function(data) {
			resultado = data.substr(0,data.length-1); // hack to eliminate an extra 1 at the end of the "string"
			$("#extraElement").append(resultado).trigger('create');
			myMap[nameElement]++;
			
			// Recognize newly added Elements in the highlight_array
			initializeFocus();
			
			// Recognize newly added Element in the show/hida array
			myInitializeFocus();
	},'html');
	
}
