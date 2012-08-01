// It's called to add sections 

//Temporary measure to load sections
//The ideal would be to recognize which section (location, analysis, view,...) is selected
//and load its elements
$(window).load(function() {
	myMap = {};
	myMap['nextRelativeLocation'] = -1;
	AddElement('nextRelativeLocation', 
			'#extraRelativeLocation', 
			"/php/LocationSections/RelativeSection/RelativeTestSection.php");
	
	myMap['nextAbsoluteLocation'] = -1;
	AddElement('nextAbsoluteLocation', 
			'#extraAbsoluteLocation', 
			"/php/LocationSections/AbsoluteSection/_AddAbsoluteSection.php");
	myInitializeFocus();
	
});

function AddElement(nameElement, containerName, sectionPath){
	var file = "addExtraFieldsData.php";
	
	//myMap[nameElement]++;
	//document.cookie = nameElement + '=' + myMap[nameElement] + '; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	createCookie(nameElement, myMap[nameElement]++, 30); 
	$.post(file, {index: myMap[nameElement], path: sectionPath},
		function(data) {
			resultado = data.substr(0,data.length-1); // hack to eliminate an extra 1 at the end of the "string"
			$(containerName).append(resultado).trigger('create');
			
			// Recognize newly added Elements in the highlight_array
			initializeFocus();
			
			// Recognize newly added Element in the show/hide array
			myInitializeFocus();
	},'html');
	
}


/*************************------COOKIES-----*************************/
function createCookie(name, value, days)
{
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}