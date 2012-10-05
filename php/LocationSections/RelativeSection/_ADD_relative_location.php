<div class='more-info'>		
	<h4 class='compressed'>Relative Location</h4>
	
	<div class='more-content'>
		
		<div class='radioButton'>
			<h5>
					
					<input type="radio" class="edicion_eventos" name="view" value="compressed" checked="checked"/> Compressed
					<input type="radio" class="edicion_eventos" name="view" value="expanded"/> Expanded
					
			</h5>
		</div>	
		<div>
			<div id="extraRelativeLocation">
				<?php
					$index = 0; 
					include('php/LocationSections/RelativeSection/_SECTION_relative_location.php'); 
				?>	
			</div>
		</div>
		<div>
		<h5><INPUT TYPE=BUTTON OnClick="AddElement('nextRelativeLocation', '#extraRelativeLocation', 
					'php/LocationSections/RelativeSection/_SECTION_relative_location.php');" 
					VALUE="+1 Add one Marker" class="right small boton"></h5>
		</div>
		<a href="#" tabindex="-1" class="invisible"> ------------------------------------------------------ </a>
		<a href="#" tabindex="-1" class="invisible"> ------------------------------------------------------ </a>
		<a href="#" tabindex="-1" class="invisible"> ------------------------------------------------------ </a>
	</div>
</div>