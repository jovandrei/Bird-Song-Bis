<?php
// This method returns a select section, which varies depending on the value of $type
function options_section($type) {
	$nameId = $type . "_id";
	
	$options=""; 
	$options .= "<li class=\"notranslate\">";
	$options .= "	<label class=\"desc\" for=\"$nameId\">";
	$options .= "		Select one $type";
	$options .= "	</label>";
	$options .= "	";
	$options .= "	<div>";
	$options .= "		<select id=\"$nameId\" name=\"$type\" class=\"field select medium\" tabindex=\"1\" >"; 
	$options .= "			<option value=\"New $type\" selected=\"selected\">New $type</option>";
	$options .= "			<option value=\"\" disabled=\"disabled\">--------</option>";
	$options .= 			sectionData($type);
	$options .= "		</select>";
	$options .= "	</div>";
	$options .= "</li>";
	return $options;
}
?>