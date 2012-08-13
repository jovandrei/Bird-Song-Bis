//addEvent(window, 'load', myInitializeFocus);
var myMap; 
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
				//h4.toggleClass("compressed expanded")
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
				var fieldContainer2 = this.parentNode.parentNode.parentNode;
				var eventsFields = getElementsByClassName(fieldContainer2, "*", "more-content-in");

				var selectedSectionIn = $(this).parent().find(".more-content2")
				var allSectionsIn = $(this).parent().parent().parent().find(".more-info").find(".more-content2")
				
				if (selectedSectionIn.is(":hidden")) {
					allSectionsIn.slideUp("slow")
					selectedSectionIn.slideDown("slow")  
				} else {
					selectedSectionIn.slideUp("slow")
				}
				
				switch ($('input[name=view]:checked').val())
				{
				 case 'compressed':
					 for(var j = 0; j < eventsFields.length; j++) {
						 $(eventsFields[j]).slideUp("slow");
					 }
					 break;
				 
				case 'expanded':
					for(var j = 0; j < eventsFields.length; j++) {
						$(eventsFields[j]).slideDown("slow");
					}
					break;
				}
			};
		}
	}
}
