// It's called to add sections 

function AddElement(nameElement){
	var file = "addExtraFieldsData.php";
	
	myMap[nameElement]++;
	//document.cookie = nameElement + '=' + myMap[nameElement] + '; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	createCookie(nameElement, myMap[nameElement], 30); 
	$.post(file, {index: myMap[nameElement]},
		function(data) {
			resultado = data.substr(0,data.length-1); // hack to eliminate an extra 1 at the end of the "string"
			$("#extraElement").append(resultado).trigger('create');
			
			// Recognize newly added Elements in the highlight_array
			initializeFocus();
			
			// Recognize newly added Element in the show/hida array
			myInitializeFocus();
	},'html');
	
}


//Temporary measure to load sections
//The ideal would be to recognize which section (location, analysis, view,...) is selected
//and load its elements
$(window).load(function() {
	myMap = {};
	myMap['nextSubArray'] = 0;
	AddElement('nextSubArray');
	myInitializeFocus();
	
});

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