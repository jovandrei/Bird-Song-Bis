//addEvent(window, 'load', myInitializeFocus);

// Add an onClick event to all fields that can show/hide
function myInitializeFocus(){
var fields = getElementsByClassName(document, "*", "*");
	for(i = 0; i < fields.length; i++) {
		var pos = $(fields[i]).get(0).tagName;
		if (pos == "H4") {
			fields[i].onclick = function(){
				//this.className = "test";
				addClassName(this, pos, true);
				var selectedSection = $(this).parent().find(".more-content")     
				var allSections = $(this).parent().parent().parent().find(".more-info").find(".more-content")
			      
				var h4 = $(this).parent().find("h4")
				h4.toggleClass("compressed expanded")
				if (selectedSection.is(":hidden")) {
					allSections.slideUp("slow")
					selectedSection.slideDown("slow")  
				} else {
					selectedSection.slideUp("slow")
				}
			};
		}
		else if (pos == "H5") {
			fields[i].onclick = function(){
				var selectedSection2 = $(this).parent().parent().parent().find(".more-content-in")
		 		switch ($('input[name=view]:checked').val())
				{
				 case 'compressed':
					 selectedSection2.slideUp("slow")
				 break;
				 
				case 'expanded':
					selectedSection2.slideDown("slow")
				  
				 break;
				}
			};
		}
	}
}

// Temporary measure to load sections
// The ideal would be to recognize which section (location, analysis, view,...) is selected
// and load its elements
$(window).load(function() {
	AddElement('nextSubArray');
	myInitializeFocus();
	
});