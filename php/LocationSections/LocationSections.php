<div >
	<div id="relative_location_section">
		<?php	
			include('/php/LocationSections/RelativeSection/_ADD_relative_location.php'); 
		?>		
	</div>
	
	<div id="extraAbsoluteLocation">
		<?php
			$index = 0; 
			include('/php/LocationSections/AbsoluteSection/_AddAbsoluteSection.php'); 
		?>
	</div>
	
	
	<div id="extraEnvironment">
		<?php
			$index = 0; 
			include('/php/LocationSections/EnvironmentSection/_AddEnvironmentSection.php'); 
		?>
	</div>
		
	<div id="location_has_file">
		<?php
			include('/php/LocationSections/location_has_file_SECTION/_ADD_location_has_file.php'); 
		?>
	</div>

	<a href="#" tabindex="-1" class="invisible"> ------------------------------------------------------ </a>
	<li class="complex notranslate">
		<div>
			<span>
				<textarea id="locationDescription_0_id"  name="locationDescription_0" 
					class="field select addr" spellcheck="true" rows="1" cols="70" onkeyup=""></textarea>
				<label for="locationDescription_0_id">Location Description</label>
			</span>		
		</div>
	</li>
</div>