<div >
		
	<div class='more-info'>		
		<h4 class='compressed'>Relative Location</h4>
		
		<div class='more-content'>
			<div>
			<h5><INPUT TYPE=BUTTON OnClick="AddElement('nextRelativeLocation', '#extraRelativeLocation', 
						'/php/LocationSections/RelativeSection/_AddRelativeSection.php');" 
						VALUE="+1 Add one Marker" class="left small boton"></h5>
						<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
			</div>
			<div class='radioButton'>
				<h5>
						
						<input type="radio" class="edicion_eventos" name="view" value="compressed" checked="checked"/> Compressed
						<input type="radio" class="edicion_eventos" name="view" value="expanded"/> Expanded
						
				</h5>
			</div>	
			<div>
				<div id="extraRelativeLocation">
					
				</div>
			</div>
			<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
		</div>
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
			$index = 0; 
			include('/php/LocationSections/location_has_file_SECTION/_ADD_location_has_file.php'); 
		?>
	</div>

	<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
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