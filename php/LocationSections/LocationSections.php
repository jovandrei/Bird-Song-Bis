<div >
	<?php echo options_section2("Location", 0); ?>

	<div id="extraAbsoluteLocation">
		<?php
			$index = 0; 
			include('/php/LocationSections/AbsoluteSection/_AddAbsoluteSection.php'); 
		?>
	</div>
	
	<div class='more-info'>
		<h5><INPUT TYPE=BUTTON OnClick="AddElement('nextRelativeLocation', '#extraRelativeLocation', 
					'/php/LocationSections/RelativeSection/_AddRelativeSection.php');" 
					VALUE="+1 Add one Marker" class="right small boton"></h5>
					
					
		<h4 class='compressed'>Relative Location</h4>
		
	
		<div class='more-content'>
			<div>
		
				<div id="extraRelativeLocation">
					<?php
						$index = 0; 
						include('/php/LocationSections/RelativeSection/_AddRelativeSection.php'); 
					?>
				</div>
			
			</div>
			<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
		</div>
	</div>
	
	
	<div id="extraEnvironment">
		<?php
			$index = 0; 
			include('/php/LocationSections/EnvironmentSection/_AddEnvironmentSection.php'); 
		?>
	</div>
		
	<div id="extraFile">
		<?php
			$index = 0; 
			include('/php/GeneralSections/FileSection/_AddFileSection.php'); 
		?>
	</div>

</div>