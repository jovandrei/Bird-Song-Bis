<div class='more-info'>		
	<h4 class='compressed'>Upload Files</h4>
	
	<div class='more-content'>
		<div>
		<h5><INPUT TYPE=BUTTON OnClick="AddElement('nextFile', '#extraFile', 
					'/php/LocationSections/location_has_file_SECTION/_SECTION_location_has_file.php');" 
					VALUE="+1 Add one File" class="left small boton"></h5>
					
		</div>
		<div>
			<div id="extraFile">
				<?php
					$index = 0; 
					include('/php/LocationSections/location_has_file_SECTION/_SECTION_location_has_file.php'); 
				?>
			</div>
		</div>
		<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
	</div>
</div>